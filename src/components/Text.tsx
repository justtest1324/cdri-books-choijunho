import type { ElementType, ReactNode } from 'react'

type TextVariant =
  'title1' | 'title2' | 'title3' | 'body1' | 'body2' | 'body2Bold' | 'caption' | 'small'

type TextColor = 'primary' | 'secondary' | 'subtitle' | 'white' | 'black' | 'point'

const variantClass: Record<TextVariant, string> = {
  title1: 'text-title1',
  title2: 'text-title2',
  title3: 'text-title3',
  body1: 'text-body1',
  body2: 'text-body2',
  body2Bold: 'text-body2 font-bold',
  caption: 'text-caption',
  small: 'text-small',
}

const colorClass: Record<TextColor, string> = {
  primary: 'text-text-primary',
  secondary: 'text-text-secondary',
  subtitle: 'text-text-subtitle',
  white: 'text-white',
  black: 'text-black',
  point: 'text-primary',
}

type TextProps = {
  variant: TextVariant
  color?: TextColor
  as?: ElementType
  className?: string
  children: ReactNode
}

function Text({
  variant,
  color = 'primary',
  as: Tag = 'span',
  className = '',
  children,
}: TextProps) {
  return (
    <Tag className={`${variantClass[variant]} ${colorClass[color]} ${className}`}>{children}</Tag>
  )
}

export default Text
