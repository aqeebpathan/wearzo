import { twMerge } from "tailwind-merge"

import Button from "@/shared/components/Button"

interface CartSummaryProps {
  cartTotal: number
  taxAmount: number
  finalTotal: number
  onCheckout?: () => void
  showCheckoutButton?: boolean
}

const CartSummary = ({
  cartTotal,
  taxAmount,
  finalTotal,
  onCheckout,
  showCheckoutButton = true,
}: CartSummaryProps) => {
  return (
    <div
      className={twMerge(
        "w-full md:mx-auto md:max-w-sm",
        showCheckoutButton && "md:sticky md:top-18",
      )}
    >
      <h3 className="text-2xl font-semibold sm:text-[26px]">Summary</h3>

      <div className="mt-4 flex flex-col gap-3">
        <div className="inline-flex items-center justify-between sm:mt-3.5">
          <p className="text-md lg:text-lg">Subtotal</p>
          <span className="text-md font-semibold lg:text-lg">
            ${cartTotal?.toFixed(2).toString().replace(".", ",")}
          </span>
        </div>

        <div className="inline-flex items-center justify-between">
          <p className="text-md lg:text-lg">Estimated Delivery & Handling</p>
          <span className="text-md font-medium sm:text-lg">Free</span>
        </div>

        <div className="inline-flex items-center justify-between">
          <p className="text-md lg:text-lg">Estimated Taxes</p>
          <span className="text-md font-semibold lg:text-lg">
            ${taxAmount.toFixed(2).toString().replace(".", ",")}
          </span>
        </div>

        <div
          className={twMerge(
            "mt-4 w-full border-t border-neutral-200/70 md:mt-6 lg:mt-12",
            !showCheckoutButton && "border-b border-neutral-200/70",
          )}
        >
          <div className="inline-flex w-full items-center justify-between py-2 sm:py-3">
            <p className="text-lg font-semibold lg:text-xl">Total</p>
            <span className="text-lg font-semibold lg:text-xl">
              ${finalTotal.toFixed(2).toString().replace(".", ",")}
            </span>
          </div>

          {showCheckoutButton && (
            <div className="sm:mt-4" onClick={onCheckout}>
              <Button>Proceed to Checkout</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CartSummary
