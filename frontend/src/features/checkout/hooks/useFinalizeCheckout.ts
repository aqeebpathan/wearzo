import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"

import { finalizeOrder } from "../services/checkoutApi"
import { handleApiError } from "@/shared/utils/handleApiError"

export const useFinalizeCheckout = () => {
  const navigate = useNavigate()

  const { mutate, isPending, error } = useMutation({
    mutationFn: finalizeOrder,
    onSuccess: () => {
      navigate("success")
    },
    onError: handleApiError,
  })

  return { finalizeCheckout: mutate, isPending, error }
}
