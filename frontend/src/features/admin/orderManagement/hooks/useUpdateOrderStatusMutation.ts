import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query"

import { updateOrderStatus } from "../services/orderApi"
import { handleApiError } from "@/shared/utils/handleApiError"
import { OrderResponse, UpdateOrderStatusDto } from "../types/order.types"

export const useUpdateOrderStatusMutation = () => {
  const { mutate, isPending, isError, error } = useMutation<
    OrderResponse,
    Error,
    UpdateOrderStatusDto
  >({
    mutationFn: updateOrderStatus,
    onSuccess: (data) => {
      toast.success(data.message)
    },
    onError: handleApiError,
  })

  return { updateOrderStatus: mutate, isPending, isError, error }
}
