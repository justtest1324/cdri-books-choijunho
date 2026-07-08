type ChevronIconProps = {
  direction?: 'up' | 'down'
  className?: string
}

function ChevronIcon({ direction = 'down', className = '' }: ChevronIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`${direction === 'up' ? 'rotate-180' : ''} ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

export default ChevronIcon
