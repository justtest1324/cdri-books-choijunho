import { describe, expect, it } from 'vitest'
import type { Book } from '../types/book'
import { isFavorite, toggleFavorite } from './favorites'

const book = (isbn: string, title = `책 ${isbn}`): Book => ({
  title,
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

describe('toggleFavorite', () => {
  it('없는 책이면 스냅샷을 맨 앞에 추가한다 (PRD F-8)', () => {
    const result = toggleFavorite([book('1')], book('2'))
    expect(result.map((b) => b.isbn)).toEqual(['2', '1'])
  })

  it('이미 찜한 책이면 isbn 기준으로 제거한다', () => {
    const result = toggleFavorite([book('1'), book('2')], book('1'))
    expect(result.map((b) => b.isbn)).toEqual(['2'])
  })

  it('추가되는 것은 클릭 시점의 스냅샷 그대로다', () => {
    const snapshot = { ...book('3'), price: 99999 }
    const result = toggleFavorite([], snapshot)
    expect(result[0].price).toBe(99999)
  })
})

describe('isFavorite', () => {
  it('isbn이 목록에 있으면 true', () => {
    expect(isFavorite([book('1')], '1')).toBe(true)
    expect(isFavorite([book('1')], '2')).toBe(false)
  })
})
