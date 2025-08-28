import { useMutation } from "@tanstack/react-query"

import { handleApiError } from "@/shared/utils/handleApiError"
import { updateCheckoutPaymentStatus } from "../services/checkoutApi"

export const useUpdateCheckoutPaymentStatus = () => {
  const { mutate } = useMutation({
    mutationFn: updateCheckoutPaymentStatus,

    onError: handleApiError,
  })
  return { updatePaymentStatus: mutate }
}
