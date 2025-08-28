import { Link } from "react-router-dom"
import React, { ReactNode } from "react"
import { twMerge } from "tailwind-merge"

import Button from "@/shared/components/Button"

interface FilterBottomSheetProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

const FilterBottomSheet: React.FC<FilterBottomSheetProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  return (
    <>
      {/* Overlay */}
      <div
        className={twMerge(
          "fixed inset-0 z-40 bg-neutral-900/50 transition-opacity duration-300",
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div
        className={twMerge(
          "fixed right-0 bottom-0 left-0 z-50 flex h-1/2 flex-col bg-white shadow-lg transition-transform duration-300",
          isOpen ? "translate-y-0" : "translate-y-full",
        )}
      >
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4">{children}</div>

        {/* Footer Button */}
        <div className="flex gap-4 p-4">
          <Link
            to="/collections/all"
            className="flex w-full items-center justify-center bg-neutral-50 text-neutral-800 outline transition-colors"
            onClick={onClose}
          >
            Clear
          </Link>
          <Button onClick={onClose}>Apply </Button>
        </div>
      </div>
    </>
  )
}

export default FilterBottomSheet
