import ProductForm from "./ProductForm"
import {
  ProductFormInput,
  ProductFormOutput,
} from "../schemas/createProduct.schema"
import { Product } from "../types/product.types"
import useUpdateProductMutation from "../hooks/useUpdateProductMutation"

const transformFormData = (data: ProductFormOutput) => ({
  ...data,
  sizes: data.sizes.split(",").map((s) => s.trim()),
  colors: data.colors.split(",").map((c) => c.trim()),
  tags: data.tags.split(",").map((t) => t.trim()),
})

const mapProductToFormData = (product: Product): ProductFormInput => ({
  ...product,
  sizes: (product.sizes ?? []).join(", "),
  colors: (product.colors ?? []).join(", "),
  tags: (product.tags ?? []).join(", "),
  isFeatured: product.isFeatured ? "true" : "false",
  isPublished: product.isPublished ? "true" : "false",
  gender: product.gender as "men" | "women" | "unisex",
  productImages: [],
})

const UpdateProductForm = ({ product }: { product: Product }) => {
  const { updateProduct, isPending } = useUpdateProductMutation()

  const handleUpdate = (data: ProductFormOutput) => {
    updateProduct({ _id: product._id, ...transformFormData(data) })
  }

  return (
    <ProductForm
      initialValues={mapProductToFormData(product)}
      onSubmit={handleUpdate}
      submitButtonLabel="Update Product"
      loading={isPending}
    />
  )
}

export default UpdateProductForm
