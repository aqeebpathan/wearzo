import { useParams } from "react-router-dom"
import UpdateProductForm from "../components/UpdateProductForm"
import useProductQuery from "../hooks/useProductQuery"

const EditProductPage = () => {
  const { productId } = useParams()

  const { product, isPending } = useProductQuery(productId!)

  if (isPending) return <div>Loading...</div>
  if (!product) return <div>Product not found</div>
  return (
    <section>
      <h2 className="text-2xl font-medium">Create Product</h2>
      <UpdateProductForm product={product} />
    </section>
  )
}

export default EditProductPage
