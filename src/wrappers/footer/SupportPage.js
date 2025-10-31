import React, { useState, useEffect } from "react";
import { CardBody, CardHeader } from "reactstrap";
import ReactHtmlParser from "react-html-parser";
import api from "../../constants/api";

const SupportPolicy = () => {
  const [address, setAddress] = useState([]);
  const getSupport = () => {
    api
      .get("/content/getSupportPage")
      .then((res) => {
        setAddress(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getSupport();
  }, []);
  
  return (
    <div>
      <CardHeader tag="h1" className="text-center" style={{color:"red"}}>Support Policy</CardHeader>
      <CardBody>
        {address.map((element) => (
        <p data-aos='fade-up' data-aos-delay='400'>{ReactHtmlParser(element.description) }</p>
        ))}
        </CardBody>
    </div>
 );
};

export default SupportPolicy;