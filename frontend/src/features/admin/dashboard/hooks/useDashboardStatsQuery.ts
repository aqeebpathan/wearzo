import { useQuery } from "@tanstack/react-query"

import { fetchDashboardStats } from "../services/dashboardApi"

export const useDashboardStatsQuery = () => {
  const {
    data: response,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: fetchDashboardStats,
  })

  return {
    stats: response?.data,
    isPending,
    isError,
    error,
  }
}
