import { useState, type FormEvent } from 'react'
import type { SearchTarget } from '../types/book'
import { TARGET_OPTIONS } from '../utils/searchTarget'
import Button from './Button'
import CloseIcon from './icons/CloseIcon'
import Select from './Select'

type ActiveDetailSearch = {
  term: string
  target: SearchTarget
}

type DetailSearchPopoverProps = {
  /** 현재 활성인 상세 검색 조건 — 있으면 팝업을 다시 열 때 채워진다 */
  active?: ActiveDetailSearch
  onSearch: (term: string, target: SearchTarget) => void
}

/**
 * 상세검색 버튼 + 하단 팝오버 (PRD F-3)
 * 열 때 활성 상세 검색 조건이 있으면 유지, 없으면 초기화 —
 * 명세의 초기화 조건은 '전체 검색 실행 시'뿐이므로 재오픈 유지는 명세와 양립 (F-4)
 */
function DetailSearchPopover({ active, onSearch }: DetailSearchPopoverProps) {
  const [open, setOpen] = useState(false)
  const [target, setTarget] = useState<SearchTarget>('title')
  const [term, setTerm] = useState('')

  const openPopover = () => {
    setTarget(active?.target ?? 'title')
    setTerm(active?.term ?? '')
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
    <div
      className="relative shrink-0"
      onKeyDown={(e) => {
        if (e.key === 'Escape') setOpen(false)
      }}
    >
      <button
        type="button"
        className="border-subtitle text-body2 text-text-subtitle h-9 cursor-pointer rounded-lg border px-3"
        style={{ borderColor: 'var(--color-text-subtitle)' }}
        onClick={() => (open ? setOpen(false) : openPopover())}
      >
        상세검색
      </button>

      {open && (
        // 바깥 클릭 시 닫힘 — document 리스너(useEffect) 대신 백드롭 레이어로 선언적 처리
        <div
          role="presentation"
          data-testid="popover-backdrop"
          className="fixed inset-0 z-10 max-md:bg-black/30"
          onClick={() => setOpen(false)}
        />
      )}
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
