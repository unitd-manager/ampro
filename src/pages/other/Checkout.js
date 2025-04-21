import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { connect } from "react-redux";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { getDiscountPrice } from "../../helpers/product";
import LayoutOne from "../../layouts/Layout";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import StripeCheckout from "react-stripe-checkout";
import { useToasts } from "react-toast-notifications";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import api from "../../constants/api";
import { getUser } from "../../common/user";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "../../components/Payment";
import Stripe from "stripe";
import { Input } from "reactstrap";
import CheckoutRazorpay from "./CheckoutRazorpay";
import InstaPay from "./InstaPay";
import { clearCartData } from "../../redux/actions/cartItemActions";
//import DistanceCalculator from "../../components/DistaceCalculator";


const stripePromise = loadStripe(
  "pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3"
);
const stripe = Stripe(
  "sk_test_51KX4uOSJWiuYw3gIHasMc0HZONGNydONE1kA9BPa2MpTDYQySDEAVVsBqoCRtpnKbPlscBgQzkqY1JGqKBO8pLl300spdpbXRm"
);

const Checkout = ({
  location,
  // cartItems,
  currency,
}) => {
  const { pathname } = location;
  let cartTotalPrice = 0;
  const history = useHistory();
const [stripeToken, setStripeToken]=useState();

  const pay = async (token) => {
    api
      .post("/orders/api/payment", { token, cartTotalPrice })
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => console.log(err));
  };

  const handleSuccess = () => {
   history.push('/order-success')
  };
  const handleFailure = () => {
    history.push('/orderfail')
  };

  const onToken = async (token) => {
    setStripeToken(token);
   console.log('token',token)
   try {
    const response = await api.post('orders/api/payment',{
        amount: cartTotalPrice * 100,
        token,
      }
    );
    if (response.status === 200) {
      handleSuccess();
    }
  } catch (error) {
    handleFailure();
    console.log(error);
  }
  };


  
  useEffect(()=>{
const makeRequest=async()=>{
  try{
const res=await api.post('/orders/api/payment',{
token:stripeToken,
amount:cartTotalPrice*100
})
history.push('/order-success')
  }
  catch{

  }
  
}
stripeToken && makeRequest();
  },[stripeToken,cartTotalPrice,history])
  const [cartItems, setCartItems] = useState([]);
  const [userData, setUserData] = useState();
  const [orderDetail, setOrderDetail] = useState({});
  const [allcountries, setallCountries] = useState();
  const getAllCountries = () => {
    api
      .get('/commonApi/getCountry')
      .then((res) => {
        setallCountries(res.data.data);
      })
      .catch(() => {
         });
  };

  const handleOrderDetail = (e) => {
    setOrderDetail({ ...orderDetail, [e.target.name]: e.target.value });
  };

  const { addToast } = useToasts();

  const placeOrder = (os) => {
    console.log("userData", userData);
   

    if (userData) {
      orderDetail.contact_id = userData.contact_id;
      orderDetail.cust_first_name = userData.first_name;
      orderDetail.cust_last_name = userData.last_name;
      orderDetail.cust_email = userData.email;
      orderDetail.cust_address1 = userData.address1;
      orderDetail.cust_address2 = userData.address2;
      orderDetail.cust_address_area = userData.address_area;
      orderDetail.cust_address_city = userData.address_city;
      orderDetail.cust_address_country = userData.address_country;
      orderDetail.cust_address_state = userData.address_state;
      orderDetail.cust_address_po_code = userData.address_po_code;
      orderDetail.cust_phone = userData.phone;
      orderDetail.cust_address_country = userData.address_country;
      orderDetail.cust_address_state = userData.address_state;
      orderDetail.order_status =os;
      console.log("orderDetail", orderDetail);
      api
        .post("/orders/insertorders", orderDetail)
        .then((res) => {
          const insertedId = res.data.data.insertId;
          cartItems.forEach((item) => {
            item.cantact_id = userData.contact_id;
            item.order_id = insertedId;
            item.unit_price=item.price;
            item.cost_price=item.qty*item.price;
            item.item_title=item.title;
            console.log("item", item);
            api
              .post("/orders/insertOrderItem", item)
              .then(() => {
                console.log("order placed");
              })
              .catch((err) => console.log(err));
          });
        }).then(() => {
          console.log("cart user",userData)
          clearCartData(userData)
            // Make the API call
      api
      .post("/contact/clearCartItems", { contact_id: userData.contact_id })
       
        })
        .then(() => {
          history.push("/order-success");
        })
        .catch((err) => console.log(err));
    } else {
      console.log("please login");
    }
    const orderDate = new Date();
    const deliveryDate = new Date();
    deliveryDate.setDate(orderDate.getDate() + 7);

    const formatDate = (date) => {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    };

    {
      
      const to = userData.email;
      const dynamic_template_data= 
      {
     first_name:userData.first_name,
     order_date:formatDate(orderDate),
     delivery_date:formatDate(deliveryDate),
     order_status: "Paid"
    };
    api
      .post('/commonApi/sendgmail',{to,dynamic_template_data})
      .then(() => {
        addToast("Email Sent Successfully", {
          appearance: "success",
          autoDismiss: true,
        })
      })
      .catch(() => {
        addToast("Email Sent Successfully", {
          appearance: "success",
          autoDismiss: true,
        })
      });
    
    };

  };

  const [razorpayLiveKey, setRazorpayLiveKey] = useState("");
 

  const getRazorpayKey = () => {
    api.get("/setting/getRazorpayLiveKey").then((res) => {
      setRazorpayLiveKey(res.data.data[0]);
    });
  };
  const [razorpayTestKey, setRazorpayTestKey] = useState("");
 

  const getRazorpayTestKey = () => {
    api.get("/setting/getRazorpayTestKey").then((res) => {
      setRazorpayTestKey(res.data.data[0]);
    });
  };

  const [paymentMode, setPaymentMode] = useState("");
 

  const getPaymentmode = () => {
    api.get("/setting/getPaymentmode").then((res) => {
      setPaymentMode(res.data.data[0]);
    });
  };
  const apikey=paymentMode?.value ==='live'? razorpayLiveKey?.value: razorpayTestKey?.value;


  console.log('paymentmode',paymentMode);
  console.log('razorpaylive',razorpayLiveKey);
  console.log('razorpaytest',razorpayTestKey);

  console.log('apikey',apikey);

  useEffect(() => {
    const user = getUser();
    setUserData(user);
    console.log(user);
    if (user) {
      api
        .post("/contact/getCartProductsByContactId", {
          contact_id: user.contact_id,
        })
        .then((res) => {
          setCartItems(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getAllCountries();
    getRazorpayKey();
    getPaymentmode();
    getRazorpayTestKey();
  }, []);

  return (
    <Fragment>
      <MetaTags>
        <title>Ampro | Checkout</title>
        <meta
          name="description"
          content="Checkout page of UnitdEcom react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Checkout
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="checkout-area pt-95 pb-100">
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
              <div className="row">
                <div className="col-lg-7">
                  <div className="billing-info-wrap">
                    <h3>Billing Details</h3>
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>First Name</label>
                          <input
                            type="text"
                            name="shipping_first_name"
                            value={
                              orderDetail && orderDetail.shipping_first_name
                            }
                            onChange={handleOrderDetail}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Last Name</label>
                          <input
                            type="text"
                            name="shipping_last_name"
                            value={
                              orderDetail && orderDetail.shipping_last_name
                            }
                            onChange={handleOrderDetail}
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Company Name</label>
                          <input
                            type="text"
                            name="selling_company"
                            value={orderDetail && orderDetail.selling_company}
                            onChange={handleOrderDetail}
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-select mb-20">
                          <label>Country</label>
                          <Input
                type="select"
                name="shipping_address_country_code"
                onChange={handleOrderDetail}
                value={orderDetail && orderDetail.shipping_address_country_code}
              >
                <option defaultValue="selected" value="">
                  Please Select
                </option>
                {allcountries &&
                  allcountries.map((country) => (
                    <option key={country.country_code} value={country.country_code}>
                      {country.name}
                    </option>
                  ))}
              </Input>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Street Address</label>
                          <input
                            className="billing-address"
                            placeholder="House number and street name"
                            type="text"
                            name="shipping_address1"
                            value={orderDetail && orderDetail.shipping_address1}
                            onChange={handleOrderDetail}
                          />
                          <input
                            placeholder="Apartment, suite, unit etc."
                            type="text"
                            name="shipping_address2"
                            value={orderDetail && orderDetail.shipping_address2}
                            onChange={handleOrderDetail}
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Town / City</label>
                          <input
                            type="text"
                            name="shipping_address_city"
                            value={
                              orderDetail && orderDetail.shipping_address_city
                            }
                            onChange={handleOrderDetail}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>State / County</label>
                          <input
                            type="text"
                            name="shipping_address_state"
                            value={
                              orderDetail && orderDetail.shipping_address_state
                            }
                            onChange={handleOrderDetail}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Postcode / ZIP</label>
                          <input
                            type="text"
                            name="shipping_address_po_code"
                            value={
                              orderDetail &&
                              orderDetail.shipping_address_po_code
                            }
                            onChange={handleOrderDetail}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Phone</label>
                          <input
                            type="text"
                            name="shipping_phone"
                            value={orderDetail && orderDetail.shipping_phone}
                            onChange={handleOrderDetail}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Email Address</label>
                          <input
                            type="text"
                            name="shipping_email"
                            value={orderDetail && orderDetail.shipping_email}
                            onChange={handleOrderDetail}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="additional-info-wrap">
                      <h4>Additional information</h4>
                      <div className="additional-info">
                        <label>Order notes</label>
                        <textarea
                          placeholder="Notes about your order, e.g. special notes for delivery. "
                          name="message"
                          defaultValue={""}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-5">
                  <div className="your-order-area">
                    <h3>Your order</h3>
                    <div className="your-order-wrap gray-bg-4">
                      <div className="your-order-product-info">
                        <div className="your-order-top">
                          <ul>
                            <li>Product</li>
                            <li>Total</li>
                          </ul>
                        </div>
                        <div className="your-order-middle">
                          <ul>
                            {cartItems.map((cartItem, key) => {
                              const discountedPrice = getDiscountPrice(
                                cartItem.price,
                                cartItem.discount_amount
                              );
                              const finalProductPrice = (
                                cartItem.price
                              );
                              const finalDiscountedPrice = (
                                discountedPrice
                              );

                              discountedPrice != null
                                ? (cartTotalPrice +=
                                    finalDiscountedPrice * cartItem.qty)
                                : (cartTotalPrice +=
                                    finalProductPrice * cartItem.qty);
                              return (
                                <li key={key}>
                                  <span className="order-middle-left">
                                    {cartItem.title} X {cartItem.qty}
                                  </span>{" "}
                                  <span className="order-price">
                                    {discountedPrice !== null
                                      ? currency.currencySymbol +
                                        (
                                          finalDiscountedPrice * cartItem.qty
                                        ).toFixed(2)
                                      : currency.currencySymbol +
                                        (
                                          finalProductPrice * cartItem.qty
                                        ).toFixed(2)}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                        <div className="your-order-bottom">
                          <ul>
                            <li className="your-order-shipping">Shipping</li>
                            <li>Free shipping</li>
                            {/* {orderDetail.shipping_address_po_code && <DistanceCalculator pincode={orderDetail.shipping_address_po_code}/>} */}
                          
                          </ul>
                        </div>
                        <div className="your-order-total">
                          <ul>
                            <li className="order-total">Total</li>
                            <li>
                              {currency.currencySymbol +
                                cartTotalPrice.toFixed(2)}
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="payment-method">
                        {/* <PayPalScriptProvider
                          options={{
                            "client-id":
                              "ActPqt3MVzbwuKZfPIItIysHPTNkOVvpiEaHYUJosBQ4uO7NxOKOntLKfk2rxQH9RnAfC8B_cq26TQXy",
                          }}
                        >
                          <PayPalButtons
                            createOrder={(data, actions) => {
                              return actions.order.create({
                                purchase_units: [
                                  {
                                    amount: {
                                      value: cartTotalPrice, // Set the amount to charge
                                    },
                                  },
                                ],
                              });
                            }}
                            onApprove={(data, actions) => {
                              return actions.order
                                .capture()
                                .then(function (details) {
                                  // Handle the payment success
                                  console.log(details);
                                });
                            }}
                          />
                        </PayPalScriptProvider>
                      
                        <Payment
                          amount={cartTotalPrice * 100}
                          placeOrder={placeOrder}
                        /> */}
                        <CheckoutRazorpay 
                        amount={cartTotalPrice * 100}
                        placeOrder={placeOrder}
                        apikey={apikey}
                        />
                        {/* <InstaPay
                        amount={cartTotalPrice * 100}
                        placeOrder={placeOrder}
                        /> */}
                      </div>
                    </div>
                    {/* <div className="place-order mt-25">
                      <button className="btn-hover" onClick={placeOrder}>
                        Place Order
                      </button>
                    </div> */}
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cash"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in cart to checkout <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/shop"}>
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
                <a href="https://www.instamojo.com/@sulfiya/l1d766e51cc7042599016fb8ee8aa58b9/" rel="im-checkout" data-text="Pay Now" data-css-style="color:#ffffff; background:#eb9694; width:180px; border-radius:30px"   data-layout="vertical"></a>
<script src="https://js.instamojo.com/v1/button.js"></script>
              </div>
            )}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

Checkout.propTypes = {
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  location: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    currency: state.currencyData,
  };
};

export default connect(mapStateToProps)(Checkout);
