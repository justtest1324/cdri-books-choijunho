import { describe, expect, it } from 'vitest'
import { classifyHttpStatus } from './httpError'

describe('classifyHttpStatus', () => {
  it('401/403은 인증 오류로 분류한다', () => {
    expect(classifyHttpStatus(401)).toBe('auth')
    expect(classifyHttpStatus(403)).toBe('auth')
  })

  it('429는 쿼터 초과로 분류한다', () => {
    expect(classifyHttpStatus(429)).toBe('rateLimit')
  })

  it('그 외 실패 상태는 서버 오류로 분류한다', () => {
    expect(classifyHttpStatus(400)).toBe('server')
    expect(classifyHttpStatus(500)).toBe('server')
  })
})
