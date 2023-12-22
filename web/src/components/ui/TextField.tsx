import { InputHTMLAttributes, forwardRef } from 'react'
import { FieldError } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  label: string
  formError?: FieldError
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, className, formError, ...rest }, ref) => {
    return (
      <label className="flex flex-col gap-1 text-sm font-semibold text-gray-500">
        {label}
        <input
          ref={ref}
          {...rest}
          className={twMerge(
            'text-md rounded border-2 px-2 py-1.5 outline-none transition-all hover:border-primary focus:border-accent',
            formError && 'border-red-500 hover:border-red-500 focus:border-red-500',
            className,
          )}
        />
        {formError && <p className="mt-1 px-1 text-xs text-red-500">{formError.message}</p>}
      </label>
    )
  },
)
