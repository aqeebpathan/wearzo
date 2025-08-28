import { useParams } from "react-router-dom"

import RenderError from "@/shared/components/RenderError"
import SkeletonGrid from "../components/Skeletons/SkeletonGrid"
import { useProductQuery } from "@/features/products/hooks/useProductQuery"
import SimilarProducts from "@/features/products/components/SimilarProducts"
import ProductCardSkeleton from "../components/Skeletons/ProductCardSkeleton"
import ProductDetailsSkeleton from "../components/Skeletons/ProductDetailsSkeleton"
import ProductDetails from "@/features/products/components/ProductDetails/ProductDetails"
import { useSimilarProductsQuery } from "@/features/products/hooks/useSimilarProductsQuery"

const ProductDetailsPage = () => {
  const { productId } = useParams<{ productId: string }>()

  // Fetch product details
  const {
    product,
    isPending: isProductLoading,
    isError: isProductError,
    error: productError,
  } = useProductQuery(productId!)

  // Fetch similar products
  const {
    similarProducts,
    isPending: isSimilarLoading,
    isError: isSimilarError,
    error: similarError,
  } = useSimilarProductsQuery(productId!)

  return (
    <main className="px-4 md:px-6 lg:px-12">
      <div className="mx-auto 2xl:container">
        {/* Product Details Section */}
        {isProductLoading && <ProductDetailsSkeleton />}
        {isProductError && (
          <RenderError
            error={productError}
            fallbackMessage="Unable to load product details."
          />
        )}
        {product && <ProductDetails product={product} />}

        {/* Similar Products Section */}
        <section className="my-12" aria-labelledby="similar-products-heading">
          <h2
            id="similar-products-heading"
            className="my-12 mt-24 text-4xl sm:text-5xl lg:mt-32"
          >
            You May Also Like
          </h2>

          {isSimilarLoading && (
            <SkeletonGrid
              count={4}
              skeletonComponent={<ProductCardSkeleton />}
              gridClassName="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-12"
            />
          )}
          {isSimilarError && (
            <RenderError
              error={similarError}
              fallbackMessage="Couldn't load similar products."
            />
          )}
          {similarProducts && <SimilarProducts products={similarProducts} />}
        </section>
      </div>
    </main>
  )
}

export default ProductDetailsPage
