import { httpClient } from "@/shared/api/httpClient"
import {
  ApiResponse,
  OrderResponse,
  OrdersResponse,
  UpdateOrderStatusDto,
} from "../types/order.types"

// Fetch all orders
export const fetchOrders = async (): Promise<OrdersResponse> => {
  const { data } = await httpClient.get<OrdersResponse>("/admin/orders")
  return data
}

// Update order status
export const updateOrderStatus = async ({
  orderId,
  status,
}: UpdateOrderStatusDto): Promise<OrderResponse> => {
  const { data } = await httpClient.patch<OrderResponse>(
    `/admin/orders/${orderId}/status`,
    {
      status: status,
    },
  )
  return data
}

// Delete order by ID
export const deleteOrder = async (
  orderId: string,
): Promise<ApiResponse<null>> => {
  const { data } = await httpClient.delete<ApiResponse<null>>(
    `/admin/orders/${orderId}`,
  )
  return data
}
