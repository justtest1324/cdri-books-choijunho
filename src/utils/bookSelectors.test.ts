import { describe, expect, it } from 'vitest'
import type { Book, BookSearchResponse } from '../types/book'
import { selectBookList } from './bookSelectors'

const book = (isbn: string): Book => ({
  title: `책 ${isbn}`,
  contents: '',
  url: '',
  isbn,
  datetime: '',
  authors: [],
  publisher: '',
  translators: [],
  price: 10000,
  sale_price: -1,
  thumbnail: '',
  status: '정상판매',
})

const page = (isbns: string[], totalCount: number): BookSearchResponse => ({
  meta: { total_count: totalCount, pageable_count: totalCount, is_end: false },
  documents: isbns.map(book),
})

describe('selectBookList', () => {
  it('여러 페이지의 documents를 순서대로 평탄화한다', () => {
    const result = selectBookList([page(['1', '2'], 30), page(['3'], 30)])
    expect(result.books.map((b) => b.isbn)).toEqual(['1', '2', '3'])
  })

  it('totalCount는 첫 페이지의 total_count를 사용한다', () => {
    const result = selectBookList([page(['1'], 42)])
    expect(result.totalCount).toBe(42)
  })

  it('페이지가 없으면 빈 목록과 0건을 반환한다', () => {
    expect(selectBookList([])).toEqual({ books: [], totalCount: 0 })
  })
})
