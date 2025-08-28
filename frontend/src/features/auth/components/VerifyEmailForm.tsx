import { useForm } from "react-hook-form"

import Input from "@/shared/components/Input"
import Button from "@/shared/components/Button"
import { useVerifyEmailMutation } from "../hooks/useVerifyEmailMutation"

type FormData = {
  code: string
}

const EmailVerificationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const { verifyEmail, isPending } = useVerifyEmailMutation()

  const onSubmit = (data: FormData) => {
    const { code } = data
    verifyEmail(code)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-6 mb-4 space-y-4"
      aria-label="Email Verification Form"
    >
      <Input
        id="verification-code"
        label="Verification Code"
        type="text"
        placeholder="Enter verification code"
        {...register("code", {
          required: "Verification code is required",
          minLength: {
            value: 6,
            message: "Verification code must be at least 6 characters long",
          },
        })}
        error={errors.code}
      />
      <Button disabled={isPending}>
        {isPending ? "Verifying..." : "Verify email"}
      </Button>
    </form>
  )
}

export default EmailVerificationForm
