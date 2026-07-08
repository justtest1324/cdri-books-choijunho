import { useState } from 'react'
import EmptyState from '../components/EmptyState'
import ResultCount from '../components/ResultCount'
import SearchBar from '../components/SearchBar'
import Text from '../components/Text'
import { useBookSearch } from '../hooks/useBookSearch'
import { useSearchHistory } from '../hooks/useSearchHistory'

function SearchPage() {
  const [query, setQuery] = useState('')
  const { history, add, remove } = useSearchHistory()
  const { data } = useBookSearch({ query })

  const handleSearch = (term: string) => {
    add(term)
    setQuery(term)
  }

  const books = data?.books ?? []

  return (
    <section>
      <Text variant="title2" as="h2">
        도서 검색
      </Text>
      <div className="mt-6 w-full max-w-[480px]">
        <SearchBar history={history} onSearch={handleSearch} onRemoveHistory={remove} />
      </div>
      <div className="mt-6">
        <ResultCount label="도서 검색 결과" count={data?.totalCount ?? 0} />
      </div>
      {books.length === 0 && <EmptyState message="검색된 결과가 없습니다." />}
    </section>
  )
}

export default SearchPage
