import { describe, expect, it } from 'vitest'
import { formatPrice, getPriceInfo } from './price'

describe('formatPrice', () => {
  it('천 단위 콤마와 원 단위를 붙인다', () => {
    expect(formatPrice(13300)).toBe('13,300원')
    expect(formatPrice(0)).toBe('0원')
  })
})

describe('getPriceInfo', () => {
  it('할인가가 정가보다 낮으면 둘 다 반환한다', () => {
    expect(getPriceInfo({ price: 16000, sale_price: 13500 })).toEqual({
      price: 16000,
      salePrice: 13500,
    })
  })

  it('할인가가 -1(없음)이면 정가만 반환한다 (PRD 결정 9)', () => {
    expect(getPriceInfo({ price: 13300, sale_price: -1 })).toEqual({ price: 13300 })
  })

  it('할인가가 정가와 같거나 크면 정가만 반환한다', () => {
    expect(getPriceInfo({ price: 10000, sale_price: 10000 })).toEqual({ price: 10000 })
    expect(getPriceInfo({ price: 10000, sale_price: 12000 })).toEqual({ price: 10000 })
  })
})
