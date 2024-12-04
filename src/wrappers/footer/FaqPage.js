import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { CardBody } from "reactstrap";
import ReactHtmlParser from "react-html-parser";
import api from "../../constants/api";

const FaqPage = () => {
  const [faq, setFaq] = useState([]);
  const [selectedFaq, setSelectedFaq] = useState(null);

  //get FAQ Questions with Answers
  const getFaq = () => {
    api
      .get("/content/getFaqPage")
      .then((res) => {
        setFaq(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  
//Handle Event on FAQ Page Apply Toggling condition 
const handleDescriptionClick = (faqId) => {
    if (selectedFaq === faqId) {
      setSelectedFaq(null);
    } else {
      setSelectedFaq(faqId);
    }
  };

  //Call useffect
  useEffect(() => {
    getFaq();
  }, []);

  return (
  <CardBody>
    <Table bordered hover>
      <thead>
        <tr>
          <th colSpan={2} style={{ textAlign: "center", background: "#f2f2f2" }}>
            Frequently Asked Questions
          </th>
        </tr>
      </thead>
      <tbody>
        {faq.map((element) => (
          <tr key={element.content_id}>
            <td
              onClick={() => handleDescriptionClick(element.content_id)}
              style={{ cursor: "pointer" }}
            >
              <strong>{element.title}</strong>
              {selectedFaq === element.content_id && (
                <p data-aos='fade-up' data-aos-delay='400'>{ReactHtmlParser(element.description) }</p>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
    </CardBody>
  );
};

export default FaqPage;