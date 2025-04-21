import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import LayoutOne from "../../layouts/Layout";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import PictureAttachmentModalV2 from "../../components/ReturnOrder/PictureAttachmentModalV2";
import PictureAttachmentModalV3 from "../../components/ReturnOrder/PictureAttachmentModalV3";
import api from "../../constants/api";
import { Input } from "reactstrap";

import imageBase from "../../constants/imageBase";

const MyAccount = ({ location }) => {
  const { pathname } = location;
  const [user, setUser] = useState({});
  const [userData, setUserData] = useState();
  const [profile, setProfile] = useState();
  const { addToast } = useToasts();
  const [allcountries, setallCountries] = useState();
  const [firstName, setFirstName] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [signUpEmailError, setSignUpEmailError] = useState("");
  const [signupPasswordError, setSignupPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [cityError, setCityError] = useState("");
  const [stateError, setStateError] = useState("");
  const [countryError, setCountryError] = useState("");
  const [pinCodeError, setPinCodeError] = useState("");
  const [panError, setPanError] = useState("");
  const [iecError, setIecError] = useState("");
  const [fssaiError, setFssaiError] = useState("");
  const [attachmentModal, setAttachmentModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [pictureData, setDataForPicture] = useState({
    modelType: "",
  });
  const handleUserData = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const getAllCountries = () => {
    api
      .get('/commonApi/getCountry')
      .then((res) => {
        setallCountries(res.data.data);
      })
      .catch(() => {
         });
  };

  const validateFirstName = (first_name) => {
    // name validation regex pattern
    const firstNamePattern = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    return firstNamePattern.test(first_name);
  };
  const validateMobile = (mobile) => {
    // Mobile number validation pattern (10-digit numbers)
    const mobilePattern = /^[6-9]\d{9}$/;
    return mobilePattern.test(mobile);
  };  

  const validateEmail = (email) => {
    // Email validation regex pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    // Password validation regex pattern
    const passwordPattern =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    return passwordPattern.test(password);
  };

  const validatePan = (pan) => {
    const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panPattern.test(pan);
  };  

  const validateIec = (iec) => {
    const iecPattern = /^[A-Z0-9]{10}$/i;
    return iecPattern.test(iec);
  };  

  const validateFssai = (fssai) => {
    const fssaiPattern = /^[A-Za-z0-9]{14}$/;
    return fssaiPattern.test(fssai);
  };

  const validateAddress = (address) => {
    return address.trim().length >= 1; // Minimum 1 character required
  };  
  
  const validateCity = (city) => {
    return /^[a-zA-Z\s]+$/.test(city); // Only alphabets and spaces
  };
  
  const validateState = (state) => {
    return /^[a-zA-Z\s]+$/.test(state);
  };
  
  const validateCountry = (country) => {
    return country !== "";
  };
  
  const validatePinCode = (pinCode) => {
    return /^[0-9]{5,6}$/.test(pinCode); // 5-6 digit numbers only
  };
  
  const getUser = () => {
    api
      .post("/contact/getContactsById", { contact_id: user.contact_id })
      .then((res) => {
        setUserData(res.data.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
                             
  const updateUserData = () => {
    userData.contact_id = user.contact_id;
    setFirstNameError("");
    setMobileError("");
    setSignUpEmailError("");
    setPanError("");
    setIecError("");
    setFssaiError("");
  
    let isValid = true;
  
    if (!validateMobile(userData.mobile)) {
      setMobileError("Invalid Mobile Number");
      isValid = false;
    }
    if (!validateFirstName(userData.first_name)) {
      setFirstNameError("Invalid Name");
      isValid = false;
    }
    if (!validateEmail(userData.email)) {
      setSignUpEmailError("Invalid Email");
      isValid = false;
    }

    if (!validatePan(userData.pan)) {
      setPanError("Invalid PAN Number");
      isValid = false;
    }

    if (!validateIec(userData.iec)) {
      setIecError("Invalid IEC Number");
      isValid = false;
    }

    if (!validateFssai(userData.fssai)) {
      setFssaiError("Invalid FSSAI Number");
      isValid = false;
    }

    // Stop execution if validation fails
    if (!isValid) {
      return;
    }
  
    api
      .post("/contact/editContactData", userData)
      .then((res) => {
        addToast("Account Info Updated successfully", {
          appearance: "success",
          autoDismiss: true,
        });
        getUser();
      })
      .catch((err) => {
        console.log(err);
        addToast("Unable to Edit the Account Info", {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };
  
  const updateUserPassword = () => {
    userData.contact_id = user.contact_id;
    setSignupPasswordError("");
    setConfirmPasswordError("");
  
    let isValid = true;
  
    if (!validatePassword(userData.pass_word)) {
      setSignupPasswordError(
        "Password must contain at least 8 characters, including uppercase, lowercase, special character & numbers."
      );
      isValid = false;
    }
    if (userData.pass_word !== userData.confirm_password) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    }
  
    // Stop execution if validation fails
    if (!isValid) {
      return;
    }
  
    api
      .post("/contact/editContactPassword", userData)
      .then((res) => {
        addToast("Account Password Updated successfully", {
          appearance: "success",
          autoDismiss: true,
        });
        getUser();
      })
      .catch((err) => {
        console.log(err);
        addToast("Unable to Edit the Account Password", {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };
  
  const updateUserAddress = () => {
    setAddressError("");
    setCityError("");
    setStateError("");
    setCountryError("");
    setPinCodeError("");
  
    let isValid = true;
  
    if (!validateAddress(userData.address1)) {
      setAddressError("Invalid Address");
      isValid = false;
    }
    if (!validateCity(userData.address_city)) {
      setCityError("Invalid city name.");
      isValid = false;
    }
    if (!validateState(userData.address_state)) {
      setStateError("Invalid state name.");
      isValid = false;
    }
    if (!validateCountry(userData.address_country_code)) {
      setCountryError("Please select a country.");
      isValid = false;
    }
    if (!validatePinCode(userData.address_po_code)) {
      setPinCodeError("Invalid Pin Code.");
      isValid = false;
    }
  
    if (!isValid) {
      return;
    }
  
    // Proceed with API call if all validations pass
    api
      .post("/contact/editContactAddress", userData)
      .then(() => {
        addToast("Address updated successfully", {
          appearance: "success",
          autoDismiss: true,
        });
        getUser();
      })
      .catch(() => {
        addToast("Unable to update the address", {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };
  
  const dataForPicture = () => {
    setDataForPicture({
      modelType: "picture",
      contact_id: user.contact_id,
    });
  };
  const reloadPage = () => {
    window.location.reload();
  };
  useEffect(() => {
    api
      .post("/contact/getContactsById", { contact_id: user.contact_id })
      .then((res) => {
        setUserData(res.data.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);
  useEffect(() => {
    if (profile && profile.length > 0) {
      setImageUrl(`${imageBase}/${profile[0].name}`);
    } else {
      setImageUrl("");
    }
  }, [profile, imageBase]);
  useEffect(() => {
    const userData = localStorage.getItem("user")
      ? localStorage.getItem("user")
      : null;
    const userInfo = JSON.parse(userData);
    setUser(userInfo);
    getAllCountries();
  }, []);
  useEffect(() => {
    api
      .post("/file/getListOfFiles", {
        record_id: user.contact_id,
        room_name: "profile",
      })
      .then((res) => {
        setProfile(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user.contact_id]);

  return (
    <Fragment>
      <MetaTags>
        <title>Ampro | My Account</title>
        <meta
          name="description"
          content="Compare page of UnitdEcom react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        My Account
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="myaccount-area pb-80 pt-100">
          <div className="container">
            <div className="row">
              <div className="ml-auto mr-auto col-lg-9">
                <div className="myaccount-wrapper">
                  <Accordion defaultActiveKey="0">
                    <div className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="0">
                          <h3 className="panel-title">
                            <span>1 .</span> Edit your account information{" "}
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>
                          <div className="myaccount-info-wrapper">
                            <div className="account-info-wrapper">
                              <h4>My Account Information</h4>
                              <h5>Your Personal Details</h5>
                            </div>
                            <div className="row">
                              {/* First Name Field */}
                              <div className="col-12 col-md-6">
                              {firstNameError && <span className="error">{firstNameError}</span>}
                              <div className="billing-info">
                                  <label>Name</label>
                                  <input
                                    type="text"
                                    name="first_name"
                                    value={userData && userData.first_name}
                                    onChange={(e) => {
                                      handleUserData(e);
                                      setFirstName(e.target.value);
                                    }}
                                    className="form-control"
                                  />
                                </div>
                              </div>

                              {/* Email Address Field */}
                              <div className="col-12 col-md-6">
                                {signUpEmailError && (
                                  <span className="error">{signUpEmailError}</span>
                                )}
                                <div className="billing-info">
                                  <label>Email Address</label>
                                  <input
                                    type="email"
                                    name="email"
                                    value={userData && userData.email}
                                    onChange={handleUserData}
                                    className="form-control"
                                  />
                                </div>
                              </div>

                              {/* Telephone Field */}
                              <div className="col-12 col-md-6">
                              {mobileError && <span className="error">{mobileError}</span>}
                              <div className="billing-info">
                                <label>Mobile</label>
                                  <input
                                    type="text"
                                    name="mobile"
                                    value={userData && userData.mobile}
                                    onChange={handleUserData}
                                    className="form-control"
                                  />
                                </div>
                              </div>

                            <div className="col-12 col-md-6">
                              {panError && <span className="error">{panError}</span>}
                              <div className="billing-info">
                                  <label>PAN</label>
                                  <input
                                    type="text"
                                    name="pan"
                                    value={userData && userData.pan}
                                    onChange={handleUserData}
                                    className="form-control"
                                  />
                                </div>
                              </div>

                              <div className="col-12 col-md-6">
                              {iecError && <span className="error">{iecError}</span>}
                              <div className="billing-info">
                                  <label>IEC</label>
                                  <input
                                    type="text"
                                    name="iec"
                                    value={userData && userData.iec}
                                    onChange={handleUserData}
                                    className="form-control"
                                  />
                                </div>
                              </div>

                              <div className="col-12 col-md-6">
                              {fssaiError && <span className="error">{fssaiError}</span>}
                              <div className="billing-info">
                                  <label>FSSAI</label>
                                  <input
                                    type="text"
                                    name="fssai"
                                    value={userData && userData.fssai}
                                    onChange={handleUserData}
                                    className="form-control"
                                  />
                                </div>
                              </div>

                              <div className="col-12 col-md-6">
                              <div className="billing-info">
                                  <label>GST</label>
                                  <input
                                    type="text"
                                    name="gst"
                                    value={userData && userData.gst}
                                    onChange={handleUserData}
                                    className="form-control"
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="billing-back-btn">
                              <div className="billing-btn">
                                <button type="submit" onClick={updateUserData}>
                                  Save
                                </button>
                              </div>
                            </div>
                            </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </div>
                    <div className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="1">
                          <h3 className="panel-title">
                            <span>2 .</span> Change your password
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="1">
                        <Card.Body>
                          <div className="myaccount-info-wrapper">
                            <div className="account-info-wrapper">
                              <h4>Change Password</h4>
                              <h5>Your Password</h5>
                            </div>
                            <div className="row">
                              <div className="col-lg-12 col-md-12">
                                {signupPasswordError && (
                                  <span className="error">{signupPasswordError}</span>
                                )} 
                                <div className="billing-info">
                                  <label>Password</label>
                                  <input
                                    type="password"
                                    name="pass_word"
                                    value={userData && userData.pass_word}
                                    onChange={handleUserData}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-12 col-md-12">
                                {confirmPasswordError && (
                                  <span className="error">{confirmPasswordError}</span>
                                )} 
                                <div className="billing-info">
                                  <label>Password Confirm</label>
                                  <input
                                    type="password"
                                    name="confirm_password"
                                    value={userData && userData.confirm_password}
                                    onChange={handleUserData}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="billing-back-btn">
                              <div className="billing-btn">
                                <button
                                  type="submit"
                                  onClick={updateUserPassword}
                                >
                                  Save
                                </button>
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </div>
                    <div className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="2">
                          <h3 className="panel-title">
                            <span>3 .</span> Modify your address book entries{" "}
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="2">
                        <Card.Body>
                          <div className="myaccount-info-wrapper">
                            <div className="account-info-wrapper">
                              <h4>Address Book Entries</h4>
                            </div>
                            <div className="">
                              <div className="row">
                                <div className="col-lg-6 col-md-6">
                                {addressError && <span className="error">{addressError}</span>}
                                  <div className="billing-info">
                                    <label>Address1</label>
                                    <input
                                      type="text"
                                      name="address1"
                                      value={userData && userData.address1}
                                      onChange={handleUserData}
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                  <div className="billing-info">
                                    <label>Address2</label>
                                    <input
                                      type="text"
                                      name="address2"
                                      value={userData && userData.address2}
                                      onChange={handleUserData}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-lg-6 col-md-6">
                                  <div className="billing-info">
                                    <label>Address Area</label>
                                    <input
                                      type="text"
                                      name="address_area"
                                      value={userData && userData.address_area}
                                      onChange={handleUserData}
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                {cityError && <span className="error">{cityError}</span>}
                                  <div className="billing-info">
                                    <label>City</label>
                                    <input
                                      type="text"
                                      name="address_city"
                                      value={userData && userData.address_city}
                                      onChange={handleUserData}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-lg-6 col-md-6">
                                {stateError && <span className="error">{stateError}</span>}
                                  <div className="billing-info">
                                    <label>State</label>
                                    <input
                                      type="text"
                                      name="address_state"
                                      value={userData && userData.address_state}
                                      onChange={handleUserData}
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                {countryError && <span className="error">{countryError}</span>}
                                  <div className="billing-info">
                                    <label>Country</label>
                                    <Input
                                      type="select"
                                      name="address_country_code"
                                      value={
                                        userData &&
                                        userData.address_country_code
                                      }
                                      onChange={handleUserData}
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
                              </div>
                              <div className="row">
                                <div className="col-lg-6 col-md-6">
                                {pinCodeError && <span className="error">{pinCodeError}</span>}
                                  <div className="billing-info">
                                    <label>Pin Code</label>
                                    <input
                                      type="text"
                                      name="address_po_code"
                                      value={
                                        userData && userData.address_po_code
                                      }
                                      onChange={handleUserData}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="billing-back-btn">
                              <div className="billing-btn">
                                <button
                                  type="submit"
                                  onClick={updateUserAddress}
                                >
                                  Save
                                </button>
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </div>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

MyAccount.propTypes = {
  location: PropTypes.object,
};

export default MyAccount;
