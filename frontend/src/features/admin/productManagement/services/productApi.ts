import { httpClient } from "@/shared/api/httpClient"
import {
  CreateProductDto,
  ProductResponse,
  ProductsResponse,
  UpdateProductDto,
  ApiResponse,
} from "../types/product.types"

// Fetch all products
export const fetchProducts = async (): Promise<ProductsResponse> => {
  const { data } = await httpClient.get<ProductsResponse>("/admin/products")
  return data
}

// Fetch product by ID
export const fetchProductById = async (
  id: string,
): Promise<ProductResponse> => {
  const { data } = await httpClient.get<ProductResponse>(`/products/${id}`)
  return data
}

// Create a new product
export const createProduct = async (
  input: CreateProductDto,
): Promise<ProductResponse> => {
  const { data } = await httpClient.post<ProductResponse>(
    "/admin/products",
    input,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  )
  return data
}

// Update an existing product
export const updateProduct = async (
  input: UpdateProductDto,
): Promise<ProductResponse> => {
  const { _id, ...body } = input
  const { data } = await httpClient.patch<ProductResponse>(
    `/products/${_id}`,
    body,
  )
  return data
}

// Delete a product by ID
export const deleteProduct = async (id: string): Promise<ApiResponse<null>> => {
  const { data } = await httpClient.delete<ApiResponse<null>>(`/products/${id}`)
  return data
}
