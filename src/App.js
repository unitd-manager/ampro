import PropTypes from "prop-types";
import React, { useEffect, Suspense, lazy } from "react";
import ScrollToTop from "./helpers/scroll-top";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import { multilanguage, loadLanguages } from "redux-multilanguage";
import { connect } from "react-redux";
import { BreadcrumbsProvider } from "react-breadcrumbs-dynamic";
import { useDispatch } from "react-redux";
import {
  fetchCartData,
  emptyCartData
} from "../src/redux/actions/cartItemActions";
import { fetchWishlistData, emptyWishlistData } from "../src/redux/actions/wishlistItemActions";
import { HashRouter } from "react-router-dom/cjs/react-router-dom.min";


// home pages


const Home=lazy(()=>import("./pages/home/Home"))

// shop pages

const Shop=lazy(()=>import("./pages/shop/Shop"))

//offer page
const Offers = lazy(() => import("./pages/offers/offers"));

// product Detail pages

const ProductDetail = lazy(() =>
  import("./pages/shop-product/ProductDetail")
);

const ProductTabLeft = lazy(() =>
  import("./pages/shop-product/ProductTabLeft")
);




// blog pages

const BlogRightSidebar = lazy(() => import("./pages/blog/BlogRightSidebar"));
const BlogStandard = lazy(() => import("./pages/blog/BlogStandard"));
const BlogNoSidebar = lazy(() => import("./pages/blog/BlogNoSidebar"));
const BlogDetailsStandard = lazy(() =>
  import("./pages/blog/BlogDetailsStandard")
);
const BlogCategory = lazy(() =>
  import("./pages/blog/BlogCategory")
);

// other pages
const About = lazy(() => import("./pages/other/About"));
const Contact = lazy(() => import("./pages/other/Contact"));
const MyAccount = lazy(() => import("./pages/other/MyAccount"));
const LoginRegister = lazy(() => import("./pages/other/LoginRegister"));
const RegisterVerification = lazy(() => import("./pages/other/RegisterVerification"));
const NumberVerification = lazy(() => import("./pages/other/NumberVerification"));
const ForgotPassword = lazy(() => import("./pages/other/ForgotPassword"));
const MailVerification = lazy(() => import("./pages/other/MailVerification"));
const ChangeNumber = lazy(() => import("./pages/other/ChangeNumber"));
const ResetPassword = lazy(() => import("./pages/other/ResetPassword"));

const Cart = lazy(() => import("./pages/other/Cart"));
const Wishlist = lazy(() => import("./pages/other/Wishlist"));
const Compare = lazy(() => import("./pages/other/Compare"));
const Checkout = lazy(() => import("./pages/other/Checkout"));
const OrderSuccessPage = lazy(() => import("./pages/other/OrderSuccess"));
const Orders = lazy(() => import("./pages/other/Orders"));
const OrderDetails = lazy(() => import("./pages/other/OrderDetails"));
const OrderFailurePage = lazy(() => import("./pages/other/OrderFailure"));
const EnquiryHistory = lazy(() => import("./pages/other/Enquiries"));
const EnquiryDetails = lazy(() => import("./pages/other/EnquiryDetails"));
const EnquirySuccess = lazy(() => import("./pages/other/EnquirySuccess"));
const ShippingAddress = lazy(() => import("./pages/other/ShippingAddress"));

const Review = lazy(() => import("./pages/other/Review"));
const NotFound = lazy(() => import("./pages/other/NotFound"));

//Footer page
const StoreLocatorPage = lazy(() => import("./wrappers/footer/StoreLocatorPage"));
const ReturnsPage = lazy(() => import("./wrappers/footer/ReturnsPage"));
const SupportPage = lazy(() => import("./wrappers/footer/SupportPage"));
const FaqPage = lazy(() => import("./wrappers/footer/FaqPage"));
const PrivacyPolicyPage = lazy(() => import("./wrappers/footer/PrivacyPolicyPage"));
const RefundPolicyPage = lazy(() => import("./wrappers/footer/RefundPolicyPage"));
const DisclaimerPage = lazy(() => import("./wrappers/footer/DisclaimerPage"));


