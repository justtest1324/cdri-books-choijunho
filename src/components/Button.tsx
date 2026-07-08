import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'gray'

const variantClass: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white',
  gray: 'bg-light-gray text-text-secondary',
}

type ButtonProps = {
  variant?: ButtonVariant
  className?: string
  children: ReactNode
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'>

function Button({ variant = 'primary', className = '', children, ...rest }: ButtonProps) {
  return (
    <button
      type="button"
      className={`text-caption inline-flex h-12 cursor-pointer items-center justify-center gap-1 rounded-lg px-5 ${variantClass[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
