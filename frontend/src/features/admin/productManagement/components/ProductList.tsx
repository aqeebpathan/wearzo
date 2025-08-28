import { Link } from "react-router-dom"

import ProductRow from "./ProductRow"
import { Product } from "../types/product.types"

interface ProductListProps {
  products: Product[]
}

const PRODUCT_GRID =
  "grid grid-cols-[1.2fr_2fr_1.5fr_1fr_1fr_1.5fr_1.5fr_1fr] min-w-[900px]"

const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="mt-6 border border-neutral-400 p-4">
      <div className="mb-4 flex justify-between">
        <h4 className="text-xl font-medium">All Products</h4>
        <Link
          to="create"
          role="button"
          className="inline-flex cursor-pointer items-center justify-center bg-[#101010] px-4 py-0.5 text-sm font-medium text-[#fcfcfc]"
        >
          Add Product
        </Link>
      </div>

      {/* Scrollable container */}
      <div className="w-full overflow-x-auto">
        <div className="w-full">
          {/* Header row */}
          <div
            className={`${PRODUCT_GRID} items-center gap-4 border-y border-neutral-400 bg-neutral-50 px-3 py-3 text-sm font-medium text-neutral-800`}
          >
            <div>SKU</div>
            <div>Name</div>
            <div>Category</div>
            <div>Price</div>
            <div>Stock</div>
            <div>Color</div>
            <div>Size</div>
            <div className="text-right">Actions</div>
          </div>

          {/* Data rows */}
          <div className="divide-y divide-neutral-200">
            {products?.map((product) => (
              <ProductRow
                key={product._id}
                product={product}
                gridClass={PRODUCT_GRID}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductList
