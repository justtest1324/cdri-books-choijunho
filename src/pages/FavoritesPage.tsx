import { useState } from 'react'
import BookList from '../components/BookList'
import EmptyState from '../components/EmptyState'
import LikeButton from '../components/LikeButton'
import ResultCount from '../components/ResultCount'
import Text from '../components/Text'
import { useFavorites } from '../hooks/useFavorites'
import { PAGE_SIZE } from '../utils/constants'

function FavoritesPage() {
  const { favorites, toggle, isFavorite } = useFavorites()
  // 로컬 데이터도 검색과 동일하게 10개 단위 노출 (PRD 결정 5)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const visibleBooks = favorites.slice(0, visibleCount)

  return (
    <section>
      <Text variant="title2" as="h2">
        내가 찜한 책
      </Text>
      <div className="mt-6">
        <ResultCount label="찜한 책" count={favorites.length} />
      </div>
      {favorites.length === 0 ? (
        <EmptyState message="찜한 책이 없습니다." />
      ) : (
        <BookList
          books={visibleBooks}
          hasNextPage={visibleCount < favorites.length}
          isFetchingNextPage={false}
          onLoadMore={() => setVisibleCount((count) => count + PAGE_SIZE)}
          renderLikeButton={(book) => (
            <LikeButton
              liked={isFavorite(book.isbn)}
              title={book.title}
              onToggle={() => toggle(book)}
            />
          )}
        />
      )}
    </section>
  )
}

export default FavoritesPage
