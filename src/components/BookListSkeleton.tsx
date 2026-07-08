import { PAGE_SIZE } from '../utils/constants'

/** 첫 검색 로딩 스켈레톤 — 리스트 아이템 형태 (PRD 결정 7) */
function BookListSkeleton() {
  return (
    <ul aria-hidden="true" className="animate-pulse">
      {Array.from({ length: PAGE_SIZE }, (_, index) => (
        <li key={index} className="border-b-gray flex items-center gap-8 border-b px-4 py-4">
          <div className="bg-light-gray h-17 w-12" />
          <div className="grow">
            <div className="bg-light-gray h-4 w-1/3 rounded" />
          </div>
          <div className="bg-light-gray h-4 w-16 rounded" />
          <div className="bg-light-gray h-12 w-28 rounded-lg" />
          <div className="bg-light-gray h-12 w-28 rounded-lg" />
        </li>
      ))}
    </ul>
  )
}

export default BookListSkeleton
