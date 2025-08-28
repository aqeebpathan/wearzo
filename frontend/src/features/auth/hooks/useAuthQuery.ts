import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"

import { clearUser, setUser } from "../authSlice"
import { checkAuthStatus } from "../services/authApi"
import { authQueryKeys } from "../constants/authQueryKeys"
import { useAppDispatch, useAppSelector } from "@/app/hooks"

export const useAuthQuery = () => {
  const dispatch = useAppDispatch()
  const { user, isAuthenticated } = useAppSelector((state) => state.auth)

  const { data, error, isFetched } = useQuery({
    queryKey: authQueryKeys.status(),
    queryFn: checkAuthStatus,
    retry: false,
    staleTime: 10 * 60 * 1000, // 10 min
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (isFetched) {
      if (data?.data) {
        dispatch(setUser(data.data))
      } else {
        dispatch(clearUser())
      }
    }
  }, [isFetched, data, dispatch])

  return { user, isAuthenticated, error }
}
