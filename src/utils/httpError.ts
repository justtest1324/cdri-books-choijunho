export type HttpErrorKind = 'auth' | 'rateLimit' | 'server'

/** API 오류 종류 — HTTP 실패 분류 + 네트워크 오류 */
export type ApiErrorKind = HttpErrorKind | 'network'

/** HTTP 실패 상태 코드를 UI가 구분할 오류 종류로 분류한다 */
export function classifyHttpStatus(status: number): HttpErrorKind {
  if (status === 401 || status === 403) return 'auth'
  if (status === 429) return 'rateLimit'
  return 'server'
}
