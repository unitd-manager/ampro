import { Card, Row, Col } from "reactstrap";
import React from "react";
import { Link } from "react-router-dom";
import imageBase from "../../constants/imageBase";

function Order({ order }) {
  return (
    <div
      className="order"
      style={{ margin: "10px", backgroundColor: "whitesmoke" }}
    >
      <Link
        href={process.env.PUBLIC_URL + `/order/[slug]`}
        as={process.env.PUBLIC_URL + `/order/${order.order_id}`}
      >
        <Card style={{ height: "170px", borderRadius: "10px" }}>
          <Row>
            <Col md={12}>
              <Row>
                <Col md={12}>
                  <img
                    src={`${imageBase}${order.file_name}`}
                    alt="productPic"
                    style={{ height: "140px", width: "100%" }}
                  />
                </Col>
                <Col md={12}>{order.item_title}</Col>
              </Row>
            </Col>
            <Col md={6}>{order.cost_price}</Col>
            <Col md={6}>{order.order_status}</Col>
          </Row>
        </Card>
      </Link>
    </div>
  );
}

export default Order;
