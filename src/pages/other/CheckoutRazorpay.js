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

// function convertCurrency(amount, exchangeRate) {
//   return Math.round(amount * exchangeRate);
// }

function CheckoutRazorpay({ amount, placeOrder}) {
  const [exchangeRate, setExchangeRate] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [ setIsProcessing] = useState(false);
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
      setIsProcessing(true);
      const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

      if (!res) {
        alert("Razorpay SDK failed to load.");
        setIsProcessing(false);
        return;
      }

      if (typeof window.Razorpay === "undefined") {
        throw new Error("Razorpay SDK not loaded.");
      }

      // Fetch data from your server. If it fails, fall back to localStorage/user info so Razorpay can still open.
      let data = { cust_first_name: "", cust_email: "", cust_phone: "", currency: "INR" };
      try {
        const resp = await fetch(
          "https://amproadmin.zaitunsoftsolutions.com:2004/contact/getRazorpayEmail",
          { method: "POST" }
        );
        if (resp.ok) {
          data = await resp.json();
        } else {
          console.warn("getRazorpayEmail returned non-OK status:", resp.status);
        }
      } catch (fetchErr) {
        console.warn("Failed to fetch Razorpay email from server:", fetchErr);
        // Try to prefill from localStorage user as a fallback
        try {
          const userData = localStorage.getItem("user");
          if (userData) {
            const userInfo = JSON.parse(userData);
            data.cust_first_name = userInfo.first_name || "";
            data.cust_email = userInfo.email || "";
            data.cust_phone = userInfo.phone || "";
          }
        } catch (e) {
          console.warn("Failed to parse local user for prefill", e);
        }
        // Inform the user but continue — the Razorpay widget can open without this endpoint.
        // Do not return here; continue with fallback data.
      }

      // Currency conversion logic here (if you need conversion use exchangeRate)
      const convertedAmount = amount || 0;

      const options = {
        key: "rzp_test_RhuQKq8G6AymUH", // Enter the Key ID generated from the Dashboard
        amount: convertedAmount, // Amount is in currency subunits (paise)
        currency: data.currency || "INR",
        name: "United",
        description: "Purchase Description",
        image: "",

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
            getUser();

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
      setIsProcessing(false);
      // Provide user-friendly message
      alert("Payment initialization failed. Please try again later or contact support.");
    }
  }
  

  

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
