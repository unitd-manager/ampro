import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import { useParams, Link } from "react-router-dom/cjs/react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../../constants/api";
import LayoutOne from "../../layouts/Layout";
import ReturnOrderModal from "../../components/ReturnOrder/ReturnOrderModal";
import InvoicePdf from "../../components/PDF/InvoicePdf";


const OrderDetailsPage = ({ orderStatus }) => {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const [orderItems, setOrderItems] = useState([]);
  const[returnItem, setReturnItem]=useState({});
  const[returnModal,setReturnModal]=useState(false);
  order.images = String(order.images).split(",");
  console.log("order", order);
  
  useEffect(() => {
    api
      .post("/orders/getOrderByOrderId", { order_id: id })
      .then((res) => {
        setOrder(res.data.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  useEffect(() => {
    api
      .post("/orders/getOrderByOrderId", { order_id: id })
      .then((res) => {
        setOrderItems(res.data.data);
        console.log("orders", res.data.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  let statusClass = "";
  let statusText = "";
  switch (orderStatus) {
    case "processing":
      statusClass = "order-processing";
      statusText = "Processing";
      break;
    case "shipped":
      statusClass = "order-shipped";
      statusText = "Shipped";
      break;
    case "delivered":
      statusClass = "order-delivered";
      statusText = "Delivered";
      break;
    default:
      statusClass = "order-pending";
      statusText = "Pending";
  }
  return (
    <LayoutOne headerTop="visible">
      <Container className="my-3">
        <h2>Order Details</h2>
        <Row className="my-3">
          <Col md={12}>
            <Card>
              <Card.Header>Order Information</Card.Header>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    Order Number: {order.order_id}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Order Date: {order.order_date}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Order Status: {order.order_status}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Shipping Name: {order.shipping_first_name}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Shipping Email: {order.shipping_email}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Shipping Address: {order.shipping_address1},
                    {order.shipping_address2},{order.shipping_address_city},
                    {order.shipping_address_country},
                    {order.shipping_address_po_code}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Payment Method: {order.payment_method}
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Card>
              <Card.Header>Order Items</Card.Header>
              <Card.Body>
                <ListGroup variant="flush">
                  {orderItems.map((item) => (
                    <ListGroup.Item key={item.order_item_id}>
                      <Card
                        style={{
                          height: "200px",
                          borderRadius: "10px",
                          margin: "10px",
                          padding: "10px",
                        }}
                      >
                        <Row>
                          <Col md={12}>
                            <Row>
                              <Col md={4}>
                                <img
                                  src={`http://192.64.114.83/storage/uploads/${item.images[0]}`}
                                  alt="product image"
                                  style={{ height: "180px" }}
                                />
                              </Col>
                              <Col md={3}>
                                <h4>{order.item_title}</h4>
                                <p>{order.cost_price}</p>
                              </Col>

                              <Col md={3}>
                                <Link
                                  to={
                                    process.env.PUBLIC_URL +
                                    `/review/${item.record_id}`
                                  }
                                >
                                  <div className="ratting-form-wrapper pl-50">
                                    <h3>Add a Review</h3>
                                    <div className="star-box">
                                      <span>Your rating:</span>
                                      <div className="ratting-star">
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                      </div>
                                    </div>
                                  </div>
                                  
                                </Link>
                              </Col>
                              <Col md={2}>
                                  <div className="ratting-form-wrapper pl-50" style={{ alignItems:'center'}}>
                                    
                                    <h3 style={{cursor:'pointer'}} onClick={()=>{setReturnItem(item);setReturnModal(true)}}>Return</h3>
                                    
                                    {/* <div className="star-box">
                                      <span>Your rating:</span>
                                      
                                    </div> */}
                                  </div>
                                  </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Card>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
                {returnModal && <ReturnOrderModal returnModal={returnModal} setReturnModal={setReturnModal} item={returnItem}/>}
                {/* <InvoicePdf
                 order={order}
                 invoiceId={id}/> */}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </LayoutOne>
  );
};

export default OrderDetailsPage;
