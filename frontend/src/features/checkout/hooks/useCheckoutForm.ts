import { useState } from "react"

import {
  Cart,
  PaymentStatus,
  PayPalResponse,
  ShippingAddress,
} from "../types/checkout.types.ts"
import { useCreateCheckout } from "./useCreateCheckout"
import { useFinalizeCheckout } from "./useFinalizeCheckout"
import { useUpdateCheckoutPaymentStatus } from "./useUpdateCheckoutPaymentStatus.ts"

export const useCheckoutForm = (cart: Cart | undefined) => {
  const { createCheckout } = useCreateCheckout()
  const { finalizeCheckout } = useFinalizeCheckout()
  const { updatePaymentStatus } = useUpdateCheckoutPaymentStatus()

  const [checkoutId, setCheckoutId] = useState<string | null>(null)

  const handleCreateCheckout = (address: ShippingAddress) => {
    if (!cart || cart.products.length === 0) return

    createCheckout(
      {
        checkoutItems: cart.products,
        shippingAddress: address,
        paymentMethod: "paypal",
        totalPrice: cart.totalPrice,
      },
      {
        onSuccess: ({ data }) => {
          if (!data) return
          setCheckoutId(data.checkoutId)
        },
      },
    )
  }

  const handlePaymentSuccess = async (paymentDetails: PayPalResponse) => {
    if (!checkoutId) return
    const status = mapPayPalStatusToPaymentStatus(paymentDetails.status)

    updatePaymentStatus(
      {
        checkoutId,
        paymentStatus: status,
        paymentDetails,
      },
      {
        onSuccess: () => finalizeCheckout(checkoutId),
      },
    )
  }

  return {
    checkoutId,
    handleCreateCheckout,
    handlePaymentSuccess,
  }
}

const paypalToPaymentStatusMap: Record<string, PaymentStatus> = {
  completed: "paid",
  pending: "pending",
  failed: "failed",
  refunded: "refunded",
}

const mapPayPalStatusToPaymentStatus = (
  paypalStatus?: unknown,
): PaymentStatus => {
  const normalized = String(paypalStatus ?? "").toLowerCase()
  return paypalToPaymentStatusMap[normalized] ?? "completed" // fallback
}
