import { httpClient } from "@/shared/api/httpClient"
import { ProductResponse, ProductsResponse } from "../types/products.types"

// Fetch all products with query params
export const fetchProducts = async (
  params: Record<string, string>,
): Promise<ProductsResponse> => {
  const query = new URLSearchParams(params).toString()
  const { data } = await httpClient.get<ProductsResponse>(`/products?${query}`)
  return data
}

// Fetch product by ID
export const fetchProductById = async (
  id: string,
): Promise<ProductResponse> => {
  const { data } = await httpClient.get<ProductResponse>(`/products/${id}`)
  return data
}

// Fetch similar products
export const fetchSimilarProducts = async (
  id: string,
): Promise<ProductsResponse> => {
  const { data } = await httpClient.get<ProductsResponse>(
    `/products/similar/${id}`,
  )
  return data
}

// Fetch best-seller product
export const fetchBestSellerProduct = async (): Promise<ProductResponse> => {
  const { data } = await httpClient.get<ProductResponse>(
    "/products/best-seller",
  )
  return data
}

// Fetch new-arrival products
export const fetchNewArrivalProducts = async (): Promise<ProductsResponse> => {
  const { data } = await httpClient.get<ProductsResponse>(
    "/products/new-arrivals",
  )
  return data
}
