import ProductCard from "./ProductCard"
import SkeletonGrid from "./Skeletons/SkeletonGrid"
import RenderError from "@/shared/components/RenderError"
import { useProductsQuery } from "../hooks/useProductsQuery"
import ProductCardSkeleton from "./Skeletons/ProductCardSkeleton"

const ProductList = () => {
  const { products, isPending, isError, error } = useProductsQuery()

  const renderProducts = () => (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product._id} {...product} />
      ))}
    </div>
  )

  return (
    <section
      aria-labelledby="product-list"
      className="w-full transition-opacity"
    >
      <h2 id="product-list" className="sr-only">
        Our Product Collection
      </h2>

      {isError && (
        <RenderError
          error={error}
          fallbackMessage="Unable to load products. Please try again."
        />
      )}
      {isPending && (
        <SkeletonGrid
          gridClassName="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          skeletonComponent={<ProductCardSkeleton />}
        />
      )}
      {!isPending && !isError && renderProducts()}
    </section>
  )
}

export default ProductList
