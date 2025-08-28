import { twMerge } from "tailwind-merge"
import { useSearchParams } from "react-router-dom"

const filterOptions = [
  { label: "All Orders", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
]

const OrderFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeFilter = searchParams.get("filter") || "all"

  const handleFilterChange = (value: string) => {
    if (value === "all") {
      searchParams.delete("filter")
    } else {
      searchParams.set("filter", value)
    }
    setSearchParams(searchParams)
  }

  return (
    <nav aria-label="Order filter" className="pt-0.5">
      <ul className="ml-[1px] flex w-fit outline outline-neutral-400">
        {filterOptions.map((option) => (
          <li key={option.value}>
            <button
              onClick={() => handleFilterChange(option.value)}
              className={twMerge(
                "cursor-pointer px-3 py-1.5 leading-snug text-nowrap text-neutral-500 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 sm:py-2",
                activeFilter === option.value && "bg-[#101010] text-[#fcfcfc]",
              )}
              aria-current={activeFilter === option.value ? "true" : undefined}
            >
              {option.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default OrderFilter
