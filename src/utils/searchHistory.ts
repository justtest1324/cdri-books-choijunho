import { MAX_HISTORY } from './constants'

/** 검색어를 기록 맨 앞에 추가 — 중복은 앞으로 이동, 최대 개수 초과 시 오래된 것 삭제 */
export function addHistory(history: string[], term: string): string[] {
  const trimmed = term.trim()
  if (trimmed === '') return history
  return [trimmed, ...history.filter((item) => item !== trimmed)].slice(0, MAX_HISTORY)
}

/** 해당 검색어를 기록에서 제거 */
export function removeHistory(history: string[], term: string): string[] {
  return history.filter((item) => item !== term)
}
