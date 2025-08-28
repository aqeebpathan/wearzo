import RenderError from "@/shared/components/RenderError"
import ProductList from "../components/ProductList"
import ProductListSkeleton from "../components/ProductListSkeleton"
import useProductsQuery from "../hooks/useProductsQuery"

const ProductManagementPage = () => {
  const { products, isPending, isError, error } = useProductsQuery()
  return (
    <section className="h-full">
      <h2 className="text-2xl font-medium">Manage Products</h2>
      {isError && <RenderError error={error} />}
      {isPending && <ProductListSkeleton />}
      {!isError && !isPending && <ProductList products={products} />}
    </section>
  )
}

export default ProductManagementPage
