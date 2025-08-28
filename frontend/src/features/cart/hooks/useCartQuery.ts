import { useAppSelector } from "@/app/hooks"
import { useQuery } from "@tanstack/react-query"
import { fetchCart } from "../services/cartApi"
import { cartQueryKeys } from "../constants/cartQueryKeys"

export const useCartQuery = () => {
  const user = useAppSelector((state) => state.auth.user)
  const guestId = localStorage.getItem("guestId")

  const userId = user?._id ?? null

  const {
    data,
    isPending: isFetching,
    error,
  } = useQuery({
    queryKey: cartQueryKeys.list(userId, guestId),
    queryFn: () => fetchCart(userId, guestId!),
    staleTime: 0,
    retry: false,
    refetchOnWindowFocus: true,
  })

  return { cart: data?.data, isFetching, error }
}
