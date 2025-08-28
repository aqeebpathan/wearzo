const ProductDetailsSkeleton = () => {
  return (
    <section className="mt-6 animate-pulse">
      <div className="mb-12 flex flex-col gap-12 md:flex-row md:items-start md:gap-0">
        {/* Skeleton for images */}
        <div className="flex h-96 flex-1/2 gap-4 overflow-x-auto rounded bg-neutral-200 sm:grid sm:grid-cols-2"></div>

        {/* Skeleton for details */}
        <div className="flex-1/2 space-y-4 md:pl-6 lg:pl-12">
          <div className="h-4 w-24 rounded bg-neutral-200"></div>
          <div className="h-10 w-3/4 rounded bg-neutral-200"></div>

          {/* Stars */}
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 w-4 rounded bg-yellow-300"></div>
            ))}
          </div>

          <div className="h-8 w-20 rounded bg-neutral-200"></div>

          {/* Color & size selectors skeleton */}
          <div className="h-10 w-full rounded bg-neutral-200"></div>
          <div className="h-10 w-full rounded bg-neutral-200"></div>

          {/* Button skeleton */}
          <div className="h-12 w-full rounded bg-neutral-200"></div>

          {/* Accordion skeleton */}
          <div className="h-20 w-full rounded bg-neutral-200"></div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetailsSkeleton
