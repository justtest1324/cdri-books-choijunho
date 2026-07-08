import BookIllustration from './icons/BookIllustration'
import Text from './Text'

type EmptyStateProps = {
  message: string
}

function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-6 py-20">
      <BookIllustration className="size-20" />
      <Text variant="caption" color="secondary">
        {message}
      </Text>
    </div>
  )
}

export default EmptyState
