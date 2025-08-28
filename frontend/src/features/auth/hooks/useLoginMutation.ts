import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { setUser } from "../authSlice"
import { AppDispatch } from "@/app/store"
import { loginUser } from "../services/authApi"
import { authQueryKeys } from "../constants/authQueryKeys"
import { handleApiError } from "@/shared/utils/handleApiError"

export const useLoginMutation = (redirectPath: string) => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { mutate: login, isPending: isLoggingIn } = useMutation({
    mutationFn: loginUser,
    onSuccess: (response) => {
      dispatch(setUser(response.data))
      queryClient.setQueryData(authQueryKeys.status(), response)

      navigate(`/${redirectPath}`)
    },
    onError: handleApiError,
  })

  return { login, isLoggingIn }
}

// export const useLoginMutation = (redirectPath = "/") => {
//   const dispatch = useDispatch<AppDispatch>()
//   const navigate = useNavigate()
//   const queryClient = useQueryClient()

//   const { mutate: login, isPending: isLoggingIn } = useMutation({
//     mutationFn: loginUser,
//     onSuccess: async (response) => {
//       const user = response.data

//       // Set user in Redux
//       dispatch(setUser(user))

//       // Update React Query cache for auth status
//       queryClient.setQueryData(authQueryKeys.status(), response)

//       // Navigate to redirect path
//       navigate(redirectPath)

//       // Merge guest cart if needed
//       const guestId = localStorage.getItem("guestId")

//       if (guestId) {
//         try {
//           const cartResponse = await mergeCart(guestId)
//           localStorage.removeItem("guestId")

//           queryClient.invalidateQueries({
//             queryKey: cartQueryKeys.detail(cartResponse.data._id),
//           })
//         } catch (error) {
//           console.error("Error merging cart:", error)
//         }
//       }
//     },
//     onError: handleApiError,
//   })

//   return { login, isLoggingIn }
// }
