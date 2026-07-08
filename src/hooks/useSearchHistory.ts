import { useState } from 'react'
import { readStorage, STORAGE_KEYS, writeStorage } from '../lib/storage'
import { addHistory, removeHistory } from '../utils/searchHistory'

/** 검색 기록 — localStorage 영속, 최대 8개 FIFO (PRD F-2) */
export function useSearchHistory() {
  const [history, setHistory] = useState<string[]>(() =>
    readStorage(STORAGE_KEYS.searchHistory, []),
  )

  const update = (next: string[]) => {
    setHistory(next)
    writeStorage(STORAGE_KEYS.searchHistory, next)
  }

  return {
    history,
    add: (term: string) => update(addHistory(history, term)),
    remove: (term: string) => update(removeHistory(history, term)),
  }
}
