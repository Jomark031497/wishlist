import { InputHTMLAttributes, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  label: string
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(({ label, className, ...rest }, ref) => {
  return (
    <label className="flex flex-col gap-1 text-sm font-semibold text-gray-500">
      {label}
      <input ref={ref} {...rest} className={twMerge('text-md rounded border-2 px-2 py-1.5 outline-none', className)} />
    </label>
  )
})
