import type { ReactNode } from 'react'
import BookIllustration from './icons/BookIllustration'

type BookThumbnailProps = {
  src: string
  title: string
  className?: string
  overlay?: ReactNode
}

/** 도서 표지 — 빈 thumbnail은 플레이스홀더로 대체 (PRD 결정 9), 우상단 overlay 슬롯(찜 하트) */
function BookThumbnail({ src, title, className = '', overlay }: BookThumbnailProps) {
  return (
    <div className={`relative shrink-0 ${className}`}>
      {src === '' ? (
        <div className="bg-light-gray flex size-full items-center justify-center">
          <BookIllustration className="size-1/2 opacity-40" />
        </div>
      ) : (
        <img src={src} alt={`${title} 표지`} loading="lazy" className="size-full object-cover" />
      )}
      {overlay !== undefined && <div className="absolute top-0.5 right-0.5">{overlay}</div>}
    </div>
  )
}

export default BookThumbnail
