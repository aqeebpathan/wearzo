import { useQuery } from "@tanstack/react-query"

import { ProductResponse } from "../types/products.types"
import { fetchProductById } from "../services/productsApi"

export const useProductQuery = (id: string) => {
  const {
    data: response,
    isPending,
    isError,
    error,
  } = useQuery<ProductResponse>({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
    retry: false,
    staleTime: 1000 * 60 * 5,
  })

  return { product: response?.data, isPending, isError, error }
}
