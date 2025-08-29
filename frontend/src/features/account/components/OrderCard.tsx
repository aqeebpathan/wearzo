import { twMerge } from "tailwind-merge"

import { Order } from "../types/account.types"
import OrderProductItem from "./OrderProductItem"
import { formatDate, formatEstimatedArrival } from "@/shared/utils/formateDate"

const STATUS_LABELS: Record<string, string> = {
  pending: "Waiting for confirmation",
  processing: "Being prepared",
  shipped: "On the way",
  delivered: "Delivered successfully",
  cancelled: "Order cancelled",
}

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  shipped: "bg-indigo-100 text-indigo-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
}

const OrderCard = ({ order }: { order: Order }) => {
  const {
    _id,
    orderItems,
    status,
    shippingAddress,
    totalPrice,
    estimatedArrival,
    createdAt,
    isDelivered,
    deliveredAt,
  } = order

  return (
    <li className="border border-neutral-400 p-3">
      <div className="flex justify-between gap-4">
        <div>
          <h4 className="text-md font-semibold">Order #{_id.slice(3, 9)}</h4>
          <p className="text-sm text-neutral-600">
            {orderItems.length} {orderItems.length > 1 ? "products" : "product"}{" "}
            | By Alex John | {formatDate(createdAt)}
          </p>
        </div>

        <span
          className={twMerge(
            "h-fit w-fit px-2 py-1 text-[13px] font-medium uppercase",
            STATUS_STYLES[status],
          )}
          aria-label={`Status: ${status}`}
        >
          {status}
        </span>
      </div>

      <div className="mt-4 flex flex-col space-y-1 border-t border-neutral-400">
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
          <span className="min-w-[9rem] text-sm text-neutral-600">Status:</span>
          <span className="flex-1 text-sm break-words">
            {STATUS_LABELS[status]}
          </span>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          <span className="min-w-[9rem] text-sm text-neutral-600">
            {isDelivered ? "Delivered at" : "Date of delivery"}
          </span>
          <span className="flex-1 text-sm break-words">
            {isDelivered
              ? formatEstimatedArrival(deliveredAt)
              : formatDate(estimatedArrival)}
          </span>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          <span className="min-w-[9rem] text-sm text-neutral-600">
            Delivered to:
          </span>
          <span className="flex-1 text-sm break-words">
            {shippingAddress.address}
          </span>
        </div>
        <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 font-semibold">
          <span className="min-w-[9rem] text-sm">Total:</span>
          <span className="flex-1 text-sm break-words">
            USD {totalPrice.toString().replace(".", ",")}
          </span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 border-t border-neutral-400 pt-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
        {orderItems.map((item) => (
          <OrderProductItem
            key={item.productId + item.name + item.quantity}
            item={item}
          />
        ))}
      </div>
    </li>
  )
}

export default OrderCard
