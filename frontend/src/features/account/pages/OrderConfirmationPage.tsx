import { useAppSelector } from "@/app/hooks"
import SuccessIcon from "@/assets/icons/tick-circle.svg?react"
import { Link } from "react-router-dom"

const OrderConfirmationPage = () => {
  const user = useAppSelector((store) => store.auth.user)

  return (
    <section className="flex min-h-[calc(100vh-96px)] items-center justify-center px-4 md:px-6 lg:px-12">
      <div className="max-w-xl text-center">
        <SuccessIcon className="mx-auto mb-6 size-20 text-green-500" />
        <h1 className="text-3xl font-semibold text-gray-800">
          Thank you for your order
        </h1>
        <div className="mt-6">
          <h2 className="text-xl font-medium text-gray-700">
            Order confirmed, {user?.username}!
          </h2>
          <p className="mt-2 text-gray-600">
            Your order details{" "}
            <Link
              to="/account"
              className="cursor-pointer font-medium text-blue-600 underline"
            >
              #123126
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default OrderConfirmationPage