const App = (props) => {
  
 const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    props.dispatch(
      loadLanguages({
        languages: {
          en: require("./translations/english.json"),
          fn: require("./translations/french.json"),
          de: require("./translations/germany.json")
        }
      })
    );
  });
  
  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem("user"));
    console.log('user in app.js',userdata);
     // Replace with your auth logic
     if (userdata) {
      console.log('fetching cart in app.js')
          dispatch(fetchCartData(userdata));
          dispatch(fetchWishlistData(userdata));
        }else {
          console.log('empty cart in app.js')
      dispatch(emptyCartData(user)); // Clear cart when user logs out
      dispatch(emptyWishlistData(user));
    }
  }, [user, dispatch]);
  return (
    <ToastProvider placement="top-right">
      <BreadcrumbsProvider>
        <HashRouter>
          <ScrollToTop>
            <Suspense
              fallback={
                <div className="flone-preloader-wrapper">
                  <div className="flone-preloader">
                    <span></span>
                    <span></span>
                  </div>
                </div>
              }
            >
              <Switch>
                

                {/* Homepages */}
                <Route
                  exact
                  path={process.env.PUBLIC_URL + "/"}
                  component={Home}
                />
                
                {/* Shop pages */}
                <Route
                  path={process.env.PUBLIC_URL + "/shop"}
                  component={Shop}
                />
            
                  <Route
                  path={process.env.PUBLIC_URL + "/offers"}
                  component={Offers}
                />
          
          <Route
                  path={process.env.PUBLIC_URL + "/shop/search/:keyword"}
                  component={Shop}
                />
          

                {/* Shop product pages */}
                
                <Route
                  path={process.env.PUBLIC_URL + "/product/:id/:title"}
                  component={ProductDetail}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/productleft/:id"}
                  component={ProductTabLeft}
                />

                {/* Blog pages */}
                <Route
                  path={process.env.PUBLIC_URL + "/blog-standard"}
                  component={BlogStandard}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/blog-no-sidebar"}
                  component={BlogNoSidebar}
                />
             <Route
                  path={process.env.PUBLIC_URL + "/blog-right-sidebar"}
                  component={BlogRightSidebar}
                />
         
                        
                <Route
                  path={process.env.PUBLIC_URL + "/blog-details/:id/:title"}
                  component={BlogDetailsStandard}
                />

              <Route
                  path={process.env.PUBLIC_URL + "/blog-category"}
                  component={BlogCategory}
                />
                {/* Other pages */}
                <Route
                  path={process.env.PUBLIC_URL + "/about"}
                  component={About}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/contact"}
                  component={Contact}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/my-account"}
                  component={MyAccount}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/login-register"}
                  component={LoginRegister}
                />
                  <Route
                  path={process.env.PUBLIC_URL + "/register-verification"}
                  component={RegisterVerification}
                />
                        <Route
                  path={process.env.PUBLIC_URL + "/number-verification"}
                  component={NumberVerification}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/forgot-password"}
                  component={ForgotPassword}
                />
                     <Route
                  path={process.env.PUBLIC_URL + "/mail-verification"}
                  component={MailVerification}
                />
                 <Route
                  path={process.env.PUBLIC_URL + "/change-number"}
                  component={ChangeNumber}
                />
                  <Route
                  path={process.env.PUBLIC_URL + "/reset-password"}
                  component={ResetPassword}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/cart"}
                  component={Cart}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/wishlist"}
                  component={Wishlist}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/compare"}
                  component={Compare}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/checkout"}
                  component={Checkout}
                />
               <Route
                  path={process.env.PUBLIC_URL + "/order-success"}
                  component={OrderSuccessPage}
                />

               <Route
                  path={process.env.PUBLIC_URL + "/orderfail"}
                  component={OrderFailurePage}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/orders"}
                  component={Orders}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/enquiries"}
                  component={EnquiryHistory}
                />
                 <Route
                  path={process.env.PUBLIC_URL + "/enquirydetails/:id"}
                  component={EnquiryDetails}
                />
                      <Route
                  path={process.env.PUBLIC_URL + "/enquirysuccess"}
                  component={EnquirySuccess}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/shippingaddress"}
                  component={ShippingAddress}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/orders/search/:keyword"}
                  component={Orders}
                />
          
                 <Route
                  path={process.env.PUBLIC_URL + "/order-detail/:id"}
                  component={OrderDetails}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/not-found"}
                  component={NotFound}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/review/:id"}
                  component={Review}
                />
                
                

               {/*Footer Page*/}
                <Route
                  path={process.env.PUBLIC_URL + "/storelocatorpage"}
                  component={StoreLocatorPage}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/returnspage"}
                  component={ReturnsPage}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/supportpage"}
                  component={SupportPage}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/faqpage"}
                  component={FaqPage}
                />
                 <Route
                  path={process.env.PUBLIC_URL + "/privacypolicypage"}
                  component={PrivacyPolicyPage}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/refundpolicypage"}
                  component={RefundPolicyPage}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/disclaimerpage"}
                  component={DisclaimerPage}
                />
<Route exact component={NotFound} />

              </Switch>
            </Suspense>
          </ScrollToTop>
        </HashRouter>
      </BreadcrumbsProvider>
    </ToastProvider>
  );
};

App.propTypes = {
  dispatch: PropTypes.func
};

export default connect()(multilanguage(App));
