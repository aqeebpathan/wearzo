const ProductCardSkeleton = () => {
  return (
    <article className="w-full animate-pulse" role="listitem">
      <div className="block">
        <figure className="h-72 w-full bg-neutral-200" />

        <section className="mt-2 mb-4 space-y-2">
          <div className="h-5 w-3/4 bg-neutral-200" />
          <div className="sr-only">Product description placeholder</div>

          <div className="flex items-center justify-between">
            <div className="h-5 w-1/4 bg-neutral-200" />
            <div className="size-7 rounded-full border border-neutral-200/70 bg-neutral-200" />
          </div>
        </section>
      </div>
    </article>
  )
}

export default ProductCardSkeleton
