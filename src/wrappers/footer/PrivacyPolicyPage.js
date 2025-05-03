import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import { Card, CardBody, CardHeader } from "reactstrap";
import ReactHtmlParser from "react-html-parser";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../layouts/Layout";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import api from "../../constants/api";

const PrivacyPolicy = ({location}) => {
  const { pathname } = location;
  const [address, setAddress] = useState([]);
// Get Store locator address
  const getAddress = () => {
    api
      .get("/content/getPrivacyPolicyDescriptionPage")
      .then((res) => {
        setAddress(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAddress();
  }, []);


  return (
    <Fragment>
      <MetaTags>
        <title>Ampro | Privacy Policy</title>
        <meta
          name="description"
          content="Shop page of Ampro eCommerce template."
        />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Privacy Policy
      </BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />

        <Card className="w-100">
              <CardHeader
                tag="h3"
                className="text-center"
                style={{ color: "black", padding: "10px" , outline: "1px solid grey"}}
              >
                Privacy Policy
              </CardHeader>
              <CardBody
                style={{
                  gap: "2px",
                  backgroundColor: "#fff",
                  padding: "10px",
                  outline: "1px solid grey"
                }}
              >
                {address.map((element) => (
                  <div
                    key={element.content_id}
                    style={{
                      height: "100%",
                      width: "100%",
                      backgroundColor: "#fff",
                      padding: "10px",
                    }}
                  >
                    <p data-aos="fade-up" data-aos-delay="400">
                      {ReactHtmlParser(element.description)}
                    </p>
                  </div>
                ))}
              </CardBody>
         
            </Card>

        </LayoutOne>
    </Fragment>
  );
};

PrivacyPolicy.propTypes = {
  location: PropTypes.object,
};

export default PrivacyPolicy
