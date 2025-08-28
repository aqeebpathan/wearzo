import { useQuery } from "@tanstack/react-query"

import { fetchOrders } from "../services/accountApi"
import { OrdersResponse } from "../types/account.types"

export const useOrdersQuery = () => {
  const { data, isPending, isError, error } = useQuery<OrdersResponse>({
    queryKey: ["user", "orders"],
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
