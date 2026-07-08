import type { Book } from '../types/book'

/** 찜 토글 — isbn 기준. 추가 시 클릭 시점의 Book 스냅샷을 맨 앞에 보관 (PRD F-8) */
export function toggleFavorite(favorites: Book[], book: Book): Book[] {
  return isFavorite(favorites, book.isbn)
    ? favorites.filter((item) => item.isbn !== book.isbn)
    : [book, ...favorites]
}

export function isFavorite(favorites: Book[], isbn: string): boolean {
  return favorites.some((item) => item.isbn === isbn)
}
