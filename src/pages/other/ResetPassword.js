import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import MetaTags from "react-meta-tags";
import {useHistory} from 'react-router-dom';
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { useToasts } from "react-toast-notifications";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import LayoutOne from "../../layouts/Layout";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import api from "../../constants/api";
import { useEffect } from "react";

const ResetPassword = ({ location }) => {
  const { pathname } = location;
const addToast=useToasts();
const history=useHistory();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [token, setToken] = useState("");

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };
  console.log("token", token);
  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if password and confirm password match
    if (password === confirmPassword) {
      // Passwords match, handle form submission
      // You can perform any further actions here
      api
        .post("api/reset", { newPassword: password, resetToken: token })
        .then(() => {
          addToast("Password has been changed Successfully", {
            appearance: "success",
            autoDismiss: true,
          });
setTimeout(()=>{
  history.push('/')
},200)
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // Passwords do not match
      setPasswordMatch(false);
    }
  };
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(location.search);
    const query = urlSearchParams.get("token")? urlSearchParams.get("token"):null;
    const q = query!==null ?query.slice(0, -1):'';
    setToken(q);
  }, []);

  return (
    <Fragment>
      <MetaTags>
        <title>Ampro | Reset Password</title>
        <meta
          name="description"
          content="Compare page of Ampro react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Reset Password
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
                          <h4>Reset Password </h4>
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
                                  name="password"
                                  placeholder="Password"
                                  onChange={handlePasswordChange}
                                />
                                <input
                                  type="text"
                                  name="confirmPassword"
                                  placeholder="Confirm Password"
                                  onChange={handleConfirmPasswordChange}
                                />
                                {!passwordMatch && (
                                  <p>Passwords do not match.</p>
                                )}
                                <div className="button-box">
                                  <button type="submit" onClick={handleSubmit}>
                                    <span>Reset Password</span>
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

ResetPassword.propTypes = {
  location: PropTypes.object,
};

export default ResetPassword;
