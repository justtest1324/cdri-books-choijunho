import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import DetailSearchPopover from './DetailSearchPopover'

const onSearch = vi.fn()

function openPopover() {
  render(<DetailSearchPopover onSearch={onSearch} />)
  return userEvent.click(screen.getByRole('button', { name: '상세검색' }))
}

beforeEach(() => {
  onSearch.mockReset()
})

describe('DetailSearchPopover (F-3)', () => {
  it('상세검색 버튼을 누르면 팝오버가 열린다', async () => {
    await openPopover()
    expect(screen.getByRole('textbox', { name: '상세검색어' })).toBeDefined()
  })

  it('바깥(백드롭)을 클릭하면 닫힌다', async () => {
    await openPopover()
    await userEvent.click(screen.getByTestId('popover-backdrop'))
    expect(screen.queryByRole('textbox', { name: '상세검색어' })).toBeNull()
  })

  it('Esc를 누르면 닫힌다', async () => {
    await openPopover()
    await userEvent.keyboard('{Escape}')
    expect(screen.queryByRole('textbox', { name: '상세검색어' })).toBeNull()
  })

  it('검색하기를 누르면 조건과 검색어로 검색하고 닫힌다', async () => {
    await openPopover()
    await userEvent.type(screen.getByRole('textbox', { name: '상세검색어' }), '하루키')
    await userEvent.click(screen.getByRole('button', { name: '검색하기' }))
    expect(onSearch).toHaveBeenCalledExactlyOnceWith('하루키', 'title')
    expect(screen.queryByRole('textbox', { name: '상세검색어' })).toBeNull()
  })

  it('닫았다 다시 열면 조건이 초기화되어 있다 (F-4)', async () => {
    await openPopover()
    await userEvent.type(screen.getByRole('textbox', { name: '상세검색어' }), '하루키')
    await userEvent.click(screen.getByTestId('popover-backdrop'))
    await userEvent.click(screen.getByRole('button', { name: '상세검색' }))
    expect(screen.getByRole('textbox', { name: '상세검색어' })).toHaveProperty('value', '')
  })
})
