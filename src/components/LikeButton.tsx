import HeartIcon from './icons/HeartIcon'

type LikeButtonProps = {
  liked: boolean
  title: string
  onToggle: () => void
}

/** 찜 하트 버튼 — 썸네일 우상단 (PRD 결정 2, Figma like/line·like/fill) */
function LikeButton({ liked, title, onToggle }: LikeButtonProps) {
  return (
    <button
      type="button"
      aria-pressed={liked}
      aria-label={liked ? `${title} 찜 해제` : `${title} 찜하기`}
      className="cursor-pointer drop-shadow-sm"
      onClick={onToggle}
    >
      <HeartIcon filled={liked} className="size-6 text-white" />
    </button>
  )
}

export default LikeButton
