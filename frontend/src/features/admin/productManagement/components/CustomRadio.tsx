import React from "react"
import { twMerge } from "tailwind-merge"

import { UseFormRegisterReturn } from "react-hook-form"

type Option = {
  label: string
  value: string
}

interface CustomRadioGroupProps {
  label: string
  id: string
  options: Option[]
  value: string
  error?: { message?: string }
  registration: UseFormRegisterReturn
}

const CustomRadioGroup: React.FC<CustomRadioGroupProps> = ({
  id,
  label,
  options,
  value,
  error,
  registration,
}) => {
  return (
    <div className="w-full" id={id}>
      <label className="mt-0.5 mb-1.5 -ml-0.5 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <div className="flex w-full justify-between gap-4">
        {options.map((opt) => (
          <label
            key={opt.value}
            className={twMerge(
              `text-md flex flex-1 cursor-pointer items-center justify-center gap-2 px-4 py-2 ring-[1.5px] ring-neutral-400/60 transition-all outline-none`,
              value === opt.value
                ? "bg-neutral-800 text-white ring-neutral-950"
                : "bg-white text-neutral-600",
              error && "ring-red-500",
            )}
          >
            <input
              type="radio"
              value={opt.value}
              className="hidden"
              checked={value === opt.value}
              {...registration}
            />
            {opt.label}
          </label>
        ))}
      </div>

      {error?.message && (
        <p className="mt-1 text-sm text-red-500">{error.message}</p>
      )}
    </div>
  )
}

export default CustomRadioGroup
