export type Book = {
  title: string
  contents: string
  url: string
  isbn: string
  datetime: string
  authors: string[]
  publisher: string
  translators: string[]
  price: number
  sale_price: number
  thumbnail: string
  status: string
}

export type BookSearchMeta = {
  total_count: number
  pageable_count: number
  is_end: boolean
}

export type BookSearchResponse = {
  meta: BookSearchMeta
  documents: Book[]
}

/** 상세 검색 조건 — 카카오 API target 파라미터와 1:1 */
export type SearchTarget = 'title' | 'person' | 'publisher'

export type SearchParams = {
  query: string
  target?: SearchTarget
}
