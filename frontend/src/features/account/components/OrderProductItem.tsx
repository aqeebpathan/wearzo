const OrderProductItem = ({
  item,
}: {
  item: {
    name: string
    productId: string
    price: number
    quantity: number
    image: string
    color: string
    size: string
  }
}) => {
  return (
    <div className="flex items-start gap-4">
      <div className="aspect-square size-22 shrink-0">
        <img
          src={item?.image}
          alt={item?.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div>
        <h3 className="leading-tight font-medium">{item?.name}</h3>
        <div className="mt-1.5 text-sm text-neutral-600">
          <p>
            Quantity: {item?.quantity}x = $
            {item?.price.toFixed(2).replace(".", ",")}
          </p>
          <p>Color: {item?.color}</p>
          <p>Size: {item?.size}</p>
        </div>
      </div>
    </div>
  )
}

export default OrderProductItem
