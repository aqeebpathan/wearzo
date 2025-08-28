import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

import Logo from "@/assets/logo.svg?react"
import { useAppSelector } from "@/app/hooks"
import EmailVerificationForm from "@/features/auth/components/VerifyEmailForm"

const VerifyEmailPage = () => {
  const navigate = useNavigate()

  const user = useAppSelector((state) => state.auth.user)

  useEffect(() => {
    if (user?.isVerified) {
      navigate("/")
    }
  }, [navigate, user?.isVerified])

  return (
    <main className="flex min-h-screen w-full items-center justify-center">
      <section className="m-4 w-full max-w-xs">
        <header>
          <Logo className="mb-6 size-11 text-neutral-900 select-none" />
          <h1 className="my-2 text-2xl font-semibold">Verify your email</h1>
          <p className="leading-tight text-neutral-500">
            We have sent verification code on{" "}
            <span className="font-medium text-[#101010] transition-all">
              {user && user?.email}
            </span>
          </p>
        </header>
        <EmailVerificationForm />
        <footer>
          <p className="text-sm">
            <span className="text-neutral-500">Didn't receive an email? </span>
            <Link to="#" className="hover:underline">
              Resend
            </Link>
          </p>
        </footer>
      </section>
    </main>
  )
}

export default VerifyEmailPage
