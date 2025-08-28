import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  CheckoutFormInput,
  checkoutSchema,
} from "../schemas/checkoutValidation.schema"
import PayPalButton from "./PayPalButton"
import Input from "@/shared/components/Input"
import Button from "@/shared/components/Button"
import { PayPalResponse } from "../types/checkout.types"

interface CheckoutFormProps {
  checkoutId: string
  onCreateCheckout: (data: CheckoutFormInput) => void
  onSuccess: (paymentDetails: PayPalResponse) => void
  amount: number
}

const CheckoutForm = ({
  checkoutId,
  onCreateCheckout,
  onSuccess,
  amount,
}: CheckoutFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormInput>({
    resolver: zodResolver(checkoutSchema),
  })

  const onSubmit = (data: CheckoutFormInput) => {
    onCreateCheckout(data)
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {/* First & Last Name */}
      <div className="inline-flex w-full gap-4 md:gap-6">
        <Input
          id="firstName"
          label="First Name"
          type="text"
          placeholder="e.g. John"
          autoComplete="given-name"
          {...register("firstName")}
          error={errors.firstName}
        />
        <Input
          id="lastName"
          label="Last Name"
          type="text"
          placeholder="e.g. Doe"
          autoComplete="family-name"
          {...register("lastName")}
          error={errors.lastName}
        />
      </div>

      {/* Address */}
      <Input
        id="address"
        label="Address"
        type="text"
        placeholder="Street address, apartment, etc."
        autoComplete="address-line1"
        {...register("address")}
        error={errors.address}
      />

      {/* Postal Code & City */}
      <div className="inline-flex w-full gap-4 md:gap-6">
        <Input
          id="postalCode"
          label="Postal Code"
          type="text"
          placeholder="e.g. 90210"
          autoComplete="postal-code"
          {...register("postalCode")}
          error={errors.postalCode}
        />
        <Input
          id="city"
          label="City"
          type="text"
          placeholder="e.g. New York"
          autoComplete="address-level2"
          {...register("city")}
          error={errors.city}
        />
      </div>

      {/* Country & Phone */}
      <div className="inline-flex w-full gap-4 md:gap-6">
        <Input
          id="country"
          label="Country"
          type="text"
          placeholder="e.g. United States"
          autoComplete="country"
          {...register("country")}
          error={errors.country}
        />
        <Input
          id="phone"
          label="Phone No."
          type="text"
          placeholder="e.g. +1 555 123 4567"
          autoComplete="tel"
          {...register("phone")}
          error={errors.phone}
        />
      </div>

      {/* Submit or PayPal */}
      <div className="mx-auto mt-4">
        {!checkoutId ? (
          <Button type="submit">Continue to Payment</Button>
        ) : (
          <PayPalButton
            amount={amount}
            onSuccess={onSuccess}
            onError={() => alert("Payment failed")}
          />
        )}
      </div>
    </form>
  )
}

export default CheckoutForm
