import React, { useState } from 'react';
import { Modal, Button, Form, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const DiscountModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* Trigger Button */}
      <Button variant="primary" onClick={handleShow}>
        Open Discount Offer
      </Button>

      {/* Modal */}
      <Modal show={show} onHide={handleClose} centered dialogClassName="custom-modal">
        <Modal.Body className="p-0 position-relative">
          {/* X Close Button */}
          <button
            type="button"
            className="btn-close-custom"
            aria-label="Close"
            onClick={handleClose}
          >
            ✕
          </button>

          {/* Main Content */}
          <div className="text-center p-4 p-md-5">
            <h6 className="text-uppercase fw-bold mb-2 small-title">Sign up now & receive</h6>
            <h3 className="fw-bold mb-3 main-title">
              25% OFF THE FIRST 6 WEEKS OF YOUR WEEKLY MEAL SUBSCRIPTION. SAVE UP TO $210.
            </h3>
            <p className="mb-1 sub-text">We'll email you a promo code right to your inbox!</p>
            <p className="text-muted small">(and we promise not to spam you with emails)</p>
          </div>

          {/* Form Section */}
          <div className="form-section">
            <Container fluid className="p-0">
              <Form className="d-flex flex-wrap justify-content-center align-items-center gap-2">
                <Form.Control placeholder="First Name" className="custom-input" />
                <Form.Control placeholder="Last Name" className="custom-input" />
                <Form.Control placeholder="Email" className="custom-input" />
                <Button variant="light" type="submit" className="fw-bold custom-btn">
                  GET MY 25%
                </Button>
              </Form>
            </Container>
          </div>
        </Modal.Body>
      </Modal>

      {/* Custom Styling */}
      <style jsx>{`
        .custom-modal .modal-content {
          border-radius: 16px;
          overflow: hidden;
          max-width: 750px; /* Proper width */
          width: 95%;
          margin: auto;
          border: none;
        }

        .main-title {
          font-size: 1.5rem; /* Decreased font size */
          line-height: 1.4;
        }

        .small-title {
          font-size: 1rem; /* Smaller heading */
        }

        .sub-text {
          font-size: 0.9rem;
        }

        .btn-close-custom {
          position: absolute;
          top: 15px;
          right: 15px;
          background: transparent;
          border: none;
          font-size: 1.6rem;
          color: #000;
          cursor: pointer;
        }

        .btn-close-custom:hover {
          opacity: 0.7;
        }

        .form-section {
          background-color: #124157;
          padding: 20px 30px;
          border-bottom-left-radius: 16px;
          border-bottom-right-radius: 16px;
        }

        .custom-input {
          padding: 0.65rem 1rem;
          font-size: 0.9rem;
          border-radius: 8px;
          border: 1px solid #ccc;
          min-width: 180px;
          margin-top: 10px;
        }
         .custom-input:first-child {
      margin-top: 0; /* Remove margin from first input */
    }
        .custom-btn {
          padding: 0.65rem 1.5rem;
          font-size: 0.9rem;
          border-radius: 8px;
          white-space: nowrap;
          margin-top: 10px;
        }

        /* Responsive tweaks */
        @media (max-width: 768px) {
          .main-title {
            font-size: 1.2rem;
          }
          .custom-input {
            min-width: 100%;
            flex: 1 1 100%;
          }
          .custom-btn {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
};

export default DiscountModal;
