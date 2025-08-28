import { useSearchParams } from "react-router-dom"

const ProductSorting = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortBy = e.target.value
    const updatedParams = new URLSearchParams(searchParams.toString())

    if (sortBy === "") {
      updatedParams.delete("sort")
    } else {
      updatedParams.set("sort", sortBy)
    }

    setSearchParams(updatedParams)
  }

  return (
    <div className="-mt-3.5 flex items-center justify-end">
      <select
        id="sort"
        name="sort"
        value={searchParams.get("sort") || ""}
        onChange={handleSortChange}
        className="sm:text-md cursor-pointer border p-1 pl-0 text-sm font-medium focus:outline-none"
      >
        <option value="">Relevance</option>
        <option value="popularity">Popularity</option>
        <option value="new_arrivals">New arrivals</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_dsc">Price: High to Low</option>
      </select>
    </div>
  )
}

export default ProductSorting
