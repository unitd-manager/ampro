import React, { Fragment, useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";
import { useLocation, useHistory, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Container, Form, Button } from "react-bootstrap";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import LayoutOne from "../../layouts/Layout";
import api from "../../constants/api";

function NumberCode(signupData) {
 
  const location = useLocation();
  const mobNo = location.state?.mobNo;
  const newOTP = location.state?.newOTP;
  const { addToast } = useToasts();
  const [userData, setUserData] = useState({});
  const history = useHistory();
  const [userEnteredOTP, setUserEnteredOTP] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserData();
  };

  const updateUserData = () => {
    // userData.otp_no=signupData
    console.log("sign", signupData);
    api
      .post("/api/checkOTP", { otp_no: userEnteredOTP })
      .then(() => {
        addToast("OTP is correct", {
          appearance: "success",
          autoDismiss: true,
        });
        history.push("/");
      })
      .catch(() => {
        addToast("Invalid OTP", {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };

  return (
    <Fragment>
      <MetaTags>
        <title>Ampro | Register Verification</title>
        <meta
          name="description"
          content="Compare page of UnitdEcom react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>

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
                          <h4>Code Verification</h4>
                        </Nav.Link>
                      </Nav.Item>
                    
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="login">
                                    <div>
      <div className="login-form-container">
        <div className="login-register-form">
          <form>
            <div className="login-toggle-btn">
              <Link
                to={process.env.PUBLIC_URL + "/"}
                style={{ paddingLeft: "400px" }}
              >
                Verify Later
              </Link>
            </div>
            <input type="text" name="otp_no" value={newOTP} readOnly />

            <input
              type="text"
              name="otp_no"
              value={userEnteredOTP}
              onChange={(e) => {
                setUserData({ ...userData, otp_no: e.target.value });
                setUserEnteredOTP(e.target.value);
                setError(false);
              }}
            />

            <div className="button-box">
              <div className="login-toggle-btn"></div>

              <button type="submit" onClick={handleSubmit}>
                <span>Submit</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
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
}

export default NumberCode;
