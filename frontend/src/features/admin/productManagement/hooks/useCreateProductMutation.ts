import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query"

import { createProduct } from "../services/productApi"
import { handleApiError } from "@/shared/utils/handleApiError"
import { CreateProductDto, ProductResponse } from "../types/product.types"

export const useCreateProductMutation = () => {
  const { mutate, isPending, isError, error } = useMutation<
    ProductResponse,
    Error,
    CreateProductDto
  >({
    mutationFn: createProduct,
    onSuccess: (data) => {
      toast.success(data.message)
    },
    onError: handleApiError,
  })

  return { createProduct: mutate, isPending, isError, error }
}
