/** localStorage 접근의 유일한 경계 (CONVENTIONS 1.5) — JSON 직렬화와 오류 무시를 담당 */

export const STORAGE_KEYS = {
  searchHistory: 'certicos-books:search-history',
  favorites: 'certicos-books:favorites',
} as const

type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS]

export function readStorage<T>(key: StorageKey, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key)
    return raw === null ? fallback : (JSON.parse(raw) as T)
  } catch {
    return fallback
  }
}

export function writeStorage<T>(key: StorageKey, value: T): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // 저장 실패(쿼터 초과 등)는 앱 동작을 막지 않는다
  }
}
