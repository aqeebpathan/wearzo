// Product entity
export interface Product {
  _id: string
  name: string
  description: string
  price: number
  discountPrice: number
  countInStock: number
  sku: string
  category: string
  brand: string
  sizes: string[]
  colors: string[]
  collections: string
  material: string
  gender: string
  isFeatured: boolean
  isPublished: boolean
  tags: string[]
  images: ProductImage[]
}

export interface ProductImage {
  url: string
  altText: string
  _id: string
}

// Generic API response wrapper
export interface ApiResponse<T> {
  status: boolean
  message: string
  data: T
}

// Specific response types
export type ProductResponse = ApiResponse<Product>
export type ProductsResponse = ApiResponse<Product[]>

// DTOs
export type CreateProductDto = Omit<Product, "_id">
export type UpdateProductDto = Partial<Omit<Product, "id">> & { _id: string }
