// ----- Value Objects -----
export type PaymentMethod = "paypal" | "stripe" | "credit_card" | "cod"
export type PaymentStatus = "pending" | "paid" | "failed" | "refunded"

// ----- Entities -----
export interface CheckoutItem {
  productId: string
  name: string
  image: string
  price: number
  quantity: number
  color: string
  size: string
}

export interface ShippingAddress {
  firstName: string
  lastName: string
  address: string
  city: string
  postalCode: string
  country: string
  phone: string
}

export interface Checkout {
  checkoutId: string
  items: CheckoutItem[]
  shippingAddress: ShippingAddress
  paymentMethod: PaymentMethod
  paymentStatus: PaymentStatus
  totalPrice: number
  createdAt: string
  updatedAt: string
}

// ----- Generic API Wrapper -----
export interface ApiResponse<T> {
  status: boolean
  message: string
  data?: T
}

// ----- Responses -----
export type CheckoutResponse = ApiResponse<Checkout>
export type CheckoutsResponse = ApiResponse<Checkout[]>

// ----- DTOs -----
export interface CreateCheckoutDto {
  checkoutItems: CheckoutItem[]
  shippingAddress: ShippingAddress
  paymentMethod: PaymentMethod
  totalPrice: number
}

export interface PaymentStatusUpdateDto {
  checkoutId: string
  paymentStatus: PaymentStatus
  paymentDetails: Record<string, unknown>
}

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

export type PayPalResponse = Record<string, unknown>
