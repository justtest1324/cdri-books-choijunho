import type { BookSearchMeta } from '../types/book'
import { MAX_PAGE } from './constants'

/** 다음에 요청할 페이지 번호. 더 없으면 undefined (React Query getNextPageParam 규약) */
export function getNextPage(currentPage: number, meta: BookSearchMeta): number | undefined {
  if (meta.is_end) return undefined
  const nextPage = currentPage + 1
  return nextPage > MAX_PAGE ? undefined : nextPage
}
