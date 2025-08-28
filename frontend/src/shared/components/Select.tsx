import { useState, useRef, useEffect } from "react"
import { UseFormRegisterReturn } from "react-hook-form"

type Option = {
  label: string
  value: string
}

interface CustomSelectProps {
  label: string
  id: string
  options: Option[]
  error?: { message?: string }
  registration: UseFormRegisterReturn
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  id,
  label,
  options,
  error,
  registration,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState<string>("")
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSelect = (value: string) => {
    setSelected(value)
    setIsOpen(false)
    registration.onChange({ target: { value } }) // manually trigger form update
  }

  return (
    <div className="w-full" ref={dropdownRef}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>

      {/* Hidden input so RHF can manage the value */}
      <input type="hidden" id={id} {...registration} value={selected} />

      <div
        className={`relative mt-1 cursor-pointer px-3 py-2.5 text-sm font-medium ring-[1.5px] ring-neutral-400/60 ${
          error ? "ring-red-500 focus:ring-red-500" : "focus:ring-neutral-950"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={selected ? "text-gray-900" : "text-gray-400"}>
          {options.find((o) => o.value === selected)?.label ||
            `Select ${label}`}
        </span>

        <div className="pointer-events-none absolute top-2.5 right-3 text-gray-400">
          ▼
        </div>

        {isOpen && (
          <ul className="absolute right-0 left-0 z-10 mt-1 max-h-48 overflow-auto bg-[#101010] text-[#fcfcfc] shadow-lg">
            {options.map((opt) => (
              <li
                key={opt.value}
                className="cursor-pointer px-3 py-2 text-sm hover:bg-[#fcfcfc] hover:text-[#101010]"
                onClick={() => handleSelect(opt.value)}
              >
                {opt.label}
              </li>
            ))}
          </ul>
        )}
      </div>

      {error?.message && (
        <p className="text-sm text-red-500">{error.message}</p>
      )}
    </div>
  )
}

export default CustomSelect
