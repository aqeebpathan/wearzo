import { useState } from "react"
import { twMerge } from "tailwind-merge"
import { Link, useLocation, useNavigate } from "react-router-dom"

import SearchBar from "./components/SearchBar"

import MenuIcon from "@/assets/icons/menu.svg?react"
import CartIcon from "@/assets/icons/cart.svg?react"
import CloseIcon from "@/assets/icons/close.svg?react"
import ProfileIcon from "@/assets/icons/profile.svg?react"
import WishlistIcon from "@/assets/icons/wishlist.svg?react"

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const location = useLocation()
  const { pathname } = location
  const navigate = useNavigate()

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const redirectTo = (path: string) => {
    setMenuOpen(false)
    navigate(`/${path}`)
  }

  return (
    <nav className="overflow-x-hidden px-4 md:px-6 lg:px-12">
      <div className="mx-auto flex flex-row items-center justify-between py-2 md:flex-row md:py-0 2xl:container">
        {/* Mobile menu button */}
        <button
          onClick={toggleMenu}
          className="md:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <CloseIcon className="size-6" />
          ) : (
            <MenuIcon className="size-6" />
          )}
        </button>

        {/* Left navigation links for desktop */}
        <div className="hidden items-center justify-center gap-6 py-4 md:flex lg:gap-8">
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
        <div className="scrollbar-hide flex min-h-[38px] shrink-0 items-center justify-end gap-4 overflow-x-auto sm:gap-8 md:mt-0 lg:gap-6">
          <div className="flex items-center gap-4 whitespace-nowrap sm:gap-6">
            <div className="hidden sm:inline">
              <SearchBar />
            </div>
            <WishlistIcon className="icon flex-shrink-0" />
            <CartIcon
              className="icon flex-shrink-0"
              onClick={() => redirectTo("cart")}
            />
            <ProfileIcon
              className="icon flex-shrink-0"
              onClick={() => redirectTo("account/orders")}
            />
          </div>
        </div>
      </div>

      {/* Mobile menu panel  */}
      <div
        className={twMerge(
          "overflow-hidden transition-all duration-400 ease-in-out md:hidden",
          menuOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div>
          <div className="flex min-h-[38px] items-center justify-end">
            <SearchBar open={true} />
          </div>
          <div className="flex gap-6 py-2 pb-4">
            {navigationLinks.map(({ href, label }) => (
              <Link
                key={href}
                to={href}
                onClick={() => setMenuOpen(false)}
                className={twMerge(
                  "mt-1 block font-medium transition-colors duration-200 hover:text-black",
                  pathname === href ? "text-black" : "text-neutral-500",
                )}
              >
                {label}
              </Link>
            ))}
          </div>
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
