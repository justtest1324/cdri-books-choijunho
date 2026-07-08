import Text from './Text'

type ResultCountProps = {
  label: string
  count: number
}

/** "도서 검색 결과 총 N건" — 숫자만 primary 강조 */
function ResultCount({ label, count }: ResultCountProps) {
  return (
    <Text variant="caption" as="p">
      {label} 총{' '}
      <Text variant="caption" color="point">
        {count.toLocaleString()}
      </Text>
      건
    </Text>
  )
}

export default ResultCount
