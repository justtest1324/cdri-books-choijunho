import type { Book } from '../types/book'
import { getBookKey } from './bookKey'

/** 찜 토글 — getBookKey 기준. 추가 시 클릭 시점의 Book 스냅샷을 맨 앞에 보관 (PRD F-8) */
export function toggleFavorite(favorites: Book[], book: Book): Book[] {
  return isFavorite(favorites, book)
    ? favorites.filter((item) => getBookKey(item) !== getBookKey(book))
    : [book, ...favorites]
}

export function isFavorite(favorites: Book[], book: Book): boolean {
  return favorites.some((item) => getBookKey(item) === getBookKey(book))
}
