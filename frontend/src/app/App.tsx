import { BrowserRouter as Router } from "react-router-dom"
import { Toaster } from "sonner"

import AppRoutes from "./routes"
import { useAuthQuery } from "@/features/auth/hooks/useAuthQuery"

function App() {
  useAuthQuery()
  return (
    <>
      <Router>
        <AppRoutes />
      </Router>
      <Toaster position="top-center" richColors />
    </>
  )
}

export default App
