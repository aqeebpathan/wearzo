import { Link } from "react-router-dom"

import { formatPrice } from "@/shared/utils/formatPrice"
import {
  CartItemDto,
  CartProduct,
  UpdateCartItemDto,
} from "../types/cart.types"

import RemoveIcon from "@/assets/icons/delete.svg?react"
import WishlistIcon from "@/assets/icons/wishlist.svg?react"
import IncreaseIcon from "@/assets/icons/add-circle.svg?react"
import DecreaseIcon from "@/assets/icons/minus-circle.svg?react"

interface CartItemsProps {
  items: CartProduct[]
  onRemove: (item: CartItemDto) => void
  onQuantityUpdate: (item: UpdateCartItemDto) => void
}

const CartItems = ({ items, onRemove, onQuantityUpdate }: CartItemsProps) => {
  return (
    <div className="mt-8 flex flex-col gap-8">
      {items?.map((item) => (
        <div key={item._id} className="flex gap-4 lg:gap-6">
          <div className="aspect-square h-24 w-24 shrink-0 sm:h-36 sm:w-1/4 lg:w-1/5">
            <img
              src={item.image}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex w-full flex-col">
            {/* Item Name and Price */}
            <div className="inline-flex w-full items-start justify-between gap-2">
              <h4 className="text-lg leading-tight font-medium sm:text-xl sm:leading-normal">
                <Link to={`/product/${item.productId}`}>{item.name}</Link>
              </h4>
              <strong className="text-lg leading-tight font-semibold tracking-tight sm:text-xl sm:leading-normal sm:font-medium sm:tracking-wide">
                ${formatPrice(item.totalProductPrice)}
              </strong>
            </div>

            {/* Item Size and Color */}
            <div className="sm:mt-3">
              <p className="sm:text-md text-xs text-neutral-400">
                Size: <span>{item.size}</span>
              </p>
              <p className="sm:text-md text-xs text-neutral-400">
                Color: <span>{item.color}</span>
              </p>
            </div>

            {/* Bottom action buttons  */}
            <div className="mt-auto flex justify-between sm:pt-4">
              {/* for wishlist and removal */}
              <div className="inline-flex items-end gap-4">
                <button>
                  <WishlistIcon className="size-5 sm:size-6" />
                </button>
                <button
                  onClick={() =>
                    onRemove({
                      size: item.size,
                      color: item.color,
                      quantity: item.quantity,
                      productId: item.productId,
                    })
                  }
                >
                  <RemoveIcon className="size-5 sm:size-6" />
                </button>
              </div>

              {/* for quantity increase/decresase */}
              <div className="inline-flex items-end gap-1">
                <button
                  onClick={() =>
                    onQuantityUpdate({
                      quantityDelta: -1,
                      size: item.size,
                      color: item.color,
                      productId: item.productId,
                    })
                  }
                  disabled={item.quantity === 1}
                  className="disabled:text-neutral-400"
                >
                  <DecreaseIcon className="size-5 sm:size-6" />
                </button>
                <strong className="min-w-8 text-center text-lg leading-tight font-semibold sm:text-xl">
                  {item.quantity}
                </strong>
                <button
                  onClick={() =>
                    onQuantityUpdate({
                      quantityDelta: +1,
                      size: item.size,
                      color: item.color,
                      productId: item.productId,
                    })
                  }
                >
                  <IncreaseIcon className="size-5 sm:size-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CartItems
