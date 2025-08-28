import { Link } from "react-router-dom"
import { twMerge } from "tailwind-merge"

import EditIcon from "@/assets/icons/edit.svg?react"
import DeleteIcon from "@/assets/icons/delete.svg?react"

import { Product } from "../types/product.types"
import useDeleteProductMutation from "../hooks/useDeleteProductMutation"

interface ProductRowProps {
  product: Product
  gridClass: string
}

const ProductRow = ({ product, gridClass }: ProductRowProps) => {
  const { _id, sku, name, category, price, countInStock, colors, sizes } =
    product
  const { deleteProduct, isPending } = useDeleteProductMutation()

  const handleDelete = () => {
    const confirmed = confirm(`Delete "${name}"?`)
    if (confirmed) deleteProduct(_id)
  }

  return (
    <div
      className={twMerge(
        gridClass,
        "gap-4 px-3 py-4 text-sm text-neutral-700",
        isPending && "pointer-events-none opacity-40",
      )}
      role="row"
    >
      <div>{sku}</div>
      <div>{name}</div>
      <div>{category}</div>
      <div>${price.toFixed(2)}</div>
      <div>{countInStock}</div>
      <div>{colors.join(", ")}</div>
      <div>{sizes.join(", ")}</div>
      <div className="flex items-center justify-end gap-3">
        <Link to={`${_id}/edit`} target="_blank">
          <EditIcon className="size-5 cursor-pointer text-green-500" />
        </Link>
        <button onClick={handleDelete} disabled={isPending}>
          <DeleteIcon className="size-5 cursor-pointer text-red-500" />
        </button>
      </div>
    </div>
  )
}

export default ProductRow
