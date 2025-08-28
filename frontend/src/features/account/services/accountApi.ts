import { httpClient } from "@/shared/api/httpClient"

export const fetchOrders = async () => {
  const { data } = await httpClient.get(`/orders`)

  return data
}

export const fetchProfile = async () => {
  const { data } = await httpClient.get(`/user/profile`)

  return data
}

export const updateUserPassword = async () => {}
