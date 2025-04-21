import React, { useState } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductsLinkedModal = ({productsLinked}) => {
  const [show, setShow] = useState(false);



  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* Trigger Link/Button */}
      <span onClick={handleShow} className="product-link" style={{ fontSize: '18px', fontWeight: '500', cursor: 'pointer' }}>
  View Products Linked
</span>

      {/* Modal */}
      <Modal show={show} onHide={handleClose} centered size="lg" dialogClassName="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>Products Linked</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Grade</th>
              
                
              </tr>
            </thead>
            <tbody>
              {productsLinked?.map((product, index) => (
                <tr key={product.enq_prod_id}>
                  <td>{index + 1}</td>
                  <td>{product.product_title}</td>
                  <td>{product.grades}</td>
                 
                  
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Custom Styling */}
      <style jsx>{`
        .product-link {
          color: #007bff;
          text-decoration: underline;
          cursor: pointer;
        }

        .product-link:hover {
          text-decoration: none;
        }

        .custom-modal .modal-content {
          border-radius: 16px;
          overflow: hidden;
          max-width: 800px;
          width: 95%;
          margin: auto;
        }

        @media (max-width: 768px) {
          .custom-modal .modal-content {
            width: 95%;
          }
        }

        .modal-title {
          font-size: 1.5rem;
          font-weight: 600;
        }

        table {
          font-size: 1rem;
        }

        th, td {
          vertical-align: middle;
        }
      `}</style>
    </>
  );
};

export default ProductsLinkedModal;
