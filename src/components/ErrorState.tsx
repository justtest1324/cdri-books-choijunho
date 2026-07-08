import type { ApiErrorKind } from '../utils/httpError'
import Button from './Button'
import Text from './Text'

const messages: Record<ApiErrorKind, string> = {
  auth: 'API 인증에 실패했습니다. API 키 설정을 확인해 주세요.',
  rateLimit: '요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.',
  server: '일시적인 오류가 발생했습니다.',
  network: '네트워크 연결을 확인해 주세요.',
}

type ErrorStateProps = {
  kind: ApiErrorKind
  onRetry: () => void
}

/** API 오류 뷰 — 종류별 안내 + 다시 시도 (PRD 4장 에러/제약) */
function ErrorState({ kind, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center gap-6 py-20">
      <Text variant="caption" color="secondary">
        {messages[kind]}
      </Text>
      <Button variant="gray" onClick={onRetry}>
        다시 시도
      </Button>
    </div>
  )
}

export default ErrorState
