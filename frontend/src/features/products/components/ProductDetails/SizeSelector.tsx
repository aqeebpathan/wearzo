import { twMerge } from "tailwind-merge"

interface SizeSelectorProps {
  selectedSize: string
  onSelect: (size: string) => void
  availableSizes: string[]
}

const PRODUCT_SIZES = ["XS", "S", "M", "L", "XL", "XXL"]

const SizeSelector = ({
  selectedSize,
  onSelect,
  availableSizes,
}: SizeSelectorProps) => (
  <div>
    <h3>Sizes</h3>
    <div className="my-2 inline-flex flex-wrap gap-2">
      {PRODUCT_SIZES.map((size) => (
        <button
          key={size}
          onClick={() => onSelect(size)}
          className={twMerge(
            "cursor-pointer border px-5 py-2 transition-transform active:scale-95 disabled:cursor-not-allowed disabled:opacity-20",
            availableSizes.includes(size) &&
              "hover:bg-[#101010] hover:text-neutral-50",
            selectedSize === size && "bg-[#101010] text-neutral-50",
          )}
          disabled={!availableSizes.includes(size)}
        >
          {size}
        </button>
      ))}
    </div>
  </div>
)

export default SizeSelector
