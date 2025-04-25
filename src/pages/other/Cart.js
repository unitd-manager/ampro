import React, {
  Fragment,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { Link, useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { useSelector, useDispatch } from "react-redux";
import LayoutOne from "../../layouts/Layout";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import api from "../../constants/api";
import {
  fetchCartData,
  removeCartData,
  clearCartData,
  updateCartData,
} from "../../redux/actions/cartItemActions";
import imageBase from "../../constants/imageBase";
import "../../assets/css/button.css";
import Swal from "sweetalert2";

const Cart = ({ location }) => {
  const { addToast } = useToasts();
  const { pathname } = location;
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user")); // Replace with your auth logic
  const cartItems = useSelector((state) => state.cartItems.cartItems);
  const currency = useSelector((state) => state.currencyData);
  const history = useHistory(); 

  const [mailId, setmailId] = useState("");
  const getEmail = () => {
    api.get("/setting/getMailId").then((res) => {
      setmailId(res.data.data[0]);
    });
  };


  const cartTotalPrice = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const discountedPrice = item.discount_amount
        ? item.price - item.discount_amount
        : item.price;
      return total + discountedPrice * item.qty;
    }, 0);
  }, [cartItems]); 

  const handleIncreaseQuantity = useCallback(
    (item) => {
      const updatedItem = { ...item, qty: item.qty + 1 };
      dispatch(updateCartData(updatedItem, addToast));
    },
    [dispatch, addToast]
  );

  const handleDecreaseQuantity = useCallback(
    (item) => {
      if (item.qty > 1) {
        const updatedItem = { ...item, qty: item.qty - 1 };
        dispatch(updateCartData(updatedItem, addToast));
      }
    },
    [dispatch, addToast]
  );

  const handleRemoveItem = useCallback(
    (item) => {
      dispatch(removeCartData(item, addToast));
    },
    [dispatch, addToast]
  );

  const generateCode = () => {
    api
      .post('/commonApi/getCodeValues', { type: 'enquiry' })
      .then((res) => {
        placeEnquiry(res.data.data);
      })
      .catch(() => {
        placeEnquiry('');
      });
  };

  const placeEnquiry = (code) => {     
    if (user) {
      const enquiryDetails = {
        contact_id : user.contact_id,
        enquiry_date : new Date().toISOString().split('T')[0],
        enquiry_type : 'Enquiry and order for Retail products.',
        status : 'New',
        title : 'Enquiry from ' + user.first_name,      
        enquiry_code: code,
        creation_date : new Date().toISOString().split('T')[0],
        created_by: user.first_name,
        first_name: user.first_name,
        email: user.email,
        grades: cartItems.map(item => item.grades).join(', '),      };
      api
        .post("/enquiry/insertEnquiry", enquiryDetails)
        .then((res) => {
          const insertedId = res.data.data.insertId;
          cartItems.forEach((item) => {
            item.enquiry_id = insertedId;
            item.quantity = item.qty;
            item.product_id = item.product_id;
            item.category_id = item.category_id;
            item.created_by = user.first_name;
            item.first_name = user.first_name;
            item.email = user.email;
            item.grades = item.grades;

            api
              .post("/enquiry/insertQuoteItems", item)
              .then(() => {
                console.log("order placed");
              })
              .catch((err) => console.log(err));
          });
        }).then(() => {
          console.log("cart user",user)
          clearCartData(user)
            // Make the API call
      api
      .post("/contact/clearCartItems", { contact_id: user.contact_id })
       
        })
        .then(() => {
          //alert("Enquiry Submitted Successfully");
          history.push('/enquirysuccess')
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

  
    const to = mailId.email;
    const toCustomer = user.email; // Customer's Email
    const subject = "Ampro Product Details";
    
    // Group all products into an array
    const dynamic_template_data = {
      first_name: cartItems[0]?.first_name,
      phone: cartItems[0]?.phone, // Assuming same user for all products
      address: cartItems[0]?.address, // Assuming same user for all products
      email: cartItems[0]?.email, // Assuming same user for all products
      // Assuming same user for all products
      products: cartItems.map((item) => ({
        title: item.title,
        qty: item.qty,
      })),
    };
    // Send a single API request with all products
    api
      .post("/commonApi/sendProductAdmin", { to, subject, dynamic_template_data })
      .then((res) => {
        console.log("Product admin email sent successfully.");
      })
      .catch((err) => {
        console.error("Error sending product admin email:", err);
      });
      
  // Send Email to Customer (Customer Dynamic Template)
api
.post("/commonApi/sendProduct",{ toCustomer, subject, dynamic_template_data })
.then((res) => {
  console.log("Customer email sent successfully.");
})
.catch((err) => {
  console.error("Error sending customer email:", err);
});

    {
      
      const to = user.email;
      const dynamic_template_data= 
      {
     first_name:user.first_name,
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

  // const handleClearCart = useCallback(() => {
  //   dispatch(clearCartData(user));
  // }, [dispatch, user]);
  const handleClearCart = useCallback(() => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you really want to clear the cart?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, clear it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(clearCartData(user));
        Swal.fire({
          title: 'Cleared!',
          text: 'Your cart has been cleared.',
          icon: 'success',
          confirmButtonColor: '#3085d6',
        });
      }
    });
  }, [dispatch, user]);


  useEffect(() => {
    if (user) {
      dispatch(fetchCartData(user));
    }
    getEmail()
  }, [ ]);

  return (
    <Fragment>
      <MetaTags>
        <title>Ampro | Cart</title>
        <meta
          name="description"
          content="Cart page of Ampro eCommerce template."
        />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Cart
      </BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        <Breadcrumb />
        <div className="cart-main-area pt-90 pb-100">
          <div className="container">
            {cartItems && cartItems.length > 0 ? (
              <Fragment>
                <h3 className="cart-page-title">Your cart items</h3>
                <div className="table-content table-responsive cart-table-content">
                  <table>
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Product Name</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Total</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                    <tbody>
                      {cartItems?.map((item, index) => (
                        <tr key={index}>
                          <td className="product-thumbnail">
                            <Link to={`/product/${item.product_id}/${item.title}`}>
                              <img
                                src={`${imageBase}${item.images[0]}`}
                                alt={item.title}
                                className="img-fluid"
                              />
                            </Link>
                          </td>
                          <td className="product-name text-center">{item.title}</td>
                          <td className="product-price text-center">
                            ${item.discount_amount ? (item.price - item.discount_amount).toFixed(2) : item.price.toFixed(2)}
                          </td>
                          <td className="product-quantity">
                            <div className="cart-plus-minus">
                              <button
                                className="dec qtybutton"
                                onClick={() => handleDecreaseQuantity(item)}
                              >
                                -
                              </button>
                              <input
                                className="cart-plus-minus-box"
                                type="text"
                                value={item.qty}
                                readOnly
                              />
                              <button
                                className="inc qtybutton"
                                onClick={() => handleIncreaseQuantity(item)}
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="product-subtotal text-center">
                            ${((item.discount_amount ? item.price - item.discount_amount : item.price) * item.qty).toFixed(2)}
                          </td>
                          <td className="product-remove">
                            <button onClick={() => handleRemoveItem(item)}>
                              <i className="fa fa-times"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="grand-totall">
                  <h4 style={{ fontSize: '24px', fontWeight: 'bold', float:'right' }}>
                    Grand Total: ${cartTotalPrice.toFixed(2)}
                  </h4>
                  <div className="button-group">
                    {cartItems.length > 0 &&<div className="form-group">
 									    <button className="clear-btn" 
                        onClick={()=>{history.push('/checkout',cartItems)}} type="button" 
                        style={{ backgroundColor: "#1fb0c1", color: "white", borderRadius: 50 }}
                      >Proceed to Checkout</button>
 								    
                    <button type="button"
                      onClick={()=>handleClearCart()}
                      className="clear-btn ml-10"
                      style={{ backgroundColor: "red", color: "white", borderRadius: 50 }}
                    >
                      Clear Cart
                    </button></div>}
                  </div>
                </div>
              </Fragment>
            ) : (
              
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="item-empty-area text-center">
                                <div className="item-empty-area__icon mb-30">
                                <i className="pe-7s-cart"></i>
                                </div>
                                <div className="item-empty-area__text">
                                  No items found in cart <br />{" "}
                                  <Link to={process.env.PUBLIC_URL + "/shop"}>
                                  Shop Now
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default Cart;