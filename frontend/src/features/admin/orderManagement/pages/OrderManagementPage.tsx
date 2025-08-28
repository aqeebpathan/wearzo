import OrderList from "../components/OrderList"
import { useOrdersQuery } from "../hooks/useOrdersQuery"
import RenderError from "@/shared/components/RenderError"
import OrderListSkeleton from "../components/OrderListSkeleton"

const OrderManagementPage = () => {
  const { orders, isPending, isError, error } = useOrdersQuery()

  return (
    <section>
      <h2 className="text-2xl font-medium">Manage Orders</h2>
      {isError && <RenderError error={error} />}
      {isPending && <OrderListSkeleton />}
      {!isError && !isPending && <OrderList orders={orders} />}
    </section>
  )
}

export default OrderManagementPage
