import { twMerge } from "tailwind-merge"
import React, { useEffect, useRef, useState } from "react"
import { useController, useFormContext } from "react-hook-form"

import Button from "@/shared/components/Button"

type ProductImageInputProps = {
  name: string
  error?: string
}

const MAX_IMAGES = 4

const ProductImageInput = ({ name, error }: ProductImageInputProps) => {
  const { control } = useFormContext()
  const {
    field: { value = [], onChange },
  } = useController({
    name,
    control,
    defaultValue: [],
  })

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [previewURLs, setPreviewURLs] = useState<string[]>([])

  useEffect(() => {
    const urls = value.map((item: File | string) =>
      typeof item === "string" ? item : URL.createObjectURL(item),
    )

    setPreviewURLs(urls)

    return () => {
      value.forEach((item: File | string, index: number) => {
        if (item instanceof File) {
          URL.revokeObjectURL(urls[index])
        }
      })
    }
  }, [value])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    const current = value ?? []

    const existing = current.filter(
      (item: File | string) => typeof item === "string",
    )
    const newFiles = files.slice(0, MAX_IMAGES - current.length)
    const updated = [
      ...existing,
      ...current.filter((f: File | string) => f instanceof File),
      ...newFiles,
    ]

    onChange(updated.slice(0, MAX_IMAGES))
    e.target.value = ""
  }

  const handleAddImagesClick = () => {
    if (value.length < MAX_IMAGES) {
      fileInputRef.current?.click()
    }
  }

  return (
    <div className="my-4">
      <label className="mb-2 block text-sm">Product Images</label>

      <div
        className={twMerge(
          "grid grid-cols-4 gap-3 bg-white p-3 ring-[1.5px] ring-neutral-400/60",
          error && "ring-red-500",
        )}
      >
        {[...Array(MAX_IMAGES)].map((_, index) => (
          <div
            key={index}
            className={twMerge(
              "flex aspect-square items-center justify-center overflow-hidden border border-dashed border-neutral-400/60 bg-neutral-50",
              error && "border-red-500",
            )}
          >
            {previewURLs[index] ? (
              <img
                src={previewURLs[index]}
                alt={`Product image ${index + 1}`}
                className="h-full w-full object-cover"
              />
            ) : (
              <span
                className={twMerge(
                  "text-xs text-neutral-400",
                  error && "text-red-500",
                )}
              >
                + Add
              </span>
            )}
          </div>
        ))}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileSelect}
      />

      {error && (
        <p className="mt-1 text-sm text-[13px] text-red-500">{error}</p>
      )}

      <div className="mt-3">
        <Button
          type="button"
          onClick={handleAddImagesClick}
          disabled={value.length >= MAX_IMAGES}
        >
          Add Images
        </Button>
      </div>
    </div>
  )
}

export default ProductImageInput
