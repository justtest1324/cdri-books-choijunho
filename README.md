# CERTICOS BOOKS — 도서 검색 서비스

카카오 도서 검색 API를 활용한 도서 검색 웹 애플리케이션입니다. (CDRI 프론트엔드 사전과제)

## 프로젝트 개요

| 기능 | 설명 |
|---|---|
| 도서 검색 | 검색어 입력 후 Enter로 검색, 결과 무한 스크롤(10개 단위) |
| 검색 기록 | 최근 8개 저장(FIFO), 검색바 포커스 시 노출, 개별 삭제, 키보드(↑↓·Enter·Esc) 조작, 브라우저 재시작 후 유지 |
| 상세 검색 | 제목/저자명/출판사 조건 검색 (팝오버). 전체 검색과 상호 배타 — 한쪽 실행 시 다른 쪽 조건 초기화 |
| URL 동기화 | 검색 상태가 `?q=&target=`에 저장 — 새로고침·뒤로가기·링크 공유 시 결과 유지 |
| 결과 리스트 | 아코디언 상세(책 소개·원가/할인가), 구매하기(새 탭), 로딩 스켈레톤·에러 뷰·빈 상태 |
| 찜하기 | 썸네일 우상단 하트 토글. **찜 시점의 도서 스냅샷**을 localStorage에 저장 (명세된 동작) |
| 내가 찜한 책 | 찜 목록 조회/해제, 검색과 동일한 10개 단위 노출 |
| 반응형 | 데스크톱/태블릿/모바일(하단 시트·세로 스택) 대응 |

기획·화면 명세는 [docs/PRD.md](docs/PRD.md), 코딩 원칙은 [docs/CONVENTIONS.md](docs/CONVENTIONS.md) 참조.

## 실행 방법 및 환경 설정

```bash
# 1. 의존성 설치 (Node 20+)
npm install

# 2. 환경 변수 — 카카오 REST API 키 입력
cp .env.example .env
#   VITE_KAKAO_REST_API_KEY=발급받은_REST_API_키
#   발급: https://developers.kakao.com/console/app → [앱] > [플랫폼 키]

# 3. 개발 서버
npm run dev
```

| 스크립트 | 역할 |
|---|---|
| `npm run dev` / `npm run build` | 개발 서버 / 프로덕션 빌드 |
| `npm test` | vitest 단위 테스트 (42개) |
| `npm run check` | **통합 검증** — 타입체크 + 린트 + 컨벤션 검사 + 테스트 |

## 폴더 구조 및 주요 코드 설명

구조의 핵심 원칙은 **데이터 / 계산 / 액션 분리**입니다. 순수 로직은 사이드 이펙트 없는 함수로 격리해 테스트하고, 외부 세계(API·localStorage)와의 접촉은 지정된 경계에서만 일어납니다.

```
src/
  types/        # 데이터 — Book 등 도메인 타입
  utils/        # 계산 — 순수 함수 (가격 규칙, 기록 FIFO, 페이지 계산, 찜 토글…) ← 단위 테스트 집중
  api/          # 액션 — fetch 래퍼(인증·에러 변환), 도서 검색. fetch는 여기서만 허용
  lib/          # 액션 — localStorage 유일 경계 (storage.ts)
  hooks/        # 조립 — useBookSearch(서버), useFavorites·useSearchHistory(영속), useInfiniteScroll
  components/   # 표현 — 디자인 토큰 기반 재사용 UI. 상태 로직·API 호출 없음
  pages/        # 화면 — SearchPage, FavoritesPage
  styles/       # @theme 디자인 토큰 (Figma 실측값)
```

**주요 코드 포인트**

- `hooks/useBookSearch.ts` — `useInfiniteQuery` 하나로 검색·캐싱·무한 스크롤을 처리. 페이지 평탄화는 `select`로, 빈 검색어 차단은 `enabled`로 — 명령형 코드 없이 선언적 옵션으로 해결
- `pages/SearchPage.tsx` — 검색 상태의 유일한 소스는 URL. "상세 검색 중" 같은 플래그가 없고, `target` 파라미터의 유무가 곧 모드
- `components/BookList.tsx` — 검색/찜 페이지가 공유하는 목록 컴포넌트. 찜 버튼은 `renderLikeButton` 슬롯으로 주입받아 목록이 찜 도메인을 모름
- `lib/storage.ts` + `.oxlintrc.json` — localStorage/fetch 경계를 **린트 규칙으로 강제** (`no-restricted-globals`). 어기면 에러
- `utils/` 전체 — 핵심 규칙(검색 기록 8개 FIFO, sale_price −1 처리, page ≤ 50)이 순수 함수로 격리되어 mock 없이 테스트

## 라이브러리 선택 이유

| 라이브러리 | 이유 |
|---|---|
| **@tanstack/react-query** (필수) | 서버 상태의 캐싱·재시도·무한 페이지네이션을 선언적으로 처리. 같은 검색어 재검색 시 캐시에서 즉시 표시 |
| **Tailwind CSS v4** | Figma 실측 토큰(컬러 9종·타이포 8종)을 `@theme`으로 선언하면 유틸리티가 자동 생성 — 디자인 시스템과 코드가 1:1. 빌드 타임 정적 CSS라 런타임 오버헤드 0. 유틸리티 남용은 `Text`·`Button` 등 컴포넌트 캡슐화로 방지 |
| **react-router** | 탭·검색 상태를 URL로 관리하기 위한 기반. 새로고침/공유 시 상태 유지 |
| **vitest** | Vite와 동일한 변환 파이프라인의 테스트 러너. 계산 함수·훅은 TDD로 작성 |
| axios **미채용** | 엔드포인트가 1개라 얇은 fetch 래퍼로 충분 — 의존성 최소화 |
| styled-components 계열 **미채용** | 2025년 유지보수 모드 전환 + 런타임 스타일 비용. 토큰 대응은 Tailwind v4 `@theme`으로 동등하게 가능 |

## 강조하고 싶은 기능

1. **검색 상태의 URL 동기화** — 검색 결과 화면을 새로고침해도, 링크로 공유해도 같은 화면이 나옵니다. 전체↔상세 검색 배타 규칙도 별도 상태 없이 URL 구조(`target` 유무)로 표현했습니다.
2. **원칙이 문서가 아니라 도구로 강제됨** — 데이터/계산/액션 분리·레이어 경계(컴포넌트는 api를 import 못 함)·훅 단일 책임이 oxlint 규칙과 검증 스크립트로 걸립니다. `npm run check` 한 번으로 타입·린트·컨벤션·테스트 42개가 검증됩니다.
3. **재사용 컴포넌트 설계** — 검색 결과와 찜 목록이 동일한 `BookList`를 사용하고, 타이포·컬러는 Figma 실측 토큰을 감싼 `Text`·`Button`으로만 사용합니다.
4. **실데이터 엣지 처리** — 카카오 API의 `sale_price: -1`(할인 없음), 빈 `thumbnail`(플레이스홀더), `page ≤ 50` 상한, 401/429/네트워크 오류별 안내와 재시도를 처리했습니다.
5. **성능** — React Query 캐싱, 이미지 lazy loading, 무한 스크롤(IntersectionObserver), 빌드 타임 CSS. 프로젝트 전체에서 `useEffect`는 IntersectionObserver 등록 1곳뿐입니다.
6. **접근성** — 검색 기록 키보드 조작, 아이콘 버튼 aria-label, 하트 aria-pressed, 시맨틱 마크업.

## 알려진 한계

- 클라이언트에서 카카오 API를 직접 호출하는 과제 구조상 **API 키가 번들에 포함**됩니다. `.env`+`.gitignore`는 저장소 노출을 막는 목적이며, 실서비스라면 프록시 서버 또는 카카오 콘솔의 플랫폼(도메인) 제한 설정이 필요합니다.
