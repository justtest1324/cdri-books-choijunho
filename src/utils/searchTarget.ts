import type { SearchTarget } from '../types/book'

/** 상세 검색 조건 옵션 — Figma 셀렉트와 API target 매핑 (PRD 4장) */
export const TARGET_OPTIONS: { value: SearchTarget; label: string }[] = [
  { value: 'title', label: '제목' },
  { value: 'person', label: '저자명' },
  { value: 'publisher', label: '출판사' },
]

/** URL 파라미터 등 신뢰할 수 없는 문자열을 SearchTarget으로 검증 */
export function parseSearchTarget(value: string | null): SearchTarget | undefined {
  return TARGET_OPTIONS.some((option) => option.value === value)
    ? (value as SearchTarget)
    : undefined
}

/** target의 한글 라벨 (조건 칩 표시용) */
export function getTargetLabel(target: SearchTarget): string {
  return TARGET_OPTIONS.find((option) => option.value === target)?.label ?? ''
}
