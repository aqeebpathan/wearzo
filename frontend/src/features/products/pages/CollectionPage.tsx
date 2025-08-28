import { useState } from "react"

import FilterBottomSheet from "../components/FilterBottomSheet"
import ProductList from "@/features/products/components/ProductList"
import ProductFilter from "@/features/products/components/ProductFilter"
import ProductSorting from "@/features/products/components/ProductSorting"

import FilterIcon from "@/assets/icons/filter1.svg?react"

const CollectionPage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  return (
    <section className="px-4 md:px-6 lg:px-12">
      <div className="mx-auto 2xl:container">
        <div className="mb-12 flex flex-col gap-6 md:flex-row lg:gap-12">
          {/* Sidebar Filter */}
          <aside className="w-56 shrink-0">
            <div className="hidden md:block">
              <ProductFilter />
            </div>

            {/* Mobile Filter Bottom Sheet */}
            <FilterBottomSheet
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
            >
              <ProductFilter />
            </FilterBottomSheet>
          </aside>

          {/* Main Content */}
          <main className="flex-grow">
            <div className="my-4 flex items-center justify-between">
              <div>
                <h2 className="mb-3 hidden text-2xl font-semibold md:block">
                  All Collections
                </h2>

                {/* Mobile Sorting */}
                <div className="md:hidden">
                  <ProductSorting />
                </div>
              </div>

              {/* Desktop Sorting */}
              <div className="hidden md:block">
                <ProductSorting />
              </div>

              {/* Mobile Filter Icon */}
              <FilterIcon
                onClick={() => setIsFilterOpen(true)}
                className="mb-3 size-5 cursor-pointer md:hidden"
              />
            </div>

            {/* Product List */}
            <ProductList />
          </main>
        </div>
      </div>
    </section>
  )
}

export default CollectionPage
