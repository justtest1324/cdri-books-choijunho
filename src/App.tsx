import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router'
import { ApiError } from './api/http'
import Layout from './components/Layout'
import FavoritesPage from './pages/FavoritesPage'
import SearchPage from './pages/SearchPage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 같은 검색어 재검색 시 5분간 캐시를 신선한 것으로 취급 — 불필요한 재요청 방지 (PRD 7장 성능)
      staleTime: 5 * 60 * 1000,
      // 인증 오류는 재시도해도 결과가 같고, 쿼터 초과(429)는 재시도가 상황을 악화시킨다
      retry: (failureCount, error) => {
        if (error instanceof ApiError && (error.kind === 'auth' || error.kind === 'rateLimit')) {
          return false
        }
        return failureCount < 1
      },
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<SearchPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
