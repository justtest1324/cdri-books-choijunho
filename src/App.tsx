import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router'
import Layout from './components/Layout'
import FavoritesPage from './pages/FavoritesPage'
import SearchPage from './pages/SearchPage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 같은 검색어 재검색 시 5분간 캐시를 신선한 것으로 취급 — 불필요한 재요청 방지 (PRD 7장 성능)
      staleTime: 5 * 60 * 1000,
      retry: 1,
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
