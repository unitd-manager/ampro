import PropTypes from "prop-types";
import React, { Fragment, useState,useEffect } from "react";
import MetaTags from "react-meta-tags";
import { Link, useHistory } from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { useToasts } from "react-toast-notifications";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import LayoutOne from "../../layouts/Layout";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import api from "../../constants/api";

const ForgotPassword = ({ location }) => {
  const { pathname } = location;

  const [email, setEmail] = useState("");
  const [contactMails, setContactMails] = useState([]);

  const { addToast } = useToasts();
  const history = useHistory();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email) {
      addToast("Please enter your email.", { appearance: "error" });
      return;
    }
  
    // Extract email values from contactMails
    const emailList = contactMails.map((contact) => contact.email);
  
    if (!emailList.includes(email)) {
      addToast("This email is not registered.", { appearance: "error" });
      return;
    }
    api
      .post("api/forgot", { email: email })
      .then((res) => {
        addToast("A Link to reset password is sent to the mail.", { appearance: "success" });
      })
      .catch(() => {
        console.log("error");
      });
  };
useEffect(()=>{

  api
  .get("api/getAllContactMails")
  .then((res) => {
    setContactMails(res.data.data)
  })
  .catch(() => {
    console.log("error");
  });
},[])
  const signin = (event) => {};
  return (
    <Fragment>
      <MetaTags>
        <title>Ampro | ForgotPassword</title>
        <meta
          name="description"
          content="Compare page of UnitdEcom react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Forgot Password
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-12 ml-auto mr-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="login">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="login">
                          <h4>ForgotPassword ?</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="login">
                        <>
                          <div className="login-form-container">
                            <div className="login-register-form">
                              <form>
                                <input
                                  type="text"
                                  name="email"
                                  placeholder="Email"
                                  onChange={handleEmailChange}
                                />

                                <div className="button-box">
                                  <button type="submit" onClick={handleSubmit}>
                                    <span>Send Reset Link</span>
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

ForgotPassword.propTypes = {
  location: PropTypes.object,
};

export default ForgotPassword;
