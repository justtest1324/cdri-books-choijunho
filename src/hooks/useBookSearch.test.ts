import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { createElement, type ReactNode } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { searchBooks } from '../api/books'
import type { Book, BookSearchResponse } from '../types/book'
import { useBookSearch } from './useBookSearch'

vi.mock('../api/books')

const book = (isbn: string): Book => ({
  title: `책 ${isbn}`,
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

const response = (isbns: string[], isEnd: boolean): BookSearchResponse => ({
  meta: { total_count: 25, pageable_count: 25, is_end: isEnd },
  documents: isbns.map(book),
})

function wrapper({ children }: { children: ReactNode }) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return createElement(QueryClientProvider, { client }, children)
}

beforeEach(() => {
  vi.mocked(searchBooks).mockReset()
})

describe('useBookSearch', () => {
  it('검색어가 비어 있으면 요청하지 않는다', () => {
    renderHook(() => useBookSearch({ query: '  ' }), { wrapper })
    expect(searchBooks).not.toHaveBeenCalled()
  })

  it('검색 성공 시 평탄화된 목록과 총 건수를 반환한다', async () => {
    vi.mocked(searchBooks).mockResolvedValue(response(['1', '2'], false))

    const { result } = renderHook(() => useBookSearch({ query: '하루키' }), { wrapper })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data).toEqual({
      books: [book('1'), book('2')],
      totalCount: 25,
    })
    expect(searchBooks).toHaveBeenCalledWith({ query: '하루키', target: undefined, page: 1 })
  })

  it('is_end면 다음 페이지가 없다', async () => {
    vi.mocked(searchBooks).mockResolvedValue(response(['1'], true))

    const { result } = renderHook(() => useBookSearch({ query: '하루키' }), { wrapper })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.hasNextPage).toBe(false)
  })

  it('상세 검색 조건(target)이 API 호출에 전달된다', async () => {
    vi.mocked(searchBooks).mockResolvedValue(response(['1'], true))

    renderHook(() => useBookSearch({ query: '하루키', target: 'person' }), { wrapper })

    await waitFor(() =>
      expect(searchBooks).toHaveBeenCalledWith({ query: '하루키', target: 'person', page: 1 }),
    )
  })
})
