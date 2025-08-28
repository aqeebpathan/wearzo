import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { setUser } from "../authSlice"
import { AppDispatch } from "@/app/store"
import { signupUser } from "../services/authApi"
import { authQueryKeys } from "../constants/authQueryKeys"
import { handleApiError } from "@/shared/utils/handleApiError"

export const useSignupMutation = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const dispatch = useDispatch<AppDispatch>()

  const { mutate: signup, isPending: isSigningUp } = useMutation({
    mutationFn: signupUser,
    onSuccess: (response) => {
      const user = response.data

      // Store user in Redux
      dispatch(setUser(user))

      // Prime auth status cache
      queryClient.setQueryData(authQueryKeys.status(), response)

      // Redirect to verify page
      navigate("/verify-email")
    },
    onError: handleApiError,
  })

  return { signup, isSigningUp }
}
