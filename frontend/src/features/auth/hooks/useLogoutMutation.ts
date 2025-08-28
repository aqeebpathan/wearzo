import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { clearUser } from "../authSlice"
import { AppDispatch } from "@/app/store"
import { logoutUser } from "../services/authApi"
import { authQueryKeys } from "../constants/authQueryKeys"
import { handleApiError } from "@/shared/utils/handleApiError"

export const useLogoutMutation = (redirectPath = "/login") => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      dispatch(clearUser())

      queryClient.removeQueries({ queryKey: authQueryKeys.status() })

      navigate(redirectPath)
    },
    onError: handleApiError,
  })

  return { logout, isPending }
}
