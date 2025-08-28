import { httpClient } from "@/shared/api/httpClient"
import {
  CreateCheckoutDto,
  CheckoutResponse,
  PaymentStatusUpdateDto,
} from "../types/checkout.types"

export const createCheckout = async (
  checkoutData: CreateCheckoutDto,
): Promise<CheckoutResponse> => {
  const { data } = await httpClient.post<CheckoutResponse>(
    "/checkout",
    checkoutData,
  )
  return data
}

export const updateCheckoutPaymentStatus = async (
  payload: PaymentStatusUpdateDto,
): Promise<CheckoutResponse> => {
  const { checkoutId, ...body } = payload
  const { data } = await httpClient.put<CheckoutResponse>(
    `/checkout/${checkoutId}/payment`,
    body,
  )
  return data
}

export const finalizeOrder = async (
  checkoutId: string,
): Promise<CheckoutResponse> => {
  const { data } = await httpClient.put<CheckoutResponse>(
    `/checkout/${checkoutId}/finalize`,
  )
  return data
}
