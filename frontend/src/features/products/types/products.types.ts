// Sub-types
export interface ProductImage {
  _id: string
  url: string
  altText: string
}

// Core entity
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
  images: ProductImage[]
  isFeatured: boolean
  isPublished: boolean
  rating: number
  numReview: number
  tags: string[]
  user: string
  createdAt: string
  updatedAt: string
}

// DTOs
export type CreateProductDto = Omit<Product, "_id" | "createdAt" | "updatedAt">

export interface UpdateProductDto {
  id: string
  updatedProduct: Partial<Product>
}

// Generic API response
export interface ApiResponse<T> {
  status: boolean
  message: string
  data: T
}

// API responses
export type ProductResponse = ApiResponse<Product>
export type ProductsResponse = ApiResponse<Product[]>
