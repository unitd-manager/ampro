import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentForm from "./PaymentForm"

const PUBLIC_KEY = "pk_test_51SsQL3PZE5qSvArDSfmCI2XrcGcxlhkSl2BjYJOUqUODwbGPsrtbpWaIhwsqwaaA7886QCTtEOFb38cQruMQPily00PEXleFIN"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer({ onPaymentSuccess }) {
	return (
		<Elements stripe={stripeTestPromise}>
			<PaymentForm onPaymentSuccess={onPaymentSuccess} />
		</Elements>
	)
}
