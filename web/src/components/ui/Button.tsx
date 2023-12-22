import { type ButtonHTMLAttributes, type ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  className?: string
  isLoading?: boolean
}

export const Button = ({ children, className, isLoading, ...rest }: Props) => {
  return (
    <button
      {...rest}
      disabled={isLoading}
      className={twMerge(
        'rounded bg-primary px-4 py-2 text-sm font-bold text-white shadow transition-all hover:bg-primary/90',
        className,
      )}
    >
      {children}
    </button>
  )
}
