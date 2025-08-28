import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query"

import { updateProduct } from "../services/productApi"
import { handleApiError } from "@/shared/utils/handleApiError"
import { UpdateProductDto, ProductResponse } from "../types/product.types"

const useUpdateProductMutation = () => {
  const { mutate, isPending, isError, isSuccess, error } = useMutation<
    ProductResponse,
    Error,
    UpdateProductDto
  >({
    mutationFn: updateProduct,
    onSuccess: (data) => {
      toast.success(data?.message)
    },
    onError: handleApiError,
  })

  return { updateProduct: mutate, isPending, isError, isSuccess, error }
}

export default useUpdateProductMutation
