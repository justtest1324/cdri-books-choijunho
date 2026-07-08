import type { Book } from '../types/book'

const BOOK_ID_PATTERN = /[?&]bookId=(\d+)/

/**
 * 도서 식별 키 — 카카오 데이터에서 isbn은 중복될 수 있어(재발행 등) 고유값이 아니다.
 * url의 bookId(다음 책 상세 페이지 식별자)가 실질 고유값이라 최우선으로 사용한다.
 */
export function getBookKey(book: Book): string {
  const bookId = BOOK_ID_PATTERN.exec(book.url)?.[1]
  if (bookId !== undefined) return `id:${bookId}`
  if (book.isbn.trim() !== '') return `isbn:${book.isbn.trim()}`
  return `meta:${book.title}:${book.publisher}`
}
