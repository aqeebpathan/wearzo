import { useMutation } from "@tanstack/react-query"

import { createCheckout } from "../services/checkoutApi"
import { CreateCheckoutDto, CheckoutResponse } from "../types/checkout.types"

export const useCreateCheckout = () => {
  const {
    mutate: createCheckoutMutate,
    isPending: isCreating,
    error,
  } = useMutation<CheckoutResponse, Error, CreateCheckoutDto>({
    mutationFn: createCheckout,
    onError: (err) => {
      console.error("Checkout failed:", err)
    },
  })

  return { createCheckout: createCheckoutMutate, isCreating, error }
}
