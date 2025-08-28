import type {
  CreateOrderActions,
  OnApproveActions,
  OnApproveData,
} from "@paypal/paypal-js"
import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js"

interface PayPalButtonProps {
  amount: number
  onSuccess: (details: OnApproveData) => void
  onError: (error: unknown) => void
}

const PayPalButtonInner = ({
  amount,
  onSuccess,
  onError,
}: PayPalButtonProps) => {
  const [{ isPending }] = usePayPalScriptReducer()

  return (
    <>
      {isPending ? (
        <div className="my-4 text-center">
          <p>Loading PayPal...</p>
        </div>
      ) : (
        <PayPalButtons
          style={{
            layout: "vertical",
            color: "blue",
            shape: "sharp",
            label: "pay",
            tagline: false,
            disableMaxWidth: true,
          }}
          createOrder={(_, actions: CreateOrderActions) => {
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  amount: {
                    value: amount.toFixed(2),
                    currency_code: "USD",
                  },
                },
              ],
            })
          }}
          onApprove={async (
            data: OnApproveData,
            actions: OnApproveActions,
          ): Promise<void> => {
            if (!actions.order) {
              return Promise.reject(
                new Error("PayPal order actions are undefined"),
              )
            }

            await actions.order.capture()
            onSuccess(data)
          }}
          onError={(err: unknown) => {
            onError(err)
          }}
        />
      )}
    </>
  )
}

const PayPalButton = (props: PayPalButtonProps) => {
  return (
    <PayPalScriptProvider
      options={{
        clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
      }}
    >
      <PayPalButtonInner {...props} />
    </PayPalScriptProvider>
  )
}

export default PayPalButton
