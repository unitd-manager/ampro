import React from 'react';
import Instamojo from 'instamojo-nodejs';

const PaymentForm = () => {
  const API_KEY = 'test_6e629bcc37b5acd817c375d332b';
  const AUTH_KEY = 'test_f733367b6b6584f6c46f4679d20';
  Instamojo.isSandboxMode(true); // For testing
  Instamojo.setKeys(API_KEY, AUTH_KEY);

  const onBuyNowClick = () => {
    const options = {
      purpose: 'Product name', // REQUIRED
      amount: 20, // REQUIRED and must be > ₹3 (3 INR)
      currency: 'INR',
      buyer_name: '',
      email: '',
      phone: null,
      send_email: false,
      send_sms: false,
      allow_repeated_payments: false,
      webhook: '',
      redirect_url: '',
    };

    Instamojo.createNewPaymentRequest(options)
      .then((response) => {
        const paymentUrl = response.payment_request.longurl;
        window.location.href = paymentUrl;
      })
      .catch((error) => {
        console.error('Payment request creation failed:', error);
      });
  };

  return (
    <div>
      <h2>Payment Form</h2>
      <button onClick={onBuyNowClick}>Buy Now</button>
    </div>
  );
};

export default PaymentForm;