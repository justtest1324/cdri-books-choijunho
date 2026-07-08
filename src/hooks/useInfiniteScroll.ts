import { useEffect, useRef } from 'react'

/**
 * 무한 스크롤 — sentinel 요소가 뷰포트에 들어오면 onIntersect 호출.
 * IntersectionObserver 등록은 '외부 시스템과의 동기화'로 정당한 useEffect (CONVENTIONS 1.6)
 */
export function useInfiniteScroll(onIntersect: () => void, enabled: boolean) {
  const sentinelRef = useRef<HTMLDivElement>(null)
  const callbackRef = useRef(onIntersect)
  callbackRef.current = onIntersect

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!enabled || sentinel === null) return

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) callbackRef.current()
    })
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [enabled])

  return sentinelRef
}
