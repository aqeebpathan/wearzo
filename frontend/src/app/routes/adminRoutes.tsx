import { Navigate } from "react-router-dom"

import AdminLayout from "../../layout/AdminLayout"
import AdminRoute from "@/shared/guards/AdminRoute"
import DashboardPage from "@/features/admin/dashboard/pages/DashboardPage"
import EditProductPage from "@/features/admin/productManagement/pages/EditProductPage"
import UserManagementPage from "@/features/admin/userManagement/pages/UserManagementPage"
import CreateProductPage from "@/features/admin/productManagement/pages/CreateProductPage"
import OrderManagementPage from "@/features/admin/orderManagement/pages/OrderManagementPage"
import ProductManagementPage from "@/features/admin/productManagement/pages/ProductManagementPage"

const adminRoutes = [
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      { index: true, element: <Navigate replace to="dashboard" /> },
      { path: "dashboard", element: <DashboardPage /> },
      { path: "users", element: <UserManagementPage /> },
      { path: "orders", element: <OrderManagementPage /> },
      { path: "products", element: <ProductManagementPage /> },
      { path: "products/create", element: <CreateProductPage /> },
      { path: "products/:productId/edit", element: <EditProductPage /> },
    ],
  },
]

export default adminRoutes
