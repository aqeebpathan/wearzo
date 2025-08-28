import ProductCard from "./ProductCard"
import { Product } from "../types/products.types"

interface SimilarProductsProps {
  products: Product[]
}

const SimilarProducts = ({ products }: SimilarProductsProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-12">
      {products.map((product) => (
        <ProductCard key={product._id} {...product} />
      ))}
    </div>
  )
}

export default SimilarProducts
