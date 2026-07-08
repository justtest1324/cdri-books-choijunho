import { describe, expect, it } from 'vitest'
import type { Book } from '../types/book'
import { getBookKey } from './bookKey'

const book = (overrides: Partial<Book>): Book => ({
  title: '제목',
  contents: '',
  url: '',
  isbn: '',
  datetime: '',
  authors: [],
  publisher: '출판사',
  translators: [],
  price: 10000,
  sale_price: -1,
  thumbnail: '',
  status: '',
  ...overrides,
})

describe('getBookKey', () => {
  it('url의 bookId를 최우선 키로 사용한다 (카카오 데이터의 실질 고유값)', () => {
    const a = book({
      url: 'https://search.daum.net/search?w=bookpage&bookId=2787587&q=123',
      isbn: '981233209X 9789812332097',
    })
    expect(getBookKey(a)).toBe('id:2787587')
  })

  it('같은 isbn이라도 bookId가 다르면 다른 키다 (중복 ISBN 실사례)', () => {
    const isbn = '981233209X 9789812332097'
    const a = book({ url: 'https://search.daum.net/search?w=bookpage&bookId=2787587', isbn })
    const b = book({ url: 'https://search.daum.net/search?w=bookpage&bookId=1513404', isbn })
    expect(getBookKey(a)).not.toBe(getBookKey(b))
  })

  it('bookId가 없으면 isbn으로 폴백한다', () => {
    const a = book({ url: 'https://example.com/book', isbn: '9788967191146' })
    expect(getBookKey(a)).toBe('isbn:9788967191146')
  })

  it('bookId도 isbn도 없으면 제목+출판사로 폴백한다', () => {
    const a = book({ url: '', isbn: '  ' })
    expect(getBookKey(a)).toBe('meta:제목:출판사')
  })
})
