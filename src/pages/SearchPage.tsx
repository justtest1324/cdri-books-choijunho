import { useSearchParams } from 'react-router'
import BookList from '../components/BookList'
import BookListSkeleton from '../components/BookListSkeleton'
import DetailSearchPopover from '../components/DetailSearchPopover'
import EmptyState from '../components/EmptyState'
import ErrorState from '../components/ErrorState'
import LikeButton from '../components/LikeButton'
import ResultCount from '../components/ResultCount'
import SearchBar from '../components/SearchBar'
import Text from '../components/Text'
import { useBookSearch } from '../hooks/useBookSearch'
import { useFavorites } from '../hooks/useFavorites'
import { useSearchHistory } from '../hooks/useSearchHistory'
import type { SearchTarget } from '../types/book'
import { parseSearchTarget } from '../utils/searchTarget'

function SearchPage() {
  // 검색 상태의 유일한 소스는 URL — 새로고침·뒤로가기·공유 시 검색이 유지된다 (PRD 결정 8)
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''
  const target = parseSearchTarget(searchParams.get('target'))

  const { history, add, remove } = useSearchHistory()
  const { toggle, isFavorite } = useFavorites()
  const { data, status, errorKind, refetch, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useBookSearch({ query, target })

  // 전체 검색 — target을 지워서 상세 검색 조건을 초기화한다 (PRD F-4 배타 규칙)
  const handleSearch = (term: string) => {
    add(term)
    setSearchParams({ q: term })
  }

  // 상세 검색 — SearchBar가 key로 리마운트되며 검색어가 초기화된다 (PRD F-4)
  const handleDetailSearch = (term: string, nextTarget: SearchTarget) => {
    setSearchParams({ q: term, target: nextTarget })
  }

  const isSearching = query.trim() !== ''
  const books = data?.books ?? []

  return (
    <section>
      <Text variant="title2" as="h2">
        도서 검색
      </Text>
      <div className="mt-6 flex items-center gap-4">
        <div className="w-full max-w-[480px]">
          <SearchBar
            key={`${query}:${target ?? ''}`}
            defaultValue={target === undefined ? query : ''}
            history={history}
            onSearch={handleSearch}
            onRemoveHistory={remove}
          />
        </div>
        <DetailSearchPopover
          active={target !== undefined && isSearching ? { term: query, target } : undefined}
          onSearch={handleDetailSearch}
        />
      </div>
      <div className="mt-6">
        <ResultCount label="도서 검색 결과" count={data?.totalCount ?? 0} />
      </div>

      {!isSearching && <EmptyState message="검색된 결과가 없습니다." />}
      {isSearching && status === 'pending' && <BookListSkeleton />}
      {isSearching && status === 'error' && errorKind !== undefined && (
        <ErrorState kind={errorKind} onRetry={() => refetch()} />
      )}
      {status === 'success' &&
        (books.length === 0 ? (
          <EmptyState message="검색된 결과가 없습니다." />
        ) : (
          <BookList
            books={books}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            onLoadMore={fetchNextPage}
            renderLikeButton={(book) => (
              <LikeButton
                liked={isFavorite(book)}
                title={book.title}
                onToggle={() => toggle(book)}
              />
            )}
          />
        ))}
    </section>
  )
}

export default SearchPage
