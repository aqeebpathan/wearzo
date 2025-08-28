import CheckoutForm from "../components/CheckoutForm"
import { useCheckoutForm } from "../hooks/useCheckoutForm"
import CartSummary from "@/shared/components/CartSummary.tsx"
import CheckoutCartItems from "../components/CheckoutCartItems"
import { useCartQuery } from "@/features/cart/hooks/useCartQuery"

const CheckoutPage = () => {
  const { cart } = useCartQuery()
  const { checkoutId, handleCreateCheckout, handlePaymentSuccess } =
    useCheckoutForm(cart)

  if (!cart) return null

  const cartSummary = cart?.summary

  return (
    <section className="px-4 pb-4 md:px-6 md:pb-6 lg:px-12 lg:pb-12">
      <div className="mx-auto mt-4 flex w-full flex-col-reverse justify-between gap-12 md:flex-row md:gap-6 lg:gap-12 2xl:container">
        <div className="flex-3/4">
          <h3 className="text-2xl font-semibold sm:text-[26px]">
            Enter Your Shipping Information
          </h3>
          <div className="mt-6">
            <CheckoutForm
              checkoutId={checkoutId!}
              onCreateCheckout={handleCreateCheckout}
              onSuccess={handlePaymentSuccess}
              amount={cartSummary.total}
            />
          </div>
        </div>

        {/* Cart Summary Section */}
        <div className="flex flex-col-reverse gap-6 md:flex-1/2 md:flex-col">
          <CartSummary
            cartTotal={cartSummary.subtotal}
            taxAmount={cartSummary.estimatedTax}
            finalTotal={cartSummary.total}
            showCheckoutButton={false}
          />
          <CheckoutCartItems items={cart.products} />
        </div>
      </div>
      <div className="mx-auto 2xl:container"></div>
    </section>
  )
}

export default CheckoutPage
