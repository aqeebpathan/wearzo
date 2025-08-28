import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"

import { verifyUserEmail } from "../services/authApi"
import { handleApiError } from "@/shared/utils/handleApiError"

export const useVerifyEmailMutation = () => {
  const navigate = useNavigate()

  const {
    mutate: verifyEmail,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: verifyUserEmail,
    onSuccess: (data) => {
      toast.success(data.message || "Email verified successfully")
      navigate("/")
    },
    onError: handleApiError,
  })

  return {
    verifyEmail,
    isPending,
    isSuccess,
    isError,
    error,
  }
}
