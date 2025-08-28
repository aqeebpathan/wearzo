import OrderCard from "./OrderCard"
import OrderSkeleton from "./OrderSkeleton"
import { useOrdersQuery } from "../hooks/useOrdersQuery"

const OrderList = () => {
  const { orders, isPending } = useOrdersQuery()

  if (isPending) {
    return (
      <div className="mt-8 max-w-4xl space-y-8">
        {Array.from({ length: 3 }).map((_, idx) => (
          <OrderSkeleton key={idx} />
        ))}
      </div>
    )
  }

  if (!orders.length) {
    return (
      <p className="mt-10 text-center text-neutral-600">No orders found.</p>
    )
  }

  return (
    <div>
      <ul className="max-w-4xl space-y-8">
        {orders.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </ul>
    </div>
  )
}

export default OrderList
