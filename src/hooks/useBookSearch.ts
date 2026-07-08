import { useInfiniteQuery } from '@tanstack/react-query'
import { searchBooks } from '../api/books'
import { ApiError } from '../api/http'
import type { BookSearchResponse, SearchParams } from '../types/book'
import { selectBookList } from '../utils/bookSelectors'
import type { ApiErrorKind } from '../utils/httpError'
import { getNextPage } from '../utils/pagination'

/** 도서 검색 서버 상태 — 무한 스크롤 페이지네이션 포함 */
export function useBookSearch({ query, target }: SearchParams) {
  const result = useInfiniteQuery({
    queryKey: ['books', { query, target }],
    queryFn: ({ pageParam }) => searchBooks({ query, target, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: BookSearchResponse, _pages, lastPageParam) =>
      getNextPage(lastPageParam, lastPage.meta),
    select: (data) => selectBookList(data.pages),
    enabled: query.trim().length > 0,
  })

  // 페이지/컴포넌트가 api 레이어(ApiError)를 몰라도 되도록 오류 종류를 여기서 파생
  const errorKind: ApiErrorKind | undefined =
    result.error === null
      ? undefined
      : result.error instanceof ApiError
        ? result.error.kind
        : 'network'

  return { ...result, errorKind }
}
