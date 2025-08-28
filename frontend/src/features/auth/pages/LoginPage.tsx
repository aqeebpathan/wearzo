import { Link } from "react-router-dom"

import Logo from "@/assets/logo.svg?react"
import LoginForm from "@/features/auth/components/LoginForm"

const LoginPage = () => {
  return (
    <main className="flex min-h-screen w-full items-center justify-center">
      <section className="m-4 max-w-xs">
        <header>
          {/* <img
            src={logo}
            alt=""
            className="z-50 mb-4 -ml-0.5 aspect-square size-12 select-none"
          /> */}
          <Logo className="mb-6 size-11 text-neutral-900 select-none" />
          <h1 className="my-2 text-2xl font-semibold text-[#101010]">
            Login to Wearzo
          </h1>
          <p className="leading-tight text-neutral-500">
            Enter your details to continue your shopping journey.
          </p>
        </header>

        <LoginForm />

        <footer>
          <p className="text-sm">
            <span className="text-neutral-500"> Don't have an account? </span>
            <Link to="/signup" className="hover:underline">
              Sign up
            </Link>
          </p>
        </footer>
      </section>
    </main>
  )
}

export default LoginPage
