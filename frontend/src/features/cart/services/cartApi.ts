import { httpClient } from "@/shared/api/httpClient"
import {
  CartResponse,
  AddCartItemDto,
  UpdateCartItemDto,
  RemoveCartItemDto,
} from "../types/cart.types"

// Fetch cart
export const fetchCart = async (
  userId?: string | null,
  guestId?: string,
): Promise<CartResponse> => {
  const params = new URLSearchParams()
  if (userId) params.append("userId", userId)
  if (guestId) params.append("guestId", guestId)

  const { data } = await httpClient.get(`/cart?${params.toString()}`)
  return data
}

// Add product to cart
export const addProductToCart = async (
  cartItem: AddCartItemDto,
): Promise<CartResponse> => {
  const { data } = await httpClient.post("/cart", cartItem)
  return data
}

// Update product quantity
export const updateCartQuantity = async (
  cartItem: UpdateCartItemDto,
): Promise<CartResponse> => {
  const { data } = await httpClient.put("/cart", cartItem)
  return data
}

// Remove product from cart
export const removeProductFromCart = async (
  cartItem: RemoveCartItemDto,
): Promise<CartResponse> => {
  const { data } = await httpClient.delete("/cart", { data: cartItem })
  return data
}

export const mergeCart = async (guestId: string) => {
  const { data } = await httpClient.post("/cart/merge", { guestId })
  return data
}
