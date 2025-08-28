import { CartProduct } from "@/features/cart/types/cart.types"
import { getFormattedArrivalRange } from "@/shared/utils/getFormattedArrivalRange"

interface CheckoutCartItemsProps {
  items: CartProduct[]
}

const CheckoutCartItems = ({ items }: CheckoutCartItemsProps) => {
  const arrivalRange = getFormattedArrivalRange()
  return (
    <div className="w-full md:mx-auto md:max-w-sm">
      <p className="mb-6 text-xl font-semibold md:my-6">{arrivalRange}</p>

      <div className="flex flex-col gap-4">
        {items?.map((item) => (
          <div key={item.productId} className="flex gap-4">
            <div className="flex size-28 shrink-0">
              <img src={item.image} alt={item.name} className="h-full w-full" />
            </div>
            <div className="grow space-y-0.5">
              <h2 className="mb-1 text-lg leading-tight font-semibold">
                {item.name}
              </h2>
              <div className="text-neutral-400">
                <p>Qauntity: {item.quantity}</p>
                <p>Size: {item.size}</p>
                <p>Color: {item.color}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CheckoutCartItems
