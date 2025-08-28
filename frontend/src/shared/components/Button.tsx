import { twMerge } from "tailwind-merge"
import { ButtonHTMLAttributes } from "react"

type ButtonProps = {
  children: React.ReactNode
  className?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({
  children,
  className,
  type = "submit",
  ...rest
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={twMerge(
        "w-full cursor-pointer bg-[#101010] px-3 py-2.5 text-white transition-colors hover:bg-[#101010]/80",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
