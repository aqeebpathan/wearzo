import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"

import { fetchProducts } from "../services/productsApi"
import { ProductsResponse } from "../types/products.types"

export const useProductsQuery = () => {
  const [searchParams] = useSearchParams()

  const params = Object.fromEntries(searchParams.entries())
  const {
    data: response,
    isPending,
    isError,
    error,
  } = useQuery<ProductsResponse>({
    queryKey: ["products", params],
    queryFn: () => fetchProducts(params),
    retry: false,
    staleTime: 1000 * 60 * 5,
  })

  return { products: response?.data ?? [], isPending, isError, error }
}
