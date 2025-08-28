import { useForm } from "react-hook-form"

import { useSearchParams } from "react-router-dom"
import Input from "../../../shared/components/Input"
import Button from "../../../shared/components/Button"
import { useLoginMutation } from "../hooks/useLoginMutation"

type FormData = {
  email: string
  password: string
}

const LoginForm = () => {
  const [searchParams] = useSearchParams()
  const redirect = searchParams.get("redirect") || "#"

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>()

  const { login, isLoggingIn } = useLoginMutation(redirect)

  const onSubmit = (data: FormData) => {
    login(data)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-6 mb-4 w-full space-y-4"
      aria-label="Login Form"
    >
      <Input
        id="email"
        label="Email"
        type="email"
        placeholder="Enter your email"
        autoComplete="email"
        {...register("email", {
          required: "Email cannot be empty",
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: "Invalid email",
          },
        })}
        error={errors.email}
      />

      <Input
        id="password"
        type="password"
        label="Password"
        placeholder="Enter your password"
        autoComplete="current-password"
        {...register("password", {
          required: "Please enter password",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters",
          },
          // pattern: {
          //   value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/,
          //   message: "Password must contain letters and numbers",
          // },
        })}
        error={errors.password}
      />

      <div className="mt-6">
        <Button disabled={isLoggingIn}>
          {isLoggingIn ? "Logging in..." : "Log in"}
        </Button>
      </div>
    </form>
  )
}

export default LoginForm
