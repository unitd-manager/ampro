import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import ReactHtmlParser from "react-html-parser";
import api from "../../constants/api";

const StoreLocator = () => {
  const [address, setAddress] = useState([]);

  // Get Store locator address
  const getAddress = () => {
    api
      .get("/content/getStoreLocatorPage")
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
    <Card>
      <CardHeader
        tag="h3"
        className="text-center"
        style={{ color: "red", padding: "10px" , outline: "1px solid green"}}
      >
        Store Locator Address
      </CardHeader>
      <CardBody
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "2px",
          backgroundColor: "#fff",
          padding: "10px",
          outline: "1px solid green"
        }}
      >
        {address.map((element) => (
          <div
            key={element.content_id}
            style={{
              outline: "1px solid black",
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
  );
};

export default StoreLocator;