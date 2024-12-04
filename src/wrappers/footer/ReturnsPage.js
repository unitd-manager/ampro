import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, Table } from "reactstrap";
import ReactHtmlParser from "react-html-parser";
import api from "../../constants/api";

const StoreLocator = () => {
  const [address, setAddress] = useState([]);
 const [returnpolicy, setReturnPolicy] = useState([]);

 const getReturnsPolicy = () => {
     api
       .get("/content/getReturnsPage")
      .then((res) => {
       setReturnPolicy(res.data.data);
       })
      .catch((err) => {
        console.log(err);
       });
   };  

// Get Store locator address
  const getAddress = () => {
    api
      .get("/content/getReturnsDescriptionPage")
      .then((res) => {
        setAddress(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAddress();
getReturnsPolicy();
  }, []);

  return (
    <Card>
      <CardHeader
        tag="h3"
        className="text-center"
        style={{ color: "red", padding: "10px" , outline: "1px solid green"}}
      >
        Returns & Exchange Policy
      </CardHeader>
      <CardBody
        style={{
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
 <CardBody
 style={{
  gap: "2px",
  backgroundColor: "#fff",
  padding: "10px",
  outline: "1px solid green"
}}
 >
  <Table bordered hover>
          <thead>
            <tr>
              <th style={{ textAlign: "center" }} className={"w-25"}>
                Categories
              </th>
              <th style={{ textAlign: "center" }} className={"w-25"}>
                Returns
              </th>
            </tr>
          </thead>
          <tbody>
            {returnpolicy.map((element) => (
              <tr key={element.content_id}>
                <td>{ReactHtmlParser(element.title)}</td>
                <td>{ReactHtmlParser(element.description)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        
      </CardBody> 
    </Card>
  );
};

export default StoreLocator;