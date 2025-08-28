import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { updateUserRole } from "../services/userApi"
import { userQueryKeys } from "../constants/userQueryKeys"
import { handleApiError } from "@/shared/utils/handleApiError"
import { UpdateUserRoleDto, UpdateUserResponse } from "../types/user.types"

export const useUpdateUserRoleMutation = () => {
  const queryClient = useQueryClient()
  const { mutate, isPending, isError, error } = useMutation<
    UpdateUserResponse,
    Error,
    UpdateUserRoleDto
  >({
    mutationFn: updateUserRole,
    onSuccess: (data) => {
      toast.success(data.message)
      queryClient.invalidateQueries({ queryKey: userQueryKeys.list() })
    },
    onError: handleApiError,
  })

  return {
    updateUserRole: mutate,
    isPending,
    isError,
    error,
  }
}
