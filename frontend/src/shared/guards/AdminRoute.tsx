import { Navigate } from "react-router-dom"

import { RootState } from "@/app/store"
import { useAppSelector } from "@/app/hooks"

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthLoading } = useAppSelector(
    (state: RootState) => state.auth,
  )

  if (isAuthLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-transparent">
        <span className="animate-pulse text-xl text-neutral-500">
          Checking permissions...
        </span>
      </div>
    )
  }

  if (!user) return <Navigate to="/login" replace />
  if (user.role !== "admin") return <Navigate to="/unauthorized" replace />

  return children
}

export default AdminRoute
