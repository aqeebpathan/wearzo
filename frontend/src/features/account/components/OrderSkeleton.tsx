const OrderSkeleton = () => {
  return (
    <div className="animate-pulse space-y-4 border border-neutral-200 p-4">
      <div className="flex justify-between">
        <div className="h-4 w-32 bg-neutral-200" />
        <div className="h-4 w-20 bg-neutral-200" />
      </div>
      <div className="space-y-2">
        <div className="h-3 w-3/4 bg-neutral-200" />
        <div className="h-3 w-2/3 bg-neutral-200" />
      </div>
      <div className="mt-4 space-y-3 border-t border-neutral-200 pt-4">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex gap-4">
            <div className="size-20 bg-neutral-200" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-1/2 bg-neutral-200" />
              <div className="h-3 w-2/3 bg-neutral-200" />
              <div className="h-3 w-1/4 bg-neutral-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OrderSkeleton
