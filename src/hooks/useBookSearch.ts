import { useInfiniteQuery } from '@tanstack/react-query'
import { searchBooks } from '../api/books'
import type { BookSearchResponse, SearchParams } from '../types/book'
import { selectBookList } from '../utils/bookSelectors'
import { getNextPage } from '../utils/pagination'

/** 도서 검색 서버 상태 — 무한 스크롤 페이지네이션 포함 */
export function useBookSearch({ query, target }: SearchParams) {
  return useInfiniteQuery({
    queryKey: ['books', { query, target }],
    queryFn: ({ pageParam }) => searchBooks({ query, target, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: BookSearchResponse, _pages, lastPageParam) =>
      getNextPage(lastPageParam, lastPage.meta),
    select: (data) => selectBookList(data.pages),
    enabled: query.trim().length > 0,
  })
}
