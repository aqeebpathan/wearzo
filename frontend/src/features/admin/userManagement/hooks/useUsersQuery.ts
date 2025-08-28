import { useQuery } from "@tanstack/react-query"

import { fetchUsers } from "../services/userApi"
import { UsersResponse } from "../types/user.types"
import { userQueryKeys } from "../constants/userQueryKeys"

export const useUsersQuery = () => {
  const { data, isPending, isError, error } = useQuery<UsersResponse>({
    queryKey: userQueryKeys.list(),
    queryFn: fetchUsers,
    retry: false,
  })

  return {
    users: data?.data ?? [],
    isPending,
    isError,
    error,
  }
}
