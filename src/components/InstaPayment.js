import React, { useState } from 'react';
import Instamojo from 'instamojo-nodejs';

const PaymentForm = () => {
  const [loading, setLoading] = useState(false);

  const instamojo = new Instamojo({
    apiKey: 'YOUR_API_KEY',
    authToken: 'YOUR_AUTH_TOKEN',
  });

  const createPaymentRequest = async () => {
    setLoading(true);

    try {
      const response = await instamojo.paymentRequestCreate({
        purpose: 'Payment for XYZ',
        amount: '10',
        buyer_name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '9876543210',
        send_email: true,
        send_sms: true,
        redirect_url: 'http://your-website.com/payment-success',
        webhook_url: 'http://your-website.com/payment-webhook',
      });

      window.location.href = response.payment_request.longurl;
    } catch (error) {
      console.error('Payment request creation failed:', error);
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Instamojo Payment Form</h1>
      <form onSubmit={createPaymentRequest}>
        <label>
          Purpose:
          <input type="text" name="purpose" />
        </label>
        <br />
        <label>
          Amount:
          <input type="number" name="amount" />
        </label>
        <br />
        <label>
          Name:
          <input type="text" name="buyer_name" />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" />
        </label>
        <br />
        <label>
          Phone:
          <input type="text" name="phone" />
        </label>
        <br />
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;