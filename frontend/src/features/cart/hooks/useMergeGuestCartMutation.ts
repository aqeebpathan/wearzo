import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useAppSelector } from "@/app/hooks"
import { mergeCart as mergeGuestCart } from "../services/cartApi"

export const useMergeGuestCartMutation = () => {
  const queryClient = useQueryClient()
  const guestId = localStorage.getItem("guestId")
  const user = useAppSelector((state) => state.auth.user)

  const {
    data: mergeCart,
    isPending: isMerging,
    error,
  } = useMutation({
    mutationFn: () => mergeGuestCart(guestId!),
    onSuccess: () => {
      localStorage.removeItem("guestId")
      queryClient.invalidateQueries({
        queryKey: ["cart", user?._id ?? null, guestId],
      })
    },
  })

  return { mergeCart, isMerging, error }
}
