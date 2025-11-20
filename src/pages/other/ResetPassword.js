import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import { useHistory } from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { useToasts } from "react-toast-notifications";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import LayoutOne from "../../layouts/Layout";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import api from "../../constants/api";
 
const ResetPassword = ({ location }) => {
  const { pathname, search } = location;
  const { addToast } = useToasts();
  const history = useHistory();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [token, setToken] = useState("");

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(search);
    const queryToken = urlSearchParams.get("token");
    if (queryToken) {
      const cleanToken = queryToken.endsWith("=")
        ? queryToken.slice(0, -1)
        : queryToken;
      setToken(cleanToken);
    }
  }, [search]);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password === confirmPassword) {
      api
        .post("api/reset", { newPassword: password, resetToken: token })
        .then(() => {
          addToast("Password has been changed successfully", {
            appearance: "success",
            autoDismiss: true,
          });
          setTimeout(() => {
            history.push("/");
          }, 500);
        })
        .catch((err) => {
          console.error("Reset password error:", err);
          addToast("Something went wrong. Please try again.", {
            appearance: "error",
            autoDismiss: true,
          });
        });
    } else {
      setPasswordMatch(false);
    }
  };

  return (
    <Fragment>
      <MetaTags>
        <title>Ampro | Reset Password</title>
        <meta
          name="description"
          content="Reset password page of Ampro eCommerce app."
        />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Reset Password
      </BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        <Breadcrumb />
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-12 ml-auto mr-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="reset">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="reset">
                          <h4>Reset Password</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="reset">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={handleSubmit}>
                              <input
                                type="password"
                                name="password"
                                placeholder="New Password"
                                value={password}
                                onChange={handlePasswordChange}
                                required
                              />
                              <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                required
                              />
                              {!passwordMatch && (
                                <p style={{ color: "red" }}>
                                  Passwords do not match.
                                </p>
                              )}
                              <div className="button-box">
                                <button type="submit">
                                  <span>Reset Password</span>
                                </button>
                              </div>
                            </form>
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
};

ResetPassword.propTypes = {
  location: PropTypes.object.isRequired,
};

export default ResetPassword;
