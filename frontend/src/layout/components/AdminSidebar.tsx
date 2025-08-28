import { twMerge } from "tailwind-merge"
import { Link, NavLink } from "react-router-dom"

import Logo from "@/assets/logo.svg?react"
import UsersIcon from "@/assets/icons/users.svg?react"
import LogoutIcon from "@/assets/icons/logout.svg?react"
import OrdersIcon from "@/assets/icons/orders.svg?react"
import ProductsIcon from "@/assets/icons/product.svg?react"
import DashboardIcon from "@/assets/icons/dashboard.svg?react"

const AdminSidebar = () => {
  return (
    <aside className="flex min-h-screen w-fit flex-col bg-[#101010] text-[#fcfcfc] md:w-56 xl:w-64">
      <header className="flex w-full items-center justify-start px-4 pt-6 pb-4">
        <h2 className="flex gap-2 text-2xl font-semibold">
          <Link to="/" className="flex items-center gap-2">
            <Logo className="my-0.5 size-7" />
            <span className="hidden md:inline-block">WEARZO</span>
            {/* <span className="-ml-0.5 text-[11px] font-medium">Admin</span> */}
          </Link>
        </h2>
      </header>
      <nav className="flex h-full flex-col overflow-y-auto py-2 shadow-sm">
        <div className="flex-1 space-y-1">
          {sidebarLinks.map(({ Icon, label, path }) => (
            <NavLink
              key={label}
              to={path}
              className={({ isActive }) =>
                twMerge(
                  "flex items-center gap-0 px-4 py-2 transition-colors md:gap-2",
                  isActive && "bg-[#fcfcfc] text-[#101010]",
                )
              }
            >
              <Icon className="size-6" />
              <span className="hidden md:block md:w-36">{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      <footer className="py-5">
        <button className="flex cursor-pointer items-center gap-0 px-4 py-2 transition-colors md:gap-2">
          <LogoutIcon className="size-6" />
          <span className="hidden md:block">Logout</span>
        </button>
      </footer>
    </aside>
  )
}

const sidebarLinks = [
  { Icon: DashboardIcon, label: "Dashboard", path: "dashboard" },
  { Icon: UsersIcon, label: "Users", path: "users" },
  { Icon: ProductsIcon, label: "Products", path: "products" },
  { Icon: OrdersIcon, label: "Orders", path: "orders" },
]

export default AdminSidebar
