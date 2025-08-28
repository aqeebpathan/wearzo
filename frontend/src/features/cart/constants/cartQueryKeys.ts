export const cartQueryKeys = {
  all: ["cart"] as const,

  // For listing a user's or guest's cart
  list: (userId?: string | null, guestId?: string | null) =>
    [...cartQueryKeys.all, { userId, guestId }] as const,

  // For a specific cart (by ID)
  detail: (cartId: string) => [...cartQueryKeys.all, "detail", cartId] as const,

  // For a specific cart product
  product: (cartId: string, productId: string) =>
    [...cartQueryKeys.detail(cartId), "product", productId] as const,
}
