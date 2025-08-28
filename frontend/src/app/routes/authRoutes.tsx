import LoginPage from "@/features/auth/pages/LoginPage"
import SignupPage from "@/features/auth/pages/SignupPage"
import PrivateRoute from "@/shared/guards/ProtectedRoute"
import VerifyEmailPage from "@/features/auth/pages/VerifyEmailPage"
import ForgotPasswordPage from "@/features/auth/pages/ForgotPasswordPage"

const authRoutes = [
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignupPage /> },
  {
    path: "/verify-email",
    element: (
      <PrivateRoute>
        <VerifyEmailPage />
      </PrivateRoute>
    ),
  },
  { path: "/forgot-password", element: <ForgotPasswordPage /> },
]

export default authRoutes
