import { classifyHttpStatus, type ApiErrorKind } from '../utils/httpError'

const KAKAO_BASE_URL = 'https://dapi.kakao.com'

export class ApiError extends Error {
  readonly kind: ApiErrorKind

  constructor(kind: ApiErrorKind, message: string) {
    super(message)
    this.name = 'ApiError'
    this.kind = kind
  }
}

type QueryParams = Record<string, string | number | undefined>

function buildUrl(path: string, params: QueryParams): string {
  const url = new URL(path, KAKAO_BASE_URL)
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) url.searchParams.set(key, String(value))
  }
  return url.toString()
}

/** 카카오 API GET 요청 — 인증 헤더를 붙이고, 실패를 ApiError로 변환한다 */
export async function kakaoGet<T>(path: string, params: QueryParams): Promise<T> {
  let response: Response
  try {
    response = await fetch(buildUrl(path, params), {
      headers: { Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}` },
    })
  } catch {
    throw new ApiError('network', '네트워크 요청에 실패했습니다')
  }

  if (!response.ok) {
    throw new ApiError(classifyHttpStatus(response.status), `API 요청 실패 (${response.status})`)
  }
  return response.json() as Promise<T>
}
