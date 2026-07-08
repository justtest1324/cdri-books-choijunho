import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { readStorage, STORAGE_KEYS, writeStorage } from '../lib/storage'
import { useSearchHistory } from './useSearchHistory'

vi.mock('../lib/storage', () => ({
  STORAGE_KEYS: { searchHistory: 'certicos-books:search-history' },
  readStorage: vi.fn(),
  writeStorage: vi.fn(),
}))

beforeEach(() => {
  vi.mocked(readStorage).mockReturnValue([])
  vi.mocked(writeStorage).mockReset()
})

describe('useSearchHistory', () => {
  it('저장된 기록을 초기값으로 읽는다', () => {
    vi.mocked(readStorage).mockReturnValue(['하루키'])
    const { result } = renderHook(() => useSearchHistory())
    expect(result.current.history).toEqual(['하루키'])
    expect(readStorage).toHaveBeenCalledWith(STORAGE_KEYS.searchHistory, [])
  })

  it('추가하면 상태와 저장소에 모두 반영된다', () => {
    const { result } = renderHook(() => useSearchHistory())
    act(() => result.current.add('노르웨이의 숲'))
    expect(result.current.history).toEqual(['노르웨이의 숲'])
    expect(writeStorage).toHaveBeenCalledWith(STORAGE_KEYS.searchHistory, ['노르웨이의 숲'])
  })

  it('삭제하면 상태와 저장소에서 모두 사라진다', () => {
    vi.mocked(readStorage).mockReturnValue(['a', 'b'])
    const { result } = renderHook(() => useSearchHistory())
    act(() => result.current.remove('a'))
    expect(result.current.history).toEqual(['b'])
    expect(writeStorage).toHaveBeenCalledWith(STORAGE_KEYS.searchHistory, ['b'])
  })
})
