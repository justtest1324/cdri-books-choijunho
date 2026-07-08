import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import App from './App'

test('앱이 렌더링되고 검색 페이지가 보인다', () => {
  render(<App />)
  expect(screen.getByText('도서 검색')).toBeDefined()
})
