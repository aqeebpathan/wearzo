import { twMerge } from "tailwind-merge"
import { Link, useLocation, useNavigate } from "react-router-dom"

import SearchBar from "./components/SearchBar"
import CartIcon from "@/assets/icons/cart.svg?react"
import ProfileIcon from "@/assets/icons/profile.svg?react"
import WishlistIcon from "@/assets/icons/wishlist.svg?react"

const Navbar = () => {
  const location = useLocation()
  const { pathname } = location
  const navigate = useNavigate()

  const redirectTo = (path: string) => {
    navigate(`/${path}`)
  }

  return (
    <nav className="px-4 md:px-6 lg:px-12">
      <div className="mx-auto flex flex-col-reverse justify-between md:flex-row 2xl:container">
        {/* Left navigation links */}
        <div className="flex items-center justify-center gap-6 py-4 lg:gap-8">
          {navigationLinks.map(({ href, label }) => (
            <Link
              key={href}
              to={href}
              className={twMerge(
                "font-medium transition-colors duration-300 hover:text-black",
                pathname === href ? "text-black" : "text-neutral-500",
              )}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right action buttons */}
        <div className="mt-6 flex min-h-[38px] shrink-0 items-center justify-center gap-4 sm:gap-8 md:mt-0 lg:gap-6">
          <SearchBar />
          <WishlistIcon className="icon" />
          <CartIcon className="icon" onClick={() => redirectTo("cart")} />
          <ProfileIcon
            className="icon"
            onClick={() => redirectTo("account/orders")}
          />
        </div>
      </div>
    </nav>
  )
}

const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "Men", href: "/collections/all?gender=Men" },
  { label: "Women", href: "/collections/all?gender=Women" },
  { label: "Collections", href: "/collections/all" },
]

export default Navbar
