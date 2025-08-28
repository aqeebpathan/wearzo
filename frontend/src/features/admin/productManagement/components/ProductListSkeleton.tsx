import { twMerge } from "tailwind-merge"

const PRODUCT_GRID =
  "grid-cols-[1.2fr_2fr_1.5fr_1fr_1fr_1.5fr_1.5fr_1fr] min-w-[900px]"

const ProductListSkeleton = ({ count = 10 }: { count?: number }) => {
  return (
    <div className="my-6 border border-neutral-400 p-4">
      <div className="flex justify-between">
        <h3 className="mb-4 text-xl font-medium">All Products</h3>
        <div className="h-7 w-[113px] animate-pulse bg-neutral-200"></div>
      </div>

      <div className="w-full overflow-x-auto">
        <div className="w-full">
          <div
            className={`grid ${PRODUCT_GRID} items-center gap-4 border-y border-neutral-400 bg-neutral-50 px-3 py-3 text-sm font-medium text-neutral-800`}
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

          <div className="divide-y divide-neutral-200">
            {Array.from({ length: count }).map((_, idx) => (
              <div
                key={idx}
                className={`grid ${PRODUCT_GRID} animate-pulse items-center gap-4 px-3 py-4`}
              >
                {Array(8)
                  .fill(0)
                  .map((_, col) => (
                    <div
                      key={col}
                      className={twMerge(
                        "h-8 bg-neutral-200 2xl:h-5",
                        col === 7 && "ml-auto",
                      )}
                      style={{ width: col === 7 ? "60%" : "80%" }}
                    />
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductListSkeleton
