import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const PaymentForm = ({ onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setError(error.message);
      setSuccess(false);
    } else {
      setError(null);
      setSuccess(true);
      if (onPaymentSuccess) {
        onPaymentSuccess(paymentMethod);
      }
      // Use the paymentMethod object to make a payment request to your server.
      // You can send the paymentMethod.id to your server to complete the payment.
      console.log(paymentMethod);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Card details
          <div>
            <CardElement options={{
              style: {
                base: {
                  fontSize: '18px',
                  color: '#222',
                  backgroundColor: '#fff',
                  letterSpacing: '0.025em',
                  fontFamily: 'inherit',
                  '::placeholder': { color: '#aab7c4' },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }} />
          </div>
        </label>
      </div>
      {error && <div className="payment-error">{error}</div>}
      {success && <div className="payment-success">Payment successful!</div>}
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

export default PaymentForm;