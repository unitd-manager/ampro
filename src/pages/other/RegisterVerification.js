import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { useToasts } from "react-toast-notifications";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import LayoutOne from "../../layouts/Layout";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import VerificationCode from "../../components/auth/VerificationCode";

const LoginRegister = ({ location }) => {
  const { pathname } = location;
  const newOTP = location.state?.newOTP;
  const mobNo = location.state?.mobNo;
  return (
    <Fragment>
      <MetaTags>
        <title>Ampro | Register Verification</title>
        <meta
          name="description"
          content="Compare page of Ampro react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
     Register Verification
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
                          <h4>Code Verification</h4>
                        </Nav.Link>
                      </Nav.Item>
                    
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="login">
                       <VerificationCode
                       newOTP={newOTP}
                       mobNo={mobNo}/>
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

LoginRegister.propTypes = {
  location: PropTypes.object,
};

export default LoginRegister;
