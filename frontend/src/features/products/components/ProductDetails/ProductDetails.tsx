import { toast } from "sonner"
import { useState } from "react"
import { twMerge } from "tailwind-merge"
import { useNavigate } from "react-router-dom"

import SizeSelector from "./SizeSelector"
import ProductImages from "./ProductImages"
import ColorSelector from "./ColorSelector"
import { Product } from "../../types/products.types"
import ProductInfoAccordion from "./ProductInfoAccordion"
import { useAddToCartMutation } from "@/features/cart/hooks/useAddToCartMutation"

const ProductDetails = ({ product }: { product: Product }) => {
  const navigate = useNavigate()
  const { addToCart } = useAddToCartMutation()

  const [quantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [isAddedToCart, setIsAddedToCart] = useState(false)

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      return toast.error("Please select a size and color.")
    }

    addToCart({
      productId: product._id,
      color: selectedColor,
      size: selectedSize,
      quantity,
    })

    setIsAddedToCart(true)
  }

  const handleNavigateToCart = () => navigate("/cart")

  return (
    <section className="mt-6">
      <div className="mb-12 flex flex-col gap-12 md:flex-row md:items-start md:gap-0">
        {/* Product images */}
        <div className="flex flex-1/2 gap-4 overflow-x-auto sm:grid sm:grid-cols-2">
          <ProductImages images={product.images} />
        </div>

        {/* Product details */}
        <div className="flex-1/2 md:pl-6 lg:pl-12">
          <div className="font-medium uppercase">| {product.category} |</div>
          <h1 className="mt-4 mb-4 text-4xl font-medium sm:mt-6 sm:text-5xl">
            {product.name}
          </h1>

          {/* Rating */}
          {/* <div className="inline-flex items-center gap-1">
            {Array.from({ length: product.rating }).map((_, i) => (
              <StarIcon key={i} className="size-[18px] fill-yellow-400" />
            ))}
            <span className="ml-2 text-xl">{product.rating}.0</span>
            <span className="ml-1 text-sm text-[#101010]/70 italic">
              {product.numReview} reviews
            </span>
          </div> */}

          {/* Price */}
          <div className="my-5">
            <strong className="text-3xl font-medium">
              ${product.price}.00
            </strong>
            <span className="text-sm text-[#101010]/70"> Tax Included.</span>
          </div>

          {/* Selectors */}
          <ColorSelector
            colors={product.colors}
            selectedColor={selectedColor}
            onSelect={setSelectedColor}
          />
          <SizeSelector
            availableSizes={product.sizes}
            selectedSize={selectedSize}
            onSelect={setSelectedSize}
          />

          {/* Add to Cart */}
          <div className="my-8">
            <button
              onClick={isAddedToCart ? handleNavigateToCart : handleAddToCart}
              className={twMerge(
                "w-full cursor-pointer bg-[#101010] px-4 py-3 text-[#fcfcfc] transition-transform active:scale-95",
                isAddedToCart && "border bg-[#fcfcfc] text-[#101010]",
              )}
            >
              {isAddedToCart ? "GO TO CART" : "ADD TO CART"}
            </button>
          </div>

          {/* Description Accordion */}
          <ProductInfoAccordion description={product.description} />
        </div>
      </div>
    </section>
  )
}

export default ProductDetails
