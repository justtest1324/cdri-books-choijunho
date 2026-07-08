import type { ReactNode } from 'react'
import { useInfiniteScroll } from '../hooks/useInfiniteScroll'
import { getBookKey } from '../utils/bookKey'
import type { Book } from '../types/book'
import BookListItem from './BookListItem'
import Spinner from './Spinner'

type BookListProps = {
  books: Book[]
  hasNextPage: boolean
  isFetchingNextPage: boolean
  onLoadMore: () => void
  renderLikeButton?: (book: Book) => ReactNode
}

/** 도서 목록 + 무한 스크롤 — 검색/찜 페이지가 공유 (PRD F-5·F-6) */
function BookList({
  books,
  hasNextPage,
  isFetchingNextPage,
  onLoadMore,
  renderLikeButton,
}: BookListProps) {
  const sentinelRef = useInfiniteScroll(onLoadMore, hasNextPage && !isFetchingNextPage)

  return (
    <>
      <ul>
        {books.map((book) => (
          <BookListItem key={getBookKey(book)} book={book} likeButton={renderLikeButton?.(book)} />
        ))}
      </ul>
      {isFetchingNextPage && (
        <div className="flex justify-center py-6">
          <Spinner />
        </div>
      )}
      <div ref={sentinelRef} aria-hidden="true" className="h-px" />
    </>
  )
}

export default BookList
