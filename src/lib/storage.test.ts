import { afterEach, describe, expect, it, vi } from 'vitest'
import { readStorage, STORAGE_KEYS, writeStorage } from './storage'

function fakeLocalStorage(initial: Record<string, string> = {}) {
  const store = new Map(Object.entries(initial))
  return {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => void store.set(key, value),
    store,
  }
}

function stubLocalStorage(fake: ReturnType<typeof fakeLocalStorage>) {
  vi.spyOn(window, 'localStorage', 'get').mockReturnValue(fake as unknown as Storage)
}

afterEach(() => {
  vi.restoreAllMocks()
})

describe('readStorage', () => {
  it('저장된 JSON을 파싱해 반환한다', () => {
    stubLocalStorage(fakeLocalStorage({ [STORAGE_KEYS.searchHistory]: '["하루키"]' }))
    expect(readStorage(STORAGE_KEYS.searchHistory, [])).toEqual(['하루키'])
  })

  it('값이 없으면 fallback을 반환한다', () => {
    stubLocalStorage(fakeLocalStorage())
    expect(readStorage(STORAGE_KEYS.searchHistory, ['기본'])).toEqual(['기본'])
  })

  it('깨진 JSON이면 fallback을 반환한다', () => {
    stubLocalStorage(fakeLocalStorage({ [STORAGE_KEYS.searchHistory]: '{잘못된' }))
    expect(readStorage(STORAGE_KEYS.searchHistory, [])).toEqual([])
  })
})

describe('writeStorage', () => {
  it('JSON으로 직렬화해 저장한다', () => {
    const fake = fakeLocalStorage()
    stubLocalStorage(fake)
    writeStorage(STORAGE_KEYS.favorites, [{ isbn: '1' }])
    expect(fake.store.get(STORAGE_KEYS.favorites)).toBe('[{"isbn":"1"}]')
  })

  it('저장 실패(쿼터 초과 등)를 밖으로 던지지 않는다', () => {
    stubLocalStorage({
      ...fakeLocalStorage(),
      setItem: () => {
        throw new Error('QuotaExceededError')
      },
    } as ReturnType<typeof fakeLocalStorage>)
    expect(() => writeStorage(STORAGE_KEYS.favorites, [])).not.toThrow()
  })
})
