import { ChangeEvent } from "react"
import { twMerge } from "tailwind-merge"

import { Order } from "../types/order.types"
import { useUpdateOrderStatusMutation } from "../hooks/useUpdateOrderStatusMutation"

interface OrderListProps {
  orders: Order[]
}

const STATUS_OPTIONS = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
] as const

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  shipped: "bg-indigo-100 text-indigo-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
}

const capitalize = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1)

const ORDER_GRID = "grid-cols-[1fr_2fr_1fr_1fr_2fr_6rem] min-w-[800px]"

const OrderList = ({ orders }: OrderListProps) => {
  const { updateOrderStatus, isPending } = useUpdateOrderStatusMutation()

  const handleStatusChange = (status: string, orderId: string) => {
    updateOrderStatus({ orderId, status })
  }

  return (
    <div className="my-6 border border-neutral-400 p-4">
      <h3 className="mb-4 text-xl font-medium">All Orders</h3>

      {/* Scrollable container */}
      <div className="w-full overflow-x-auto">
        <div className="w-full">
          {/* Header row */}
          <div
            className={`grid ${ORDER_GRID} items-center gap-4 border-t border-b border-neutral-400 bg-neutral-50 px-3 py-3 text-sm font-medium text-neutral-800`}
          >
            <div>Invoice</div>
            <div>Customer</div>
            <div>Amount</div>
            <div>Status</div>
            <div>Payment Status</div>
            <div className="text-right">Action</div>
          </div>

          {/* Data rows */}
          <div className="divide-y divide-neutral-200">
            {orders.map(({ _id, user, totalPrice, status, paymentStatus }) => (
              <div
                key={_id + user.username}
                className={`grid ${ORDER_GRID} items-center gap-4 px-3 py-4 text-sm text-neutral-700`}
                role="row"
              >
                <div>#{_id.slice(1, 6).toUpperCase()}</div>
                <div>{user.username}</div>
                <div>${totalPrice.toFixed(2)}</div>
                <div>
                  <span
                    className={twMerge(
                      "w-fit px-2 py-1 text-xs font-medium",
                      STATUS_STYLES[status],
                    )}
                    aria-label={`Status: ${status}`}
                  >
                    {capitalize(status)}
                  </span>
                </div>
                <div>{capitalize(paymentStatus)}</div>
                <div className="text-right">
                  <label htmlFor={`status-${_id}`} className="sr-only">
                    Change status for order {user.username}
                  </label>
                  <select
                    id={`status-${_id}`}
                    value={status}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                      handleStatusChange(e.target.value, _id)
                    }
                    disabled={isPending}
                    className="py-0.5 text-sm outline outline-neutral-400"
                  >
                    {STATUS_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {capitalize(option)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderList
