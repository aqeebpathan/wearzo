import { Outlet } from "react-router-dom"

import Header from "./Header"
import Footer from "./Footer"

const MainLayout = () => {
  return (
    <div className="mx-auto grid min-h-[100dvh] grid-rows-[auto_1fr_auto]">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
