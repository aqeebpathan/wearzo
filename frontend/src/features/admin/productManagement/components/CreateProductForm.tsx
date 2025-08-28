import ProductForm from "./ProductForm"
import { CreateProductDto } from "../types/product.types"
import { ProductFormOutput } from "../schemas/createProduct.schema"
import { useCreateProductMutation } from "../hooks/useCreateProductMutation"

const transformFormData = (data: ProductFormOutput): CreateProductDto => ({
  ...data,
  sizes: data.sizes.split(",").map((s) => s.trim()),
  colors: data.colors.split(",").map((c) => c.trim()),
  tags: data.tags.split(",").map((t) => t.trim()),
  images: [],
})

const CreateProductForm = () => {
  const { createProduct, isPending } = useCreateProductMutation()

  const handleCreate = (data: ProductFormOutput) => {
    const payload = transformFormData(data)
    createProduct(payload)
  }

  return (
    <ProductForm
      onSubmit={handleCreate}
      submitButtonLabel="Create Product"
      loading={isPending}
    />
  )
}

export default CreateProductForm
