import { twMerge } from "tailwind-merge"
import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

const DEFAULT_PRICE_RANGE = [0, 70]

type FilterState = {
  category: string
  gender: string
  colors: string[]
  size: string[]
  material: string[]
  brand: string[]
  minPrice: number
  maxPrice: number
}

const ProductFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  const [filters, setFilters] = useState<FilterState>({
    category: "",
    gender: "",
    colors: [],
    size: [],
    material: [],
    brand: [],
    minPrice: DEFAULT_PRICE_RANGE[0],
    maxPrice: DEFAULT_PRICE_RANGE[1],
  })

  const [priceRange, setPriceRange] = useState(DEFAULT_PRICE_RANGE)

  useEffect(() => {
    const params = Object.fromEntries([...searchParams])

    setFilters({
      category: params.category || "",
      gender: params.gender || "",
      colors: params.colors ? params.colors.split(",") : [],
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: params.minPrice
        ? Number(params.minPrice)
        : DEFAULT_PRICE_RANGE[0],
      maxPrice: params.maxPrice
        ? Number(params.maxPrice)
        : DEFAULT_PRICE_RANGE[1],
    })

    setPriceRange([
      params.minPrice ? Number(params.minPrice) : DEFAULT_PRICE_RANGE[0],
      params.maxPrice ? Number(params.maxPrice) : DEFAULT_PRICE_RANGE[1],
    ])

    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [searchParams])

  useEffect(() => {
    const updatedParams = new URLSearchParams(searchParams.toString())

    // Delete only filter-related params (leave others like `search`, `sort`)
    const filterKeys = [
      "category",
      "gender",
      "colors",
      "size",
      "material",
      "brand",
      "minPrice",
      "maxPrice",
    ]
    filterKeys.forEach((key) => updatedParams.delete(key))

    //  Add current filter values
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        updatedParams.set(key, value.join(","))
      } else if (typeof value === "string" && value !== "") {
        updatedParams.set(key, value)
      } else if (typeof value === "number") {
        if (
          (key === "minPrice" && value !== DEFAULT_PRICE_RANGE[0]) ||
          (key === "maxPrice" && value !== DEFAULT_PRICE_RANGE[1])
        ) {
          updatedParams.set(key, String(value))
        }
      }
    })

    setSearchParams(updatedParams)
    navigate(`?${updatedParams.toString()}`, { replace: true })
  }, [filters, searchParams, navigate, setSearchParams])

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target

    setFilters((prev) => {
      const key = name as keyof FilterState

      if (type === "checkbox") {
        const current = new Set((prev[key] as string[]) || [])
        if (checked) {
          current.add(value)
        } else {
          current.delete(value)
        }

        return { ...prev, [key]: Array.from(current) }
      } else {
        return { ...prev, [key]: value }
      }
    })
  }

  const handleColorClick = (color: string) => {
    setFilters((prev) => {
      const current = new Set(prev.colors)
      if (current.has(color)) {
        current.delete(color)
      } else {
        current.add(color)
      }
      return { ...prev, colors: Array.from(current) }
    })
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Number(e.target.value)
    setPriceRange([DEFAULT_PRICE_RANGE[0], newMax])

    setFilters((prev) => ({
      ...prev,
      minPrice: DEFAULT_PRICE_RANGE[0],
      maxPrice: newMax,
    }))
  }

  return (
    <div className="">
      <h3 className="my-4 mb-6 text-2xl leading-tight font-semibold">
        Filters
      </h3>

      {/* Category */}
      <div className="mb-6">
        <h3 className="font-medium">Category</h3>
        {categories.map((category) => (
          <label
            key={category}
            className="flex w-fit cursor-pointer items-center"
          >
            <input
              type="radio"
              name="category"
              value={category}
              checked={filters.category === category}
              onChange={handleFilterChange}
              className="mr-2 h-4 w-4 cursor-pointer"
            />
            <span>{category}</span>
          </label>
        ))}
      </div>

      {/* Gender */}
      <div className="mb-6">
        <h3 className="font-medium">Gender</h3>
        {genders.map((gender) => (
          <label
            key={gender}
            className="flex w-fit cursor-pointer items-center"
          >
            <input
              type="radio"
              name="gender"
              value={gender}
              checked={filters.gender === gender}
              onChange={handleFilterChange}
              className="mr-2 h-4 w-4 cursor-pointer"
            />
            <span>{gender}</span>
          </label>
        ))}
      </div>

      {/* Colors */}
      <div className="mb-6">
        <h3 className="font-medium">Colors</h3>
        <div className="mt-1 flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => handleColorClick(color)}
              className={twMerge(
                "h-8 w-8 cursor-pointer rounded-full border border-gray-300 transition",
                filters.colors.includes(color) && "ring-2 ring-blue-500",
              )}
              style={{ backgroundColor: color.toLowerCase() }}
            />
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div className="mb-6">
        <h3 className="font-medium">Size</h3>
        {sizes.map((size) => (
          <label key={size} className="flex w-fit cursor-pointer items-center">
            <input
              type="checkbox"
              name="size"
              value={size}
              checked={filters.size.includes(size)}
              onChange={handleFilterChange}
              className="mr-2 h-4 w-4 cursor-pointer"
            />
            <span>{size}</span>
          </label>
        ))}
      </div>

      {/* Materials */}
      <div className="mb-6">
        <h3 className="font-medium">Material</h3>
        {materials.map((material) => (
          <label
            key={material}
            className="flex w-fit cursor-pointer items-center"
          >
            <input
              type="checkbox"
              name="material"
              value={material}
              checked={filters.material.includes(material)}
              onChange={handleFilterChange}
              className="mr-2 h-4 w-4 cursor-pointer"
            />
            <span>{material}</span>
          </label>
        ))}
      </div>

      {/* Brands */}
      <div className="mb-6">
        <h3 className="font-medium">Brand</h3>
        {brands.map((brand) => (
          <label key={brand} className="flex w-fit cursor-pointer items-center">
            <input
              type="checkbox"
              name="brand"
              value={brand}
              checked={filters.brand.includes(brand)}
              onChange={handleFilterChange}
              className="mr-2 h-4 w-4 cursor-pointer"
            />
            <span>{brand}</span>
          </label>
        ))}
      </div>

      {/* Price Range */}
      <div>
        <label>Price Range</label>
        <input
          type="range"
          min={DEFAULT_PRICE_RANGE[0]}
          max={DEFAULT_PRICE_RANGE[1]}
          value={priceRange[1]}
          onChange={handlePriceChange}
          className="w-full accent-black"
        />
        <div className="mt-2 flex justify-between">
          <span>${DEFAULT_PRICE_RANGE[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </div>
  )
}

const categories = ["Top Wear", "Bottom Wear"]
const colors = [
  "red",
  "Blue",
  "Black",
  "Green",
  "Yellow",
  "Gray",
  "white",
  "Pink",
  "Beige",
  "Navy",
]
const sizes = ["XS", "S", "M", "L", "XL", "XXL"]
const materials = [
  "Cotton",
  "Wool",
  "Denim",
  "Polyester",
  "Silk",
  "Linen",
  "Viscose",
  "Fleece",
]
const brands = [
  "StudioForm",
  "UrbanFlex",
  "UrbanEase",
  "FieldCore",
  "UrbanVibe",
  "ChicSty1e",
]
const genders = ["Men", "Women"]

export default ProductFilter
