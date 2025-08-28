import { Link } from "react-router-dom"

import { Product } from "../types/products.types"
import WishlistIcon from "@/assets/icons/wishlist.svg?react"

const ProductCard = (product: Product) => {
  return (
    <article className="w-full" role="listitem">
      <Link to={`/product/${product._id}`} target="_blank" className="block">
        <figure className="h-72 w-full">
          <img
            src={product.images[0]?.url}
            alt={product.name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <figcaption className="sr-only">{product.name}</figcaption>{" "}
        </figure>

        <section className="mt-2 mb-4">
          <h2 className="text-md overflow-hidden font-medium">
            {product.name}
          </h2>
          <p className="sr-only">{product.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-md font-medium">${product.price}</span>
            <button
              aria-label={`Add ${product.name} to favorites`}
              className="flex size-7 cursor-pointer items-center justify-center rounded-full border border-neutral-200/70"
            >
              <WishlistIcon className="text-[#101010]" />
            </button>
          </div>
        </section>
      </Link>
    </article>
  )
}

export default ProductCard
