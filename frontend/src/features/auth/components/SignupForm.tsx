import { useForm } from "react-hook-form"

import Input from "@/shared/components/Input"
import Button from "../../../shared/components/Button"
import { useSignupMutation } from "../hooks/useSignupMutation"

type FormData = {
  email: string
  username: string
  password: string
}

const SignupForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>()

  const { signup, isSigningUp } = useSignupMutation()

  const onSubmit = (data: FormData) => {
    signup(data)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-6 mb-4 space-y-4"
      aria-label="Signup Form"
    >
      {/* Name */}
      <Input
        id="username"
        label="Full Name"
        type="text"
        placeholder="Full Name"
        autoComplete="name"
        aria-label="Full Name"
        {...register("username", {
          required: "Name cannot be empty",
          minLength: {
            value: 3,
            message: "Name must be at least 3 characters long",
          },
        })}
        error={errors.username}
        disabled={isSigningUp}
      />

      {/* Email */}
      <Input
        id="email"
        label="Email"
        type="email"
        placeholder="Your email address"
        autoComplete="email"
        aria-label="Email Address"
        {...register("email", {
          required: "Email cannot be empty",
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: "Please enter a valid email address",
          },
        })}
        error={errors.email}
        disabled={isSigningUp}
      />

      {/* Password */}
      <Input
        id="password"
        type="password"
        label="Password"
        placeholder="Create a password"
        autoComplete="current-password"
        aria-label="Password"
        {...register("password", {
          required: "Password cannot be empty",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters long",
          },
          pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/,
            message: "Password must contain both letters and numbers",
          },
        })}
        error={errors.password}
        disabled={isSigningUp}
      />

      <div className="mt-6">
        <Button disabled={isSigningUp}>
          {isSigningUp ? "Signing up..." : "Sign up"}
        </Button>
      </div>
    </form>
  )
}

export default SignupForm
