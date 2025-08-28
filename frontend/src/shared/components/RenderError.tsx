import { FC } from "react"
import { isAxiosError } from "axios"

interface RenderErrorProps {
  error: unknown
  fallbackMessage?: string
  className?: string
}

const RenderError: FC<RenderErrorProps> = ({
  error,
  fallbackMessage = "Something went wrong. Please try again later.",
  className = "py-4 text-center text-red-600",
}) => {
  let message = fallbackMessage

  if (isAxiosError(error)) {
    const apiMessage = error.response?.data?.message
    if (typeof apiMessage === "string") {
      message = apiMessage
    }
  }

  if (import.meta.env.DEV) {
    console.error("Caught error:", error)
  }

  return (
    <div role="alert" className={className}>
      <span>{message}</span>
    </div>
  )
}

export default RenderError
