import { useQuery } from "@tanstack/react-query"

import { ProductsResponse } from "../types/products.types"
import { fetchSimilarProducts } from "../services/productsApi"

export const useSimilarProductsQuery = (productId: string) => {
  const {
    data: response,
    isPending,
    isError,
    error,
  } = useQuery<ProductsResponse>({
    queryKey: ["similarProducts", productId],
    queryFn: () => fetchSimilarProducts(productId),
    enabled: !!productId,
    staleTime: 10 * 60 * 1000,
  })

  return { similarProducts: response?.data ?? [], isPending, isError, error }
}
