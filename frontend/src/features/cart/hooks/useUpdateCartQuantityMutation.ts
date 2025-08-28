import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useAppSelector } from "@/app/hooks"
import { UpdateCartItemDto } from "../types/cart.types"
import { updateCartQuantity } from "../services/cartApi"
import { cartQueryKeys } from "../constants/cartQueryKeys"

export const useUpdateCartQuantityMutation = () => {
  const user = useAppSelector((state) => state.auth.user)
  const guestId = localStorage.getItem("guestId") ?? ""
  const userId = user?._id ?? null

  const queryClient = useQueryClient()

  const {
    mutate: updateQuantity,
    isPending: isUpdating,
    error,
  } = useMutation({
    mutationFn: (cartItem: UpdateCartItemDto) =>
      updateCartQuantity({ ...cartItem, userId: user?._id, guestId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: cartQueryKeys.list(userId, guestId),
      })
    },
  })

  return { updateQuantity, isUpdating, error }
}
