import { useState, type ReactNode } from 'react'
import type { Book } from '../types/book'
import { formatPrice, getPriceInfo } from '../utils/price'
import BookThumbnail from './BookThumbnail'
import Button from './Button'
import ChevronIcon from './icons/ChevronIcon'
import Text from './Text'

type BookListItemProps = {
  book: Book
  likeButton?: ReactNode
}

/** 결과 리스트 아이템 — 접힘/펼침 아코디언 (PRD 2.2) */
function BookListItem({ book, likeButton }: BookListItemProps) {
  const [expanded, setExpanded] = useState(false)
  const { price, salePrice } = getPriceInfo(book)
  const author = book.authors.join(', ')

  const purchase = (
    <Button className="max-md:flex-1" onClick={() => window.open(book.url, '_blank', 'noopener')}>
      구매하기
    </Button>
  )
  const toggle = (
    <Button variant="gray" className="max-md:flex-1" onClick={() => setExpanded((prev) => !prev)}>
      상세보기
      <ChevronIcon direction={expanded ? 'up' : 'down'} className="size-4" />
    </Button>
  )

  if (!expanded) {
    return (
      <li className="border-b-gray flex items-center gap-8 border-b px-4 py-4 max-md:flex-wrap max-md:gap-4">
        <BookThumbnail
          src={book.thumbnail}
          title={book.title}
          className="h-17 w-12"
          overlay={likeButton}
        />
        <div className="flex min-w-0 grow items-center gap-4 max-md:flex-col max-md:items-start max-md:gap-1">
          <Text variant="title3" as="h3" className="truncate max-md:max-w-full">
            {book.title}
          </Text>
          <Text variant="body2" color="secondary" className="shrink-0">
            {author}
          </Text>
        </div>
        <Text variant="title3" className="shrink-0">
          {formatPrice(salePrice ?? price)}
        </Text>
        <div className="flex shrink-0 gap-2 max-md:w-full">
          {purchase}
          {toggle}
        </div>
      </li>
    )
  }

  return (
    <li className="border-b-gray flex gap-8 border-b px-4 py-8 max-md:flex-col max-md:gap-6">
      <BookThumbnail
        src={book.thumbnail}
        title={book.title}
        className="h-70 w-[210px] max-md:self-center"
        overlay={likeButton}
      />
      <div className="flex min-w-0 grow flex-col pt-4 max-md:pt-0">
        <div className="flex items-center gap-4">
          <Text variant="title3" as="h3">
            {book.title}
          </Text>
          <Text variant="body2" color="secondary">
            {author}
          </Text>
        </div>
        <Text variant="body2Bold" as="h4" className="mt-4">
          책 소개
        </Text>
        <Text variant="small" as="p" className="mt-3 leading-4 whitespace-pre-line">
          {book.contents}
        </Text>
      </div>
      <div className="flex w-60 shrink-0 flex-col items-end justify-between max-md:w-full max-md:gap-6">
        <div className="flex w-full justify-end">{toggle}</div>
        <div className="flex w-full flex-col gap-6">
          <div className="flex flex-col items-end gap-2">
            {salePrice === undefined ? (
              <PriceRow label="원가">
                <Text variant="title3">{formatPrice(price)}</Text>
              </PriceRow>
            ) : (
              <>
                <PriceRow label="원가">
                  <Text variant="body1" className="font-light line-through">
                    {formatPrice(price)}
                  </Text>
                </PriceRow>
                <PriceRow label="할인가">
                  <Text variant="title3">{formatPrice(salePrice)}</Text>
                </PriceRow>
              </>
            )}
          </div>
          <Button className="w-full" onClick={() => window.open(book.url, '_blank', 'noopener')}>
            구매하기
          </Button>
        </div>
      </div>
    </li>
  )
}

function PriceRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <Text variant="small" color="subtitle">
        {label}
      </Text>
      {children}
    </div>
  )
}

export default BookListItem
