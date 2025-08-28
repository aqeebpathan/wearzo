// ----- Entities -----
export interface CartProduct {
  _id: string
  productId: string
  name: string
  image: string
  price: number
  quantity: number
  color: string
  size: string
  totalProductPrice: number
  createdAt: string
  updatedAt: string
}

export interface CartSummary {
  subtotal: number
  estimatedTax: number
  deliveryFee: number
  total: number
}

export interface Cart {
  _id: string
  userId?: string // if logged in
  guestId?: string // if guest
  products: CartProduct[]
  totalPrice: number
  summary: CartSummary
  createdAt: string
  updatedAt: string
  __v: number
}

// ----- Generic API wrapper (same as Product) -----
export interface ApiResponse<T> {
  status: boolean
  message: string
  data?: T
}

// ----- Specific Responses -----
export type CartResponse = ApiResponse<Cart>
export type CartsResponse = ApiResponse<Cart[]>

// ----- DTOs -----
export interface CartItemDto {
  productId: string
  quantity?: number
  size: string
  color: string
}

export type AddCartItemDto = CartItemDto & {
  userId?: string | null
  guestId?: string
}

export type UpdateCartItemDto = CartItemDto & {
  userId?: string | null
  guestId?: string
  quantityDelta: number
}

export type RemoveCartItemDto = CartItemDto & {
  userId?: string | null
  guestId?: string
}
