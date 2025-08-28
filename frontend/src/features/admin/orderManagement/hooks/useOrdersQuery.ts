import { useQuery } from "@tanstack/react-query"

import { fetchOrders } from "../services/orderApi"
import { OrdersResponse } from "../types/order.types"

export const useOrdersQuery = () => {
  const { data, isPending, isError, error } = useQuery<OrdersResponse>({
    queryKey: ["admin", "orders"],
    queryFn: fetchOrders,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: false,
  })

  return {
    orders: data?.data ?? [],
    isPending,
    isError,
    error,
  }
}
