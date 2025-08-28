import { Link } from "react-router-dom"

import Logo from "@/assets/logo.svg?react"
import SignupForm from "@/features/auth/components/SignupForm"

const SignupPage = () => {
  return (
    <main className="flex min-h-screen w-full items-center justify-center">
      <section className="m-4 max-w-xs">
        <header>
          <Logo className="mb-6 size-11 text-[#101010] select-none" />

          <h1 className="my-2 text-2xl font-semibold">Sign up for Wearzo</h1>
          <p className="leading-tight text-neutral-500">
            Create an account for a seamless shopping experience.
          </p>
        </header>

        <SignupForm />

        <footer>
          <p className="text-sm">
            <span className="text-neutral-500">Already have an account? </span>
            <Link to="/login" className="hover:underline">
              Log in
            </Link>
          </p>
        </footer>
      </section>
    </main>
  )
}

export default SignupPage
