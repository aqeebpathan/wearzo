import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useAppSelector } from "@/app/hooks"
import { cartQueryKeys } from "../constants/cartQueryKeys"
import { removeProductFromCart } from "../services/cartApi"
import { CartResponse, RemoveCartItemDto } from "../types/cart.types"

export const useRemoveFromCartMutation = () => {
  const user = useAppSelector((state) => state.auth.user)
  const guestId = localStorage.getItem("guestId") ?? ""
  const userId = user?._id ?? null
  const queryClient = useQueryClient()

  const {
    mutate: removeItem,
    isPending: isRemoving,
    error,
  } = useMutation<CartResponse, Error, RemoveCartItemDto>({
    mutationFn: (cartItem) =>
      removeProductFromCart({ ...cartItem, userId, guestId: guestId! }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: cartQueryKeys.list(userId, guestId),
      })
    },
  })

  return { removeItem, isRemoving, error }
}

// import { useMutation, useQueryClient } from "@tanstack/react-query"
// import { removeProductFromCart } from "../services/cartApi"
// import { CartItemToRemove } from "../types/cart.types"
// import { useAppSelector } from "@/app/hooks"

// export const useRemoveFormCart = () => {
//   const user = useAppSelector((state) => state.auth.user)
//   const guestId = localStorage.getItem("guestId") ?? ""
//   const queryClient = useQueryClient()

//   const {
//     mutate: removeItem,
//     isPending: isRemoving,
//     error,
//   } = useMutation({
//     mutationFn: (cartItem: CartItemToRemove) =>
//       removeProductFromCart({ ...cartItem, userId: user?._id, guestId }),
//     onSuccess: (data) => {
//       console.log(data)
//       queryClient.invalidateQueries({
//         queryKey: ["cart", user?._id ?? null, guestId],
//       })
//     },
//   })

//   return { removeItem, isRemoving, error }
// }
