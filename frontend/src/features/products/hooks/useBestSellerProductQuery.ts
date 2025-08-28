import { useQuery } from "@tanstack/react-query"

import { ProductResponse } from "../types/products.types"
import { fetchBestSellerProduct } from "../services/productsApi"

export const useBestSellerProductQuery = () => {
  const {
    data: response,
    isPending,
    isError,
    error,
  } = useQuery<ProductResponse>({
    queryKey: ["bestSellerProduct"],
    queryFn: fetchBestSellerProduct,
    staleTime: 1000 * 60 * 10,
  })

  return { bestSellerProduct: response?.data, isPending, isError, error }
}
