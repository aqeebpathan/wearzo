interface OrderUser {
  id: string
  username: string
  email: string
}

export interface Order {
  _id: string
  user: OrderUser
  orderItems: OrderItem[]
  shippingAddress: ShippingAddress
  paymentMethod: string
  totalPrice: number
  isPaid: boolean
  paidAt: string | null
  isDelivered: boolean
  paymentStatus: string
  status: string
}

export interface OrderItem {
  productId: string
  name: string
  image: string
  price: number
  quantity: number
}

export interface ShippingAddress {
  address: string
  city: string
  postalCode: string
  country: string
}

export interface ApiResponse<T> {
  status: boolean
  message: string
  data: T
}

export type OrderResponse = ApiResponse<Order>
export type OrdersResponse = ApiResponse<Order[]>

export interface UpdateOrderStatusDto {
  orderId: string
  status: string
}
