import { describe, expect, it } from 'vitest'
import type { BookSearchMeta } from '../types/book'
import { MAX_PAGE } from './constants'
import { getNextPage } from './pagination'

const meta = (overrides: Partial<BookSearchMeta> = {}): BookSearchMeta => ({
  total_count: 100,
  pageable_count: 100,
  is_end: false,
  ...overrides,
})

describe('getNextPage', () => {
  it('마지막 페이지가 아니면 다음 페이지 번호를 반환한다', () => {
    expect(getNextPage(1, meta())).toBe(2)
    expect(getNextPage(7, meta())).toBe(8)
  })

  it('is_end면 undefined를 반환한다', () => {
    expect(getNextPage(3, meta({ is_end: true }))).toBeUndefined()
  })

  it('API page 상한(50)에 도달하면 is_end가 아니어도 undefined를 반환한다', () => {
    expect(getNextPage(MAX_PAGE, meta())).toBeUndefined()
    expect(getNextPage(MAX_PAGE - 1, meta())).toBe(MAX_PAGE)
  })
})
