import { useQueryClient } from "@tanstack/react-query"
import { fetchProductById } from "../services/productsApi"

export const usePrefetchProduct = () => {
  const queryClient = useQueryClient()

  const prefetchProduct = (id: string) => {
    queryClient.prefetchQuery({
      queryKey: ["product", id],
      queryFn: () => fetchProductById(id),
      staleTime: 1000 * 60 * 5,
    })
  }

  return { prefetchProduct }
}
