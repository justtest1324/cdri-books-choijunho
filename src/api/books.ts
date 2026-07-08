import type { BookSearchResponse, SearchParams } from '../types/book'
import { PAGE_SIZE } from '../utils/constants'
import { kakaoGet } from './http'

/** 도서 검색 (카카오 책 검색 API — PRD 4장) */
export function searchBooks({
  query,
  target,
  page,
}: SearchParams & { page: number }): Promise<BookSearchResponse> {
  return kakaoGet<BookSearchResponse>('/v3/search/book', {
    query,
    target,
    page,
    size: PAGE_SIZE,
  })
}
