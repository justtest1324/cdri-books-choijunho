import type { Book, BookSearchResponse } from '../types/book'

export type BookList = {
  books: Book[]
  totalCount: number
}

/** useInfiniteQuery 페이지 배열 → 화면이 쓰는 형태(평탄화된 목록 + 총 건수) */
export function selectBookList(pages: BookSearchResponse[]): BookList {
  return {
    books: pages.flatMap((page) => page.documents),
    totalCount: pages[0]?.meta.total_count ?? 0,
  }
}
