import { httpClient } from "@/shared/api/httpClient"
import { DashboardResponse } from "../types/dashboard.types"

export const fetchDashboardStats = async (): Promise<DashboardResponse> => {
  const { data } = await httpClient.get<DashboardResponse>(
    "/admin/stats/overview",
  )
  return data
}
