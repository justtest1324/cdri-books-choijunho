import { useState } from 'react'
import ChevronIcon from './icons/ChevronIcon'

type SelectOption<T extends string> = { value: T; label: string }

type SelectProps<T extends string> = {
  options: SelectOption<T>[]
  value: T
  onChange: (value: T) => void
}

/** 커스텀 셀렉트 — Figma 상세 검색 팝업의 조건 선택 */
function Select<T extends string>({ options, value, onChange }: SelectProps<T>) {
  const [open, setOpen] = useState(false)
  const selected = options.find((option) => option.value === value)

  return (
    <div className="relative w-24 shrink-0">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        className="border-b-gray text-body2 text-text-primary flex h-9 w-full cursor-pointer items-center justify-between border-b font-bold"
        onClick={() => setOpen((prev) => !prev)}
        onBlur={() => setOpen(false)}
      >
        {selected?.label}
        <ChevronIcon direction={open ? 'up' : 'down'} className="text-text-secondary size-4" />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute inset-x-0 top-full z-20 bg-white py-1 shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
        >
          {options.map((option) => (
            <li key={option.value} role="option" aria-selected={option.value === value}>
              <button
                type="button"
                className="text-body2 text-text-secondary hover:bg-light-gray w-full cursor-pointer px-3 py-2 text-left"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  onChange(option.value)
                  setOpen(false)
                }}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Select
