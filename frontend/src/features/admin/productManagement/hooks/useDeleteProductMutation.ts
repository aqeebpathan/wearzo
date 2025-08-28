import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { ApiResponse } from "../types/product.types"
import { deleteProduct } from "../services/productApi"
import { handleApiError } from "@/shared/utils/handleApiError"

const useDeleteProductMutation = () => {
  const queryClient = useQueryClient()

  const {
    mutate: deleteProductMutate,
    isPending,
    isError,
    error,
  } = useMutation<ApiResponse<null>, Error, string>({
    mutationFn: deleteProduct,
    onSuccess: () => {
      toast.success("Product Deleted")
      queryClient.invalidateQueries({ queryKey: ["admin", "products"] })
    },
    onError: handleApiError,
  })

  return {
    deleteProduct: deleteProductMutate,
    isPending,
    isError,
    error,
  }
}

export default useDeleteProductMutation
