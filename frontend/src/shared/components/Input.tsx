import { twMerge } from "tailwind-merge"
import { FieldError } from "react-hook-form"
import { InputHTMLAttributes, forwardRef } from "react"

type InputProps = {
  id: string
  label?: string
  error?: FieldError
  className?: string
} & InputHTMLAttributes<HTMLInputElement>

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, className, error, ...rest }, ref) => {
    const errorId = error ? `${id}-error` : undefined

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="-ml-0.5 text-sm">
            {label}
          </label>
        )}

        <input
          id={id}
          ref={ref}
          className={twMerge(
            "mt-1 w-full px-3 py-2 font-medium ring-[1.5px] ring-neutral-400/60 transition-all outline-none placeholder:font-normal placeholder:text-neutral-400/80",
            error
              ? "ring-red-500 focus:ring-red-500"
              : "focus:ring-neutral-950",
            className,
          )}
          aria-describedby={errorId}
          aria-invalid={!!error}
          {...rest}
        />

        {error && (
          <p
            id={errorId}
            className="mt-1 text-[13px] text-red-500"
            aria-live="polite"
          >
            {error.message}
          </p>
        )}
      </div>
    )
  },
)

Input.displayName = "Input"

export default Input
