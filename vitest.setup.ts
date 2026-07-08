import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// vitest는 globals를 켜지 않으면 RTL의 auto-cleanup이 동작하지 않는다.
// cleanup 누락은 테스트 간 DOM 누적 → "multiple elements" 류 간헐 실패의 원인 (CONVENTIONS 3장)
afterEach(() => {
  cleanup()
})
