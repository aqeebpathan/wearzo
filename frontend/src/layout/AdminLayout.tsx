import { Outlet } from "react-router-dom"

import AdminSidebar from "./components/AdminSidebar"

const AdminLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden border-[#101010] 2xl:container 2xl:mx-auto 2xl:border-r">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content area */}
      <main className="flex flex-1 flex-col overflow-y-auto bg-white">
        <div className="w-full flex-1 px-6 py-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default AdminLayout
