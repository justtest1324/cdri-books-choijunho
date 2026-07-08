import EmptyState from '../components/EmptyState'
import Text from '../components/Text'

function SearchPage() {
  return (
    <section>
      <Text variant="title2" as="h2">
        도서 검색
      </Text>
      <EmptyState message="검색된 결과가 없습니다." />
    </section>
  )
}

export default SearchPage
