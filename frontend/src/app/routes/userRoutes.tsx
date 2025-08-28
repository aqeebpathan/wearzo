import MainLayout from "@/layout/MainLayout"
import HomePage from "@/features/home/pages/HomePage"
import CartPage from "@/features/cart/pages/CartPage"
import PrivateRoute from "@/shared/guards/ProtectedRoute"
import OrdersPage from "@/features/account/pages/OrdersPage"
import ProfilePage from "@/features/account/pages/ProfilePage"
import CheckoutPage from "@/features/checkout/pages/CheckoutPage"
import CollectionPage from "@/features/products/pages/CollectionPage"
import AccountLayout from "@/features/account/components/AccountLayout"
import ChangePasswordPage from "@/features/account/pages/ChangePasswordPage"
import ProductDetailsPage from "@/features/products/pages/ProductDetailsPage"
import OrderConfirmationPage from "@/features/account/pages/OrderConfirmationPage"

const userRoutes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "account",
        element: (
          <PrivateRoute>
            <AccountLayout />
          </PrivateRoute>
        ),
        children: [
          { path: "info", element: <ProfilePage /> },
          { path: "orders", element: <OrdersPage /> },
          { path: "change-password", element: <ChangePasswordPage /> },
        ],
      },
      {
        path: "checkout",
        element: (
          <PrivateRoute>
            <CheckoutPage />
          </PrivateRoute>
        ),
      },
      { path: "product/:productId", element: <ProductDetailsPage /> },
      { path: "checkout/success", element: <OrderConfirmationPage /> },
      { path: "collections/:colelction", element: <CollectionPage /> },
    ],
  },
]

export default userRoutes
