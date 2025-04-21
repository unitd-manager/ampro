import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../layouts/Layout";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import api from "../../constants/api";

const MailVerification = ({ location }) => {
  const { pathname } = location;

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(location.search);
    const query = urlSearchParams.get("otp") || "";
    const token = query.replaceAll('"', '');

    api
      .post("commonApi/resetVerification", { resetToken: token })
      .then(() => setSuccess(true))
      .catch((err) => {
        setError(true);
        console.error(err);
      });
  }, [location.search]);

  return (
    <Fragment>
      <MetaTags>
        <title>Ampro | Mail verification</title>
        <meta
          name="description"
          content="Compare page of UnitdEcom react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Mail verification
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />

        <div style={styles.container}>
          {success && (
            <div style={styles.card}>
              <div style={styles.iconSuccess}>✓</div>
              <h2 style={styles.title}>Email Verified Successfully!</h2>
              <p style={styles.message}>
                Thank you! Your email has been successfully verified. You can now continue using our services.
              </p>
              <a href="/" style={styles.button}>Go to Home</a>
            </div>
          )}

          {error && (
            <div style={styles.card}>
              <div style={styles.iconError}>✗</div>
              <h2 style={styles.titleError}>Verification Failed</h2>
              <p style={styles.message}>
                Sorry! Your verification link is invalid or has expired. Please try again or contact support.
              </p>
              <a href="/" style={styles.buttonError}>Go to Home</a>
            </div>
          )}
        </div>
      </LayoutOne>
    </Fragment>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60vh',
    textAlign: 'center',
  },
  card: {
    padding: '40px',
    borderRadius: '15px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    maxWidth: '500px',
    backgroundColor: '#fff',
  },
  iconSuccess: {
    fontSize: '80px',
    color: 'green',
    marginBottom: '20px',
  },
  iconError: {
    fontSize: '80px',
    color: 'red',
    marginBottom: '20px',
  },
  title: {
    fontSize: '28px',
    color: 'green',
    marginBottom: '10px',
  },
  titleError: {
    fontSize: '28px',
    color: 'red',
    marginBottom: '10px',
  },
  message: {
    fontSize: '16px',
    marginBottom: '30px',
    color: '#555',
  },
  button: {
    padding: '12px 25px',
    borderRadius: '30px',
    backgroundColor: 'green',
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
  buttonError: {
    padding: '12px 25px',
    borderRadius: '30px',
    backgroundColor: 'red',
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
};

MailVerification.propTypes = {
  location: PropTypes.object,
};

export default MailVerification;
