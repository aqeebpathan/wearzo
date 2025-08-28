import { Link } from "react-router-dom"

import BackIcon from "@/assets/icons/back.svg?react"

const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center">
      <h1 className="text-8xl font-bold text-[#101010]">404</h1>
      <h2 className="mt-2 text-xl font-semibold text-[#101010]">
        Oops! We can't find that page.
      </h2>
      <p className="text my-1 text-neutral-500">
        The page you’re looking for might have been removed or is temporarily
        unavailable.
      </p>
      <Link
        to="/"
        className="my-5 flex cursor-pointer items-center gap-2 rounded-xl bg-[#101010] px-4 py-2 text-white transition-colors hover:bg-[#101010]/80"
      >
        <BackIcon /> Back to shopping
      </Link>
    </div>
  )
}

export default NotFoundPage
