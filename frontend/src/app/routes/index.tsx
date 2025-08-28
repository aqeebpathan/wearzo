import { useRoutes } from "react-router-dom"

import adminRoutes from "./adminRoutes"
import authRoutes from "./authRoutes"
import userRoutes from "./userRoutes"
import NotFoundPage from "@/pages/NotFoundPage"
import UnauthorizedPage from "@/pages/UnauthorizedPage"

const AppRoutes = () => {
  const routes = useRoutes([
    ...authRoutes,
    ...userRoutes,
    ...adminRoutes,
    { path: "*", element: <NotFoundPage /> },
    { path: "/unauthorized", element: <UnauthorizedPage /> },
  ])
  return routes
}

export default AppRoutes
