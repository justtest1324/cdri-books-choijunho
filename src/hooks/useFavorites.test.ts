import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { readStorage, STORAGE_KEYS, writeStorage } from '../lib/storage'
import type { Book } from '../types/book'
import { useFavorites } from './useFavorites'

vi.mock('../lib/storage', () => ({
  STORAGE_KEYS: { favorites: 'certicos-books:favorites' },
  readStorage: vi.fn(),
  writeStorage: vi.fn(),
}))

const book = (isbn: string): Book => ({
  title: `책 ${isbn}`,
  contents: '',
  url: '',
  isbn,
  datetime: '',
  authors: [],
  publisher: '',
  translators: [],
  price: 10000,
  sale_price: -1,
  thumbnail: '',
  status: '정상판매',
})

beforeEach(() => {
  vi.mocked(readStorage).mockReturnValue([])
  vi.mocked(writeStorage).mockReset()
})

describe('useFavorites', () => {
  it('저장된 찜 목록을 초기값으로 읽는다', () => {
    vi.mocked(readStorage).mockReturnValue([book('1')])
    const { result } = renderHook(() => useFavorites())
    expect(result.current.favorites).toHaveLength(1)
    expect(result.current.isFavorite('1')).toBe(true)
  })

  it('토글로 추가하면 상태와 저장소에 반영된다', () => {
    const { result } = renderHook(() => useFavorites())
    act(() => result.current.toggle(book('1')))
    expect(result.current.isFavorite('1')).toBe(true)
    expect(writeStorage).toHaveBeenCalledWith(STORAGE_KEYS.favorites, [book('1')])
  })

  it('토글로 해제하면 저장소에서도 사라진다', () => {
    vi.mocked(readStorage).mockReturnValue([book('1')])
    const { result } = renderHook(() => useFavorites())
    act(() => result.current.toggle(book('1')))
    expect(result.current.favorites).toHaveLength(0)
    expect(writeStorage).toHaveBeenCalledWith(STORAGE_KEYS.favorites, [])
  })
})
