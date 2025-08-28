import { Link, useNavigate } from "react-router-dom"

import { useAppSelector } from "@/app/hooks"
import CartSummary from "@/shared/components/CartSummary"
import CartItems from "@/features/cart/components/CartItems"
import { useCartQuery } from "@/features/cart/hooks/useCartQuery"
import { useRemoveFromCartMutation } from "@/features/cart/hooks/useRemoveFromCartMutation"
import { useUpdateCartQuantityMutation } from "@/features/cart/hooks/useUpdateCartQuantityMutation"
import {
  CartItemDto,
  UpdateCartItemDto,
} from "@/features/cart/types/cart.types"

import EmptyCart from "@/assets/images/empty-cart.svg?react"

const CartPage = () => {
  const navigate = useNavigate()
  const { user } = useAppSelector((state) => state.auth)
  const { cart } = useCartQuery()
  const { removeItem } = useRemoveFromCartMutation()
  const { updateQuantity } = useUpdateCartQuantityMutation()

  if (!cart) return

  const handleCheckout = () => {
    if (!user) {
      navigate("/login?redirect=checkout")
    } else {
      navigate("/checkout")
    }
  }

  const cartItems = cart?.products
  const cartSummary = cart?.summary

  const handleRemoveItem = (item: CartItemDto) => {
    removeItem({
      productId: item.productId,
      color: item.color,
      size: item.size,
      quantity: item.quantity,
    })
  }

  const handleUpdateQuantity = (item: UpdateCartItemDto) => {
    updateQuantity({
      quantityDelta: item.quantityDelta,
      productId: item.productId,
      color: item.color,
      size: item.size,
    })
  }

  return (
    <section className="px-4 pb-4 md:px-6 md:pb-6 lg:px-12 lg:pb-12">
      {cart.products.length === 0 && (
        <div className="flex h-[calc(100dvh-134px)] w-full flex-col items-center justify-center sm:h-[calc(100dvh-120px)] lg:h-[calc(100dvh-144px)]">
          <EmptyCart className="size-44" />
          <div className="mt-9 flex flex-col items-center">
            <h5 className="text-xl font-semibold text-[#101010]">
              Your cart is empty
            </h5>
            <p className="mt-1 text-sm text-[#101010]/50">
              Looks like you haven’t added anything yet.
            </p>

            <Link
              to="/collections/all"
              className="my-6 border px-4 py-2 text-sm uppercase transition-all active:scale-95"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
      {cart?.products.length > 0 && (
        <div className="mx-auto mt-4 flex w-full flex-col justify-between gap-12 md:flex-row md:gap-6 lg:gap-12 2xl:container">
          <>
            {/* Left Cart Items  */}
            <div className="flex-3/4">
              <h3 className="text-2xl font-semibold sm:text-[26px]">
                Your Cart
              </h3>
              <CartItems
                items={cartItems}
                onRemove={handleRemoveItem}
                onQuantityUpdate={handleUpdateQuantity}
              />
            </div>

            {/* Right Summary Section */}
            <div className="flex-1/2">
              <CartSummary
                cartTotal={cartSummary.subtotal}
                taxAmount={cartSummary.estimatedTax}
                finalTotal={cartSummary.total}
                onCheckout={handleCheckout}
              />
            </div>
          </>
        </div>
      )}
    </section>
  )
}

export default CartPage
