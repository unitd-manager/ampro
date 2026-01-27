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
      
      {/* Test Card Details */}
      <div style={{
        marginTop: '30px',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        border: '1px solid #e0e0e0',
      }}>
        <h4 style={{
          margin: '0 0 15px 0',
          fontSize: '14px',
          fontWeight: '600',
          color: '#333',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}>
          Test Card Details
        </h4>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px',
        }}>
          <div>
            <p style={{ margin: '0 0 6px 0', fontSize: '12px', color: '#666', fontWeight: '500' }}>
              Card Number
            </p>
            <p style={{ margin: '0', fontSize: '14px', color: '#222', fontFamily: 'monospace', fontWeight: '600' }}>
              4242 4242 4242 4242
            </p>
          </div>
          <div>
            <p style={{ margin: '0 0 6px 0', fontSize: '12px', color: '#666', fontWeight: '500' }}>
              CVC
            </p>
            <p style={{ margin: '0', fontSize: '14px', color: '#222', fontFamily: 'monospace', fontWeight: '600' }}>
              Any 3 digits
            </p>
          </div>
          <div>
            <p style={{ margin: '0 0 6px 0', fontSize: '12px', color: '#666', fontWeight: '500' }}>
              Expiry Date
            </p>
            <p style={{ margin: '0', fontSize: '14px', color: '#222', fontFamily: 'monospace', fontWeight: '600' }}>
              Any future date
            </p>
          </div>
          <div>
            <p style={{ margin: '0 0 6px 0', fontSize: '12px', color: '#666', fontWeight: '500' }}>
              Postal Code
            </p>
            <p style={{ margin: '0', fontSize: '14px', color: '#222', fontFamily: 'monospace', fontWeight: '600' }}>
              Any 5 digits
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PaymentForm;