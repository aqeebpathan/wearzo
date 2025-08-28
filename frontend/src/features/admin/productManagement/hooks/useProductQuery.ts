import { useQuery } from "@tanstack/react-query"

import { fetchProductById } from "../services/productApi"
import { ProductResponse } from "../types/product.types"

const useProductQuery = (id: string) => {
  const { data, isPending, isError, error } = useQuery<ProductResponse>({
    queryKey: ["admin", "product", id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
    retry: false,
  })

  return {
    product: data?.data,
    isPending,
    isError,
    error,
  }
}

export default useProductQuery
