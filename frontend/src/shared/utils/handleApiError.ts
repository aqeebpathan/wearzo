import axios from "axios"
import { toast } from "sonner"

export const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    console.log(error)
    const message = error.response?.data?.message || "Something went wrong!"
    toast.error(message)
  } else {
    toast.error("An error occurred. Please try again.")
  }
}
