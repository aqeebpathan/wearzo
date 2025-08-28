import { twMerge } from "tailwind-merge"

interface ColorSelectorProps {
  selectedColor: string
  onSelect: (color: string) => void
  colors: string[]
}

const ColorSelector = ({
  selectedColor,
  onSelect,
  colors,
}: ColorSelectorProps) => (
  <div className="mb-4">
    <h3>Colors</h3>
    <div className="my-2 inline-flex flex-wrap gap-2">
      {colors.map((color) => (
        <button
          key={color}
          onClick={() => onSelect(color)}
          className={twMerge(
            "block size-8 cursor-pointer rounded-full border border-neutral-400 transition-transform active:scale-95",
            selectedColor === color && "ring",
          )}
          style={{ background: color }}
        ></button>
      ))}
    </div>
  </div>
)

export default ColorSelector
