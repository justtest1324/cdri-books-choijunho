import { useState, type KeyboardEvent } from 'react'
import CloseIcon from './icons/CloseIcon'
import SearchIcon from './icons/SearchIcon'

type SearchBarProps = {
  history: string[]
  defaultValue?: string
  onSearch: (term: string) => void
  onRemoveHistory: (term: string) => void
}

/** 검색 입력 + 검색 기록 드롭다운 (PRD F-1·F-2, 결정 4) */
function SearchBar({ history, defaultValue = '', onSearch, onRemoveHistory }: SearchBarProps) {
  const [value, setValue] = useState(defaultValue)
  const [focused, setFocused] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)

  // 드롭다운 노출은 상태에서 파생: 포커스 중 + 입력 전 + 기록 있음 (결정 4)
  const isOpen = focused && value === '' && history.length > 0

  const submit = (term: string) => {
    const trimmed = term.trim()
    if (trimmed === '') return
    setValue(trimmed)
    setActiveIndex(-1)
    onSearch(trimmed)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((prev) => (prev + 1) % history.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((prev) => (prev <= 0 ? history.length - 1 : prev - 1))
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault()
      // 탐색 중 항목이 삭제되면 activeIndex가 범위를 벗어날 수 있다
      const selected = history[activeIndex]
      if (selected !== undefined) submit(selected)
    } else if (e.key === 'Escape') {
      setFocused(false)
    }
  }

  return (
    <div className="relative">
      <form
        role="search"
        className={`bg-light-gray ${isOpen ? 'rounded-t-3xl' : 'rounded-full'}`}
        onSubmit={(e) => {
          e.preventDefault()
          submit(value)
        }}
      >
        <div className="flex h-[50px] items-center gap-3 px-5">
          <SearchIcon className="text-text-secondary size-5 shrink-0" />
          <input
            type="text"
            value={value}
            placeholder="검색어를 입력하세요"
            aria-label="도서 검색"
            className="text-caption text-text-primary placeholder:text-text-subtitle w-full bg-transparent outline-none"
            onChange={(e) => {
              setValue(e.target.value)
              setActiveIndex(-1)
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </form>

      {isOpen && (
        <ul
          role="listbox"
          aria-label="검색 기록"
          className="bg-light-gray absolute inset-x-0 z-10 rounded-b-3xl pb-4"
        >
          {history.map((term, index) => (
            <li
              key={term}
              role="option"
              aria-selected={index === activeIndex}
              className={`flex items-center justify-between py-3 pr-5 pl-13 ${
                index === activeIndex ? 'bg-gray/30' : ''
              }`}
            >
              <button
                type="button"
                className="text-caption text-text-subtitle grow cursor-pointer text-left"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => submit(term)}
              >
                {term}
              </button>
              <button
                type="button"
                aria-label={`검색 기록에서 ${term} 삭제`}
                className="cursor-pointer"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  setActiveIndex(-1)
                  onRemoveHistory(term)
                }}
              >
                <CloseIcon className="text-text-primary size-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SearchBar
