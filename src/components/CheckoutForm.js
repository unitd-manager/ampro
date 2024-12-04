import React,{ useState } from "react";
import PropTypes from 'prop-types'
import { useStripe, useElements,PaymentElement } from "@stripe/react-stripe-js";
import GooglePayButton from '@google-pay/button-react' 

export default function CheckoutForm({amount,placeOrder,paymentMethod}) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
 const [isProcessing, setIsProcessing] = useState(false);


const [error, setError] = useState(null);
const [success, setSuccess] = useState(false);


const handleSubmit = async (event) => {
  event.preventDefault();

  if (!stripe || !elements) {
    // Stripe.js has not yet loaded.
    // Make sure to disable form submission until Stripe.js has loaded.
    return;
  }

  const { error} = await stripe.confirmPayment({
    elements:elements, 
    redirect: "if_required",
    payment_method: {
      google_pay: true,
    }, }
  );


  if (error) {
    setError(error.message);
    setSuccess(false);
    const orderStatus='Due'
    await placeOrder(orderStatus);
  } 
  else {
    
    setError(null);
    setSuccess(true);
    const orderStatus='Paid'
    await placeOrder(orderStatus);
    // Use the paymentMethod object to make a payment request to your server.
    // You can send the paymentMethod.id to your server to complete the payment.
    console.log(paymentMethod);
      setIsProcessing(false);
  }
};
 
  return (
    <form id="payment-form" onSubmit={handleSubmit}>
 <GooglePayButton
  environment="TEST"
  paymentRequest={{
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: 'CARD',
        parameters: {
          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
          allowedCardNetworks: ['MASTERCARD', 'VISA'],
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: {
            gateway: 'example',
            gatewayMerchantId: 'exampleGatewayMerchantId',
          },
        },
      },
    ],
    merchantInfo: {
      merchantId: '12345678901234567890',
      merchantName: 'Demo Merchant',
    },
    transactionInfo: {
      totalPriceStatus: 'FINAL',
      totalPriceLabel: 'Total',
      totalPrice: '100.00',
      currencyCode: 'USD',
      countryCode: 'US',
    },
  }}
  onLoadPaymentData={paymentRequest => {
    console.log('load payment data', paymentRequest);
  }}
/>
      <PaymentElement id="payment-element" />
      {/* <CardElement/> */}
      <button className="paybutton" disabled={isProcessing || !stripe || !elements} id="submit" >
        <span id="button-text">
          {isProcessing ? "Processing ... " : "Pay now"}
        </span>
      </button>
      
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}

CheckoutForm.propTypes = {
  placeOrder: PropTypes.func,
  currency: PropTypes.object,
  amount: PropTypes.number
};