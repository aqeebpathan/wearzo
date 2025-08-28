import { useEffect } from "react"
import { useQueryClient } from "@tanstack/react-query"

import { useAppSelector } from "@/app/hooks"
import { mergeCart } from "@/features/cart/services/cartApi"
import { cartQueryKeys } from "@/features/cart/constants/cartQueryKeys"

export const useSyncCartOnLogin = () => {
  const user = useAppSelector((state) => state.auth.user)
  const queryClient = useQueryClient()

  useEffect(() => {
    const guestId = localStorage.getItem("guestId")

    if (user && guestId) {
      mergeCart(guestId)
        .then((cartResponse) => {
          localStorage.removeItem("guestId")
          queryClient.invalidateQueries({
            queryKey: cartQueryKeys.detail(cartResponse.data._id),
          })
        })
        .catch((error) => {
          console.error("Error merging cart:", error)
        })
    }
  }, [user, queryClient])
}
