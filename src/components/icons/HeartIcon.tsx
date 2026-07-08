type HeartIconProps = {
  filled?: boolean
  className?: string
}

function HeartIcon({ filled = false, className = '' }: HeartIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill={filled ? 'var(--color-red)' : 'none'}
      stroke={filled ? 'var(--color-red)' : 'currentColor'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 21c-.4 0-.8-.14-1.1-.42C9.02 18.9 4 14.36 4 10.5 4 7.42 6.42 5 9.5 5c1 0 1.92.3 2.5.8.58-.5 1.5-.8 2.5-.8 3.08 0 5.5 2.42 5.5 5.5 0 3.86-5.02 8.4-6.9 10.08-.3.28-.7.42-1.1.42Z" />
    </svg>
  )
}

export default HeartIcon
