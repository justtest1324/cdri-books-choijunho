type PriceFields = {
  price: number
  sale_price: number
}

export type PriceInfo = {
  price: number
  salePrice?: number
}

/** 원화 표기 — 13,300원 */
export function formatPrice(value: number): string {
  return `${value.toLocaleString('ko-KR')}원`
}

/** 가격 표기 규칙 (PRD 2.2·결정 9): 유효한 할인가가 있을 때만 salePrice 포함 */
export function getPriceInfo({ price, sale_price }: PriceFields): PriceInfo {
  const hasDiscount = sale_price > 0 && sale_price < price
  return hasDiscount ? { price, salePrice: sale_price } : { price }
}
