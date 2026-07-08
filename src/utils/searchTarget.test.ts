import { describe, expect, it } from 'vitest'
import { parseSearchTarget } from './searchTarget'

describe('parseSearchTarget', () => {
  it('유효한 target 문자열을 그대로 반환한다', () => {
    expect(parseSearchTarget('title')).toBe('title')
    expect(parseSearchTarget('person')).toBe('person')
    expect(parseSearchTarget('publisher')).toBe('publisher')
  })

  it('유효하지 않은 값(임의 URL 조작 등)은 undefined를 반환한다', () => {
    expect(parseSearchTarget('isbn')).toBeUndefined()
    expect(parseSearchTarget('')).toBeUndefined()
    expect(parseSearchTarget(null)).toBeUndefined()
  })
})
