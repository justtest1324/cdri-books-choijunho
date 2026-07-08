import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import SearchBar from './SearchBar'

const onSearch = vi.fn()
const onRemoveHistory = vi.fn()

function renderSearchBar(history: string[] = []) {
  render(<SearchBar history={history} onSearch={onSearch} onRemoveHistory={onRemoveHistory} />)
  return screen.getByRole('textbox', { name: '도서 검색' })
}

beforeEach(() => {
  onSearch.mockReset()
  onRemoveHistory.mockReset()
})

describe('검색 실행 (F-1)', () => {
  it('검색어 입력 후 Enter로 검색한다 (앞뒤 공백 제거)', async () => {
    const input = renderSearchBar()
    await userEvent.type(input, '  하루키  {Enter}')
    expect(onSearch).toHaveBeenCalledExactlyOnceWith('하루키')
  })

  it('공백만 입력하면 검색하지 않는다 (결정 9)', async () => {
    const input = renderSearchBar()
    await userEvent.type(input, '   {Enter}')
    expect(onSearch).not.toHaveBeenCalled()
  })
})

describe('검색 기록 드롭다운 (F-2, 결정 4)', () => {
  it('포커스하면 기록이 보이고, 타이핑을 시작하면 숨는다', async () => {
    const input = renderSearchBar(['노르웨이의 숲'])

    expect(screen.queryByRole('listbox')).toBeNull()
    await userEvent.click(input)
    expect(screen.getByRole('listbox', { name: '검색 기록' })).toBeDefined()

    await userEvent.keyboard('하')
    expect(screen.queryByRole('listbox')).toBeNull()
  })

  it('기록이 없으면 포커스해도 드롭다운이 없다', async () => {
    const input = renderSearchBar([])
    await userEvent.click(input)
    expect(screen.queryByRole('listbox')).toBeNull()
  })

  it('기록 항목을 클릭하면 해당 검색어로 재검색한다', async () => {
    const input = renderSearchBar(['노르웨이의 숲', '1Q84'])
    await userEvent.click(input)
    await userEvent.click(screen.getByRole('button', { name: '1Q84' }))
    expect(onSearch).toHaveBeenCalledExactlyOnceWith('1Q84')
  })

  it('X 버튼으로 기록을 개별 삭제한다 (검색은 실행되지 않음)', async () => {
    const input = renderSearchBar(['노르웨이의 숲'])
    await userEvent.click(input)
    await userEvent.click(screen.getByRole('button', { name: '검색 기록에서 노르웨이의 숲 삭제' }))
    expect(onRemoveHistory).toHaveBeenCalledExactlyOnceWith('노르웨이의 숲')
    expect(onSearch).not.toHaveBeenCalled()
  })

  it('키보드 ↓로 항목을 고르고 Enter로 검색한다', async () => {
    const input = renderSearchBar(['첫번째', '두번째'])
    await userEvent.click(input)
    await userEvent.keyboard('{ArrowDown}{ArrowDown}{Enter}')
    expect(onSearch).toHaveBeenCalledExactlyOnceWith('두번째')
  })
})

describe('회귀: 기록 삭제 후 키보드 상태', () => {
  it('탐색 중 기록이 줄어 activeIndex가 범위를 벗어나도 Enter가 크래시하지 않는다', async () => {
    const { rerender } = render(
      <SearchBar
        history={['첫번째', '두번째']}
        onSearch={onSearch}
        onRemoveHistory={onRemoveHistory}
      />,
    )
    await userEvent.click(screen.getByRole('textbox', { name: '도서 검색' }))
    await userEvent.keyboard('{ArrowDown}{ArrowDown}')
    rerender(
      <SearchBar history={['첫번째']} onSearch={onSearch} onRemoveHistory={onRemoveHistory} />,
    )
    await userEvent.keyboard('{Enter}')
    expect(onSearch).not.toHaveBeenCalled()
  })
})
