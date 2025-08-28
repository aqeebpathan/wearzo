import React from "react"

interface SkeletonGridProps {
  count?: number
  skeletonComponent: React.ReactElement
  gridClassName?: string
}

const SkeletonGrid: React.FC<SkeletonGridProps> = ({
  count = 8,
  skeletonComponent,
  gridClassName = "grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
}) => {
  return (
    <div
      className={gridClassName}
      aria-busy="true"
      aria-label="Loading content"
    >
      {Array.from({ length: count }).map((_, idx) =>
        React.cloneElement(skeletonComponent, { key: idx }),
      )}
    </div>
  )
}

export default SkeletonGrid
