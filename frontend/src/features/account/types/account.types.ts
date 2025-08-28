export interface Order {
  _id: string
  user: {
    id: string
    username: string
    email: string
  }
  orderItems: OrderItem[]
  shippingAddress: ShippingAddress
  paymentMethod: string
  totalPrice: number
  isPaid: boolean
  paidAt: string | null
  isDelivered: boolean
  estimatedArrival: string
  paymentStatus: string
  status: string
  createdAt: string
  deliveredAt: string
}

export interface OrderItem {
  productId: string
  name: string
  image: string
  price: number
  quantity: number
  color: string
  size: string
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

export type OrdersResponse = ApiResponse<Order[]>
