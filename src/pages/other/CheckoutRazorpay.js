import React, { useEffect, useState } from "react";
//import Razorpay from "razorpay";
import PropTypes from "prop-types";
import api from "../../constants/api";

async function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      reject(new Error("Failed to load Razorpay script"));
    };
    document.body.appendChild(script);
  });
}


async function fetchExchangeRate() {
  const response = await fetch(
    "https://openexchangerates.org/api/latest.json?app_id=a3311a27daca42eeb52e08f30271bc42&base=USD&symbols=INR"
  );
  const data = await response.json();
  return data.rates.INR;
}

function convertCurrency(amount, exchangeRate) {
  return Math.round(amount * exchangeRate);
}

function CheckoutRazorpay({ amount, placeOrder}) {
  const [exchangeRate, setExchangeRate] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const getUser = () => {
   
    const userData = localStorage.getItem('user')
   
    const userInfo=JSON.parse(userData)
    console.log ('userInfo',userInfo.contact_id)

    api
    .post("/contact/clearCartItems", { contact_id: userInfo.contact_id })
    .then(() => {
      setTimeout(()=>{
        window.location.href = process.env.PUBLIC_URL + "/cart";
      },1000)
    
    })
  };
  
  // useEffect(() => {
  //   getUser()
  // }, []);
  useEffect(() => {
    async function getExchangeRate() {
      const rate = await fetchExchangeRate();
      setExchangeRate(rate);
    }

    getExchangeRate();
  }, []);
  async function displayRazorpay() {
    try {
      const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
  
      if (!res) {
        alert("Razorpay SDK failed to load.");
        return;
      }
  
      if (typeof window.Razorpay === "undefined") {
        throw new Error("Razorpay SDK not loaded.");
      }
  
      // Fetch data from your server
      const data = await fetch("https://amproadmin.zaitunsoftsolutions.com:2004/contact/getRazorpayEmail", {
        method: "POST",
      }).then((t) => t.json());
  
      // Currency conversion logic here
      //const convertedAmount = convertCurrency(amount, exchangeRate);
      const convertedAmount = amount;

      const options = {
        key: "rzp_test_yE3jJN90A3ObCp", // Enter the Key ID generated from the Dashboard
        amount: convertedAmount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: data.currency,
        description: "Wallet Transaction",
        image: "https://example.com/your_logo",
  
        handler: async function (response) {
          if (response.error) {
            // Handle error scenario
            setError(response.error.message);
            setSuccess(false);
            const orderStatus = "Due";
            await placeOrder(orderStatus);
          } else {
            // Handle success scenario
            setError(null);
           
            setSuccess(true);
            const orderStatus = "Paid";
            await placeOrder(orderStatus);
            getUser()
         
            // Use the paymentMethod object to make a payment request to your server.
            // You can send the paymentMethod.id to your server to complete the payment.
            setIsProcessing(false);
          }
        },
  
        prefill: {
          name: data.cust_first_name,
          email: data.cust_email,
          contact: data.cust_phone,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
  
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Error in Razorpay setup:", error);
    }
  }
  

  // async function displayRazorpay() {
  //   const res = await loadScript(
  //     "https://checkout.razorpay.com/v1/checkout.js"
  //   ).then((t) => console.log('t',t))
  //   .catch(error => {
  //     console.error("Failed to fetch Razorpay email:", error);
  //     return null;
  //   });
  //   console.log("res",res);
  //   if (!res) {
  //     alert("Razorpay failed to load!!");
  //     return;
  //   }

  //   const data = await fetch(
  //     "https://unitdecom.unitdtechnologies.com:3006/contact/getRazorpayEmail",
  //     { method: "POST" }
  //   ).then((t) => t.json());

  //   console.log(data);

  //   const convertedAmount = convertCurrency(amount, exchangeRate);

  //   const options = {
  //     key: "rzp_test_yE3jJN90A3ObCp", // Enter the Key ID generated from the Dashboard
  //     amount: convertedAmount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
  //     currency: data.currency,
  //     description: "Wallet Transaction",
  //     image: "https://example.com/your_logo",

  //     handler: async function (response) {
  //       if (response.error) {
  //         // Handle error scenario
  //         setError(response.error.message);
  //         setSuccess(false);
  //         const orderStatus = "Due";
  //         await placeOrder(orderStatus);
  //       } else {
  //         // Handle success scenario
  //         setError(null);
  //         setSuccess(true);
  //         const orderStatus = "Paid";
  //         await placeOrder(orderStatus);
  //         // Use the paymentMethod object to make a payment request to your server.
  //         // You can send the paymentMethod.id to your server to complete the payment.
  //         setIsProcessing(false);
  //       }
  //     },

  //     prefill: {
  //       name: data.cust_first_name,
  //       email: data.cust_email,
  //       contact: data.cust_phone,
  //     },
  //     notes: {
  //       address: "Razorpay Corporate Office",
  //     },
  //     theme: {
  //       color: "#3399cc",
  //     },
  //   };

  //   const paymentObject = new window.Razorpay(options);
  //   paymentObject.open();
  // }

  return (
    <div className="App">
      <header className="App-header">
      <div className="place-order mt-25">
        <button
        className="btn-hover"
          style={{
            textAlign: "center",
            color: "white",
            fontSize: 14,
            fontStyle: "bold",
            backgroundColor: "primary",
            borderRadius:15
            
          }}
          onClick={displayRazorpay}
          disabled={!exchangeRate} // Disable the button until exchange rate is fetched
        >
          Place Order
        </button>
        </div>
        {error && <p>Error: {error}</p>}
        {success && <p>Payment successful!</p>}
      </header>
    </div>
  );
}

CheckoutRazorpay.propTypes = {
  placeOrder: PropTypes.func,
  amount: PropTypes.number,
};

export default CheckoutRazorpay;
