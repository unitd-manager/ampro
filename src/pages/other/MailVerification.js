import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import MetaTags from "react-meta-tags";
import {useHistory} from 'react-router-dom';
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../layouts/Layout";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import api from "../../constants/api";
import { useEffect } from "react";

const MailVerification = ({ location }) => {
  const { pathname } = location;

const history=useHistory();

  const [success,setSuccess] = useState(false);
  const [error,setError] = useState(false);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(location.search);
    const query = urlSearchParams.get("token")? urlSearchParams.get("token"):null;
    const q = query!==null ?query:'';

    const token=q.replaceAll('"', '');
    api
        .post("commonApi/resetVerification", {  resetToken: token })
        .then(() => {
          setSuccess(true)

        })
        .catch((err) => {
          setError(true)
          console.log(err);
        });
  }, []);

  return (
    <Fragment>
      <MetaTags>
        <title>Pearl | Mail verification</title>
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
        {success && 
        
          <div>
               <i className="checkmark order-i">✓</i>
          <h4  
          style={{ textAlign :"center", color:"green", fontSize: 30,fontStyle:'bold'}} >Your Mail is verfied Successfully </h4>
          </div>}
         {error && 
         <div>
         <h4>Your Account is not verified</h4>
         </div>} 
      </LayoutOne>
    </Fragment>
  );
};

MailVerification.propTypes = {
  location: PropTypes.object,
};

export default MailVerification;
