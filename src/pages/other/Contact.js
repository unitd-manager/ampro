import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../layouts/Layout";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import LocationMap from "../../components/contact/LocationMap";
import api from "../../constants/api";
import { useToasts } from "react-toast-notifications";

export default function Contact({ location }) {
  const { pathname } = location;
  const { addToast } = useToasts();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const applyChanges = () => {};
  const [contact, setContact] = useState();
  const [contacts, setContacts] = useState();
  const [email, setEmail] = useState();
  const [website, setWebsite] = useState();
  const [address, setAddress] = useState();
  const [mailId, setmailId] = useState("");
  const [googlemapdata, setGoogleMapData] = useState('');

  const getEnquiryEmail = () => {
    api.get("/setting/getEnquiryMailId").then((res) => {
      setmailId(res.data.data[0]);
    });
  };
  const getContact = () => {
    api.get("/contact/getContacts").then((res) => {
      setContact(res.data.data[0]);
    });
  };

  const getEmail = () => {
    api.get("/contact/getEmail").then((res) => {
      setEmail(res.data.data[0]);
    });
  };

  const getWebsite = () => {
    api.get("/contact/getWebsite").then((res) => {
      setWebsite(res.data.data[0]);
    });
  };

  const getAddress = () => {
    api.get("/contact/getAddress").then((res) => {
      setAddress(res.data.data[0]);
    });
  };

  const getMobile = () => {
    api.get("/contact/getMobileContacts").then((res) => {
      setContacts(res.data.data[0]);
    });
  };

  const getGoogleMap = () =>{
    api.get('/setting/getSettingsForGoogleMap').then(res=>{
      setGoogleMapData(res.data.data[0])
     })
  }

  const [user, setUser] = React.useState({
    first_name: "",
    last_name: "",
    email: "",
    comments: "",
  });

  let name, value;

  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
    console.log({ [name]: value });
    // lname = e.target.lname
    // email = e.target.email
    // message = e.target.message
  };
  const ContactSubmit = () => {
    api
      .post("/commonApi/addEnquiry", {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        comments: user.comments,
      })
      .then((res) => {
        console.log(res);
      });
    console.log(user);
  };
  //Email
  const sendMail = () => {
    if (window.confirm(" Are you sure do you want to send Mail\n")) {
      const to = mailId.email;
      const text = user.comments;
      const subject = user.email;
      const dynamic_template_data = {
        first_name: user.first_name,
        email: user.email,
        comments: user.comments,
      };
      api
        .post("/commonApi/sendemail", {
          to,
          text,
          subject,
          dynamic_template_data,
        })
        .then(() => {
          addToast("Email has sent successfully", {
            appearance: "success",
            autoDismiss: true,
          });
        })
        .catch((err) => {
          addToast("Unable to send Email", {
            appearance: "error",
            autoDismiss: true,
          });
        });
    } else {
      applyChanges();
    }
  };
  useEffect(() => {
    getMobile();
    getContact();
    getAddress();
    getWebsite();
    getEmail();
    getEnquiryEmail();
    getGoogleMap();
  }, []);
  return (
    <Fragment>
      <MetaTags>
        <title>Pearl | Contact</title>
        <meta
          name="description"
          content="Contact of UnitdEcom react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Contact
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="contact-area pt-100 pb-100">
          <div className="container">
            <div className="contact-map mb-10">
            <LocationMap description={googlemapdata&&googlemapdata.description} />
            </div>
            <div className="custom-row-2">
              <div className="col-lg-4 col-md-5">
                <div className="contact-info-wrap">
                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-phone" />
                    </div>
                    <div className="contact-info-dec">
                      <p>
                        {" "}
                        <span>{contact && contact.mobile}</span>
                      </p>
                      <p>
                        {" "}
                        <span>{contacts && contacts.mobile1}</span>
                      </p>
                    </div>
                  </div>
                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-globe" />
                    </div>
                    <div className="contact-info-dec">
                      <p>
                        <span>{email && email.mailId}</span>
                      </p>
                      <p>
                        <span>{website && website.web}</span>
                      </p>
                    </div>
                  </div>
                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-map-marker" />
                    </div>
                    <div className="contact-info-dec">
                      <span>{address && address.addr}</span>
                    </div>
                  </div>
                  <div className="contact-social text-center">
                    <h3>Follow Us</h3>
                    <ul>
                      <li>
                        <a href="//facebook.com">
                          <i className="fa fa-facebook" />
                        </a>
                      </li>
                      <li>
                        <a href="//pinterest.com">
                          <i className="fa fa-pinterest-p" />
                        </a>
                      </li>
                      <li>
                        <a href="//thumblr.com">
                          <i className="fa fa-tumblr" />
                        </a>
                      </li>
                      <li>
                        <a href="//vimeo.com">
                          <i className="fa fa-vimeo" />
                        </a>
                      </li>
                      <li>
                        <a href="//twitter.com">
                          <i className="fa fa-twitter" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 col-md-7">
                <div className="contact-form">
                  <div className="contact-title mb-30">
                    <h2>Get In Touch</h2>
                  </div>
                  <form className="contact-form-style">
                    <div className="row">
                      <div class="col-lg-6">
                        <input
                          type="text"
                          class="form-control mb-4"
                          placeholder="First Name"
                          name="first_name"
                          value={user.first_name}
                          onChange={(event) => handleChange(event)}
                        />
                      </div>
                      <div class="col-lg-6">
                        <input
                          type="text"
                          class="form-control mb-4"
                          placeholder="Last Name"
                          name="last_name"
                          value={user.last_name}
                          onChange={(event) => handleChange(event)}
                        />
                      </div>
                      <div class="col-12">
                        <input
                          type="text"
                          class="form-control mb-4"
                          placeholder="Email"
                          name="email"
                          value={user.email}
                          onChange={(event) => handleChange(event)}
                        />
                      </div>
                      <div class="col-12">
                        <textarea
                          name="comments"
                          class="form-control mb-4"
                          placeholder="Message"
                          value={user.comments}
                          onChange={(event) => handleChange(event)}
                        ></textarea>
                      </div>
                      <div class="col-8">
                        <button
                          color="success"
                          onClick={() => {
                            sendMail();
                            ContactSubmit();
                          }}
                          type="button"
                          className="btn btn-primary"
                        >
                          Submit Now
                        </button>
                      </div>
                    </div>
                  </form>
                  <p className="form-messege" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
}

Contact.propTypes = {
  location: PropTypes.object,
};
