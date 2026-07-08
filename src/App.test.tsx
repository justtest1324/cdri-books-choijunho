import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import App from './App'

test('앱이 렌더링되고 헤더와 검색 페이지가 보인다', () => {
  render(<App />)
  expect(screen.getByText('CERTICOS BOOKS')).toBeDefined()
  expect(screen.getByText('검색된 결과가 없습니다.')).toBeDefined()
})
