import { Outlet } from "react-router-dom"

import Sidebar from "./Sidebar"

const AccountLayout = () => {
  return (
    <div className="min-h-screen px-4 pb-4 md:px-6 md:pb-6 lg:px-12 lg:pb-12">
      <h3 className="mx-auto my-4 text-2xl font-semibold sm:text-[26px] 2xl:container">
        My Account
      </h3>
      <div className="mx-auto mt-8 flex gap-4 md:gap-8 lg:gap-12 2xl:container">
        <aside className="sticky top-12 h-screen flex-shrink-0 md:w-64">
          <Sidebar />
        </aside>

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AccountLayout
