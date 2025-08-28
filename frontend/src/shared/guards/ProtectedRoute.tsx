import { RootState } from "@/app/store"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthLoading } = useSelector((state: RootState) => state.auth)

  if (isAuthLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <span className="text-sm text-neutral-500">Authenticating...</span>
      </div>
    )
  }

  if (!user) return <Navigate to="/login" replace />

  return children
}

export default PrivateRoute
