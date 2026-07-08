import { useState, type FormEvent } from 'react'
import type { SearchTarget } from '../types/book'
import { TARGET_OPTIONS } from '../utils/searchTarget'
import Button from './Button'
import CloseIcon from './icons/CloseIcon'
import Select from './Select'

type DetailSearchPopoverProps = {
  onSearch: (term: string, target: SearchTarget) => void
}

/** 상세검색 버튼 + 하단 팝오버 (PRD F-3) — 열 때마다 조건이 초기화된다 */
function DetailSearchPopover({ onSearch }: DetailSearchPopoverProps) {
  const [open, setOpen] = useState(false)
  const [target, setTarget] = useState<SearchTarget>('title')
  const [term, setTerm] = useState('')

  const openPopover = () => {
    setTarget('title')
    setTerm('')
    setOpen(true)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const trimmed = term.trim()
    if (trimmed === '') return
    setOpen(false)
    onSearch(trimmed, target)
  }

  return (
    <div className="relative shrink-0">
      <button
        type="button"
        className="border-subtitle text-body2 text-text-subtitle h-9 cursor-pointer rounded-lg border px-3"
        style={{ borderColor: 'var(--color-text-subtitle)' }}
        onClick={() => (open ? setOpen(false) : openPopover())}
      >
        상세검색
      </button>

      {open && (
        <div className="absolute top-full left-1/2 z-20 mt-4 w-90 -translate-x-1/2 rounded-lg bg-white p-6 shadow-[0_4px_14px_6px_rgba(151,151,151,0.15)] max-md:fixed max-md:inset-x-0 max-md:top-auto max-md:bottom-0 max-md:left-0 max-md:mt-0 max-md:w-full max-md:translate-x-0 max-md:rounded-t-2xl max-md:rounded-b-none max-md:pb-8">
          <button
            type="button"
            aria-label="상세검색 닫기"
            className="absolute top-3 right-3 cursor-pointer"
            onClick={() => setOpen(false)}
          >
            <CloseIcon className="text-text-secondary size-4" />
          </button>
          <form className="mt-2 flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex items-end gap-2">
              <Select options={TARGET_OPTIONS} value={target} onChange={setTarget} />
              <input
                type="text"
                value={term}
                placeholder="검색어 입력"
                aria-label="상세검색어"
                className="border-b-primary text-body2 text-text-primary placeholder:text-text-subtitle h-9 w-full border-b outline-none"
                onChange={(e) => setTerm(e.target.value)}
              />
            </div>
            <Button type="submit" className="h-9 w-full">
              검색하기
            </Button>
          </form>
        </div>
      )}
    </div>
  )
}

export default DetailSearchPopover
