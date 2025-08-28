import { twMerge } from "tailwind-merge"
import { NavLink } from "react-router-dom"

import OrderIcon from "@/assets/icons/truck.svg?react"
import LogoutIcon from "@/assets/icons/logout.svg?react"
import ProfileIcon from "@/assets/icons/profile-card.svg?react"
import ChangePasswordIcon from "@/assets/icons/padlock.svg?react"
import { useLogoutMutation } from "@/features/auth/hooks/useLogoutMutation"

const Sidebar = () => {
  const { logout, isPending } = useLogoutMutation()
  return (
    // <aside className="sticky top-0 min-h-screen w-64">
    <nav className="h-full">
      <ul className="space-y-1">
        {sidebarNavLinks.map(({ icon: Icon, label, to }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                twMerge(
                  "transition-color flex items-center gap-1.5 px-2 py-2",
                  isActive && "bg-[#101010] text-[#FCFCFC]",
                )
              }
            >
              <Icon className="size-5" />{" "}
              <span className="hidden md:inline">{label}</span>
            </NavLink>
          </li>
        ))}
        <li>
          <button
            onClick={() => logout()}
            disabled={isPending}
            className="flex cursor-pointer items-center gap-1.5 px-2 py-2 text-red-600 hover:text-red-800"
          >
            <LogoutIcon className="size-5" />
            <span className="hidden md:inline">Log out</span>
          </button>
        </li>
      </ul>
    </nav>
    // </aside>
  )
}

const sidebarNavLinks = [
  {
    to: "orders",
    label: "My Orders",
    icon: OrderIcon,
  },
  {
    to: "info",
    label: "Account Info",
    icon: ProfileIcon,
  },

  {
    to: "change-password",
    label: "Change Password",
    icon: ChangePasswordIcon,
  },
]

export default Sidebar
