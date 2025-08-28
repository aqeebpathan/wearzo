export interface LowStockProduct {
  id: string
  name: string
  countInStock: number
}

export interface DashboardStats {
  revenue: number
  totalUsers: number
  totalOrders: number
  lowStockCount: number
  newUsersThisWeek: number
  lowStockProducts: LowStockProduct[]
}

export interface DashboardResponse {
  success: boolean
  message: string
  data: DashboardStats
}
