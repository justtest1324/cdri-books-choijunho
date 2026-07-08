import CloseIcon from './icons/CloseIcon'
import Text from './Text'

type FilterChipProps = {
  label: string
  onRemove: () => void
}

/** 활성 검색 조건 표시 칩 — X로 조건 해제 */
function FilterChip({ label, onRemove }: FilterChipProps) {
  return (
    <span className="bg-light-gray inline-flex items-center gap-2 rounded-full py-1.5 pr-2.5 pl-3.5">
      <Text variant="body2" color="secondary">
        {label}
      </Text>
      <button
        type="button"
        aria-label={`${label} 검색 조건 해제`}
        className="cursor-pointer"
        onClick={onRemove}
      >
        <CloseIcon className="text-text-secondary size-3" />
      </button>
    </span>
  )
}

export default FilterChip
