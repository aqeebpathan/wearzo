import { useQuery } from "@tanstack/react-query"

import { fetchProducts } from "../services/productApi"
import { ProductsResponse } from "../types/product.types"

const useProductsQuery = () => {
  const { data, isPending, isError, error } = useQuery<ProductsResponse>({
    queryKey: ["admin", "products"],
    queryFn: fetchProducts,
    staleTime: 10 * 60 * 1000,
    retry: false,
  })

  return {
    products: data?.data ?? [],
    isPending,
    isError,
    error,
  }
}

export default useProductsQuery
