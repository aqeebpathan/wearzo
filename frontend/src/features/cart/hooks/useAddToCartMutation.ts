import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useAppSelector } from "@/app/hooks"
import { addProductToCart } from "../services/cartApi"
import { getOrCreateGuestId } from "@/shared/utils/guest"
import { cartQueryKeys } from "../constants/cartQueryKeys"
import { AddCartItemDto, CartResponse } from "../types/cart.types"

export const useAddToCartMutation = () => {
  const user = useAppSelector((state) => state.auth.user)
  const userId = user?._id ?? null
  const guestId = user ? null : getOrCreateGuestId()
  const queryClient = useQueryClient()

  const {
    mutate: addToCart,
    isPending: isAdding,
    error,
  } = useMutation<CartResponse, Error, AddCartItemDto>({
    mutationFn: (cartItem) =>
      addProductToCart({ ...cartItem, userId, guestId: guestId! }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: cartQueryKeys.list(userId, guestId),
      })
    },
  })

  return { addToCart, isAdding, error }
}

// import { useMutation, useQueryClient } from "@tanstack/react-query"

// import { CartItemDto } from "../types/cart.types"
// import { useAppSelector } from "@/app/hooks"
// import { getOrCreateGuestId } from "@/shared/utils/guest"
// import { addProductToCart } from "../services/cartApi"

// export const useAddToCartMutation = () => {
//   const user = useAppSelector((state) => state.auth.user)
//   const guestId = user ? null : getOrCreateGuestId()
//   const userId = user?._id ?? ""

//   const queryClient = useQueryClient()

//   const {
//     mutate: addToCart,
//     isPending: isAdding,
//     error,
//   } = useMutation({
//     mutationFn: (cartItem: CartItemDto) =>
//       addProductToCart({ cartItem, userId, guestId: guestId! }),
//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: ["cart", userId, guestId],
//       })
//     },
//   })

//   return { addToCart, isAdding, error }
// }
