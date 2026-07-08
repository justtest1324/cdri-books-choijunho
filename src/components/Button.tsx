import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'gray'

const variantClass: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white',
  gray: 'bg-light-gray text-text-secondary',
}

const baseClass =
  'text-caption inline-flex h-12 cursor-pointer items-center justify-center gap-1 rounded-lg px-5'

type ButtonProps = {
  variant?: ButtonVariant
  className?: string
  /** 지정하면 버튼 모양의 링크(<a>)로 렌더 — 새 탭으로 연다 (구매하기 등 내비게이션 용도) */
  href?: string
  children: ReactNode
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'>

function Button({ variant = 'primary', className = '', href, children, ...rest }: ButtonProps) {
  const classes = `${baseClass} ${variantClass[variant]} ${className}`

  if (href !== undefined) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    )
  }
  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  )
}

export default Button
