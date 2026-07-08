import { describe, expect, it } from 'vitest'
import { MAX_HISTORY } from './constants'
import { addHistory, removeHistory } from './searchHistory'

describe('addHistory', () => {
  it('새 검색어를 맨 앞에 추가한다', () => {
    expect(addHistory(['b', 'c'], 'a')).toEqual(['a', 'b', 'c'])
  })

  it('이미 있는 검색어는 맨 앞으로 이동한다 (중복 없음)', () => {
    expect(addHistory(['a', 'b', 'c'], 'b')).toEqual(['b', 'a', 'c'])
  })

  it('최대 개수를 넘으면 가장 오래된 것부터 지운다', () => {
    const full = Array.from({ length: MAX_HISTORY }, (_, i) => `기록${i}`)
    const result = addHistory(full, '새검색어')
    expect(result).toHaveLength(MAX_HISTORY)
    expect(result[0]).toBe('새검색어')
    expect(result).not.toContain(`기록${MAX_HISTORY - 1}`)
  })

  it('공백만 있는 검색어는 추가하지 않는다', () => {
    expect(addHistory(['a'], '   ')).toEqual(['a'])
  })

  it('검색어 앞뒤 공백은 제거하고 저장한다', () => {
    expect(addHistory([], '  하루키  ')).toEqual(['하루키'])
  })
})

describe('removeHistory', () => {
  it('해당 검색어만 제거한다', () => {
    expect(removeHistory(['a', 'b', 'c'], 'b')).toEqual(['a', 'c'])
  })

  it('없는 검색어 제거는 원본과 동일하다', () => {
    expect(removeHistory(['a'], 'x')).toEqual(['a'])
  })
})
