import { useQuery } from "@tanstack/react-query"

import { ProductsResponse } from "../types/products.types"
import { fetchNewArrivalProducts } from "../services/productsApi"

export const useNewArrivalProductsQuery = () => {
  const {
    data: response,
    isPending: isFetching,
    error,
  } = useQuery<ProductsResponse>({
    queryKey: ["newArrivalsProduct"],
    queryFn: fetchNewArrivalProducts,
    staleTime: 1000 * 60 * 10,
  })

  return { newArrivalProducts: response?.data ?? [], isFetching, error }
}
