import EmptyState from '../components/EmptyState'
import Text from '../components/Text'

function FavoritesPage() {
  return (
    <section>
      <Text variant="title2" as="h2">
        내가 찜한 책
      </Text>
      <EmptyState message="찜한 책이 없습니다." />
    </section>
  )
}

export default FavoritesPage
