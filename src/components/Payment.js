import React,{ useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import api from "../constants/api";
import PaymentForm from "./PaymentForm";


function Payment({amount,placeOrder}) {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentMethodId, setPaymentMethodId] = useState("");

  useEffect(() => {
    fetch("https://unitdecom.unitdtechnologies.com:3006/orders/config").then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
  
    api.post('/orders/create-payment-intent',{amount:amount}).then(async (result) => {
      const { clientSecret,paymentMethod } = await result.data;
      setClientSecret(clientSecret);
      setPaymentMethodId(paymentMethod);
      });
  }, [amount]);

  return (
    <>
      
      {clientSecret && stripePromise && 
     
      (
        <Elements 
         stripe={stripePromise} options={{ clientSecret }}
        >
          <CheckoutForm amount={amount} paymentMethod={paymentMethodId} placeOrder={placeOrder}/>
        </Elements>
      )}
    </>
  );
}
Payment.propTypes = {
  placeOrder: PropTypes.func,
  currency: PropTypes.object,
  amount: PropTypes.number
};
export default Payment;
