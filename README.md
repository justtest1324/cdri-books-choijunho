# CDRI BOOKS — 도서 검색 서비스

카카오 도서 검색 API를 활용한 도서 검색 웹 애플리케이션입니다. (CDRI 프론트엔드 사전과제)

## 프로젝트 개요

- 도서 검색 및 상세 검색(제목/저자명/출판사) 기능
- 검색 결과 목록 및 상세 정보 확인
- 내가 찜한 책 저장 및 관리

## 실행 방법 및 환경 설정

```bash
# 1. 의존성 설치
npm install

# 2. 환경 변수 설정 — .env.example을 복사해 카카오 REST API 키 입력
cp .env.example .env

# 3. 개발 서버 실행
npm run dev
```

`.env` 파일에 카카오 REST API 키가 필요합니다:

```
VITE_KAKAO_REST_API_KEY=발급받은_REST_API_키
```

> API 키 발급: [카카오 개발자 문서](https://developers.kakao.com/docs/ko/app-setting/app#rest-api-key)

## 기술 스택

- **React.js** + **TypeScript** (Vite)
- **React Query** (@tanstack/react-query) — 서버 상태 관리
- 스타일링: (선정 후 작성)

## 폴더 구조 및 주요 코드 설명

```
src/
  (작성 예정)
```

## 라이브러리 선택 이유

(작성 예정)

## 강조하고 싶은 기능

(작성 예정)
