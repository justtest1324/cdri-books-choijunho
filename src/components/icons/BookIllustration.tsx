// 빈 상태 일러스트 (Figma 캡처 근사 재현 — 원본 에셋 export 시 교체)
type BookIllustrationProps = {
  className?: string
}

function BookIllustration({ className = '' }: BookIllustrationProps) {
  return (
    <svg viewBox="0 0 80 80" aria-hidden="true" className={className}>
      <circle cx="40" cy="40" r="40" fill="#7ACFC4" />
      <path
        d="M24 26c0-2 1.6-3.5 3.6-3.5H52a4 4 0 0 1 4 4V52a4 4 0 0 1-4 4H28a4 4 0 0 1-4-4V26Z"
        fill="#2E4865"
      />
      <path
        d="M28 24h22a3 3 0 0 1 3 3v22a3 3 0 0 1-3 3H30c-3 0-5 1.4-6 2.6V27c0-1.7 1.8-3 4-3Z"
        fill="#FFD259"
      />
      <path d="M24 54.5c1-1.6 3-2.5 6-2.5h23v4H28a4 4 0 0 1-4-1.5Z" fill="#F5F7FA" />
    </svg>
  )
}

export default BookIllustration
