import { useState } from 'react'
import { readStorage, STORAGE_KEYS, writeStorage } from '../lib/storage'
import type { Book } from '../types/book'
import { isFavorite, toggleFavorite } from '../utils/favorites'

/** 찜 목록 — localStorage 영속, 찜 시점 스냅샷 저장 (PRD F-8·F-9) */
export function useFavorites() {
  const [favorites, setFavorites] = useState<Book[]>(() => readStorage(STORAGE_KEYS.favorites, []))

  const toggle = (book: Book) => {
    const next = toggleFavorite(favorites, book)
    setFavorites(next)
    writeStorage(STORAGE_KEYS.favorites, next)
  }

  return {
    favorites,
    toggle,
    isFavorite: (book: Book) => isFavorite(favorites, book),
  }
}
