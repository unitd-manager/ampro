import React from "react";
import { Modal, ModalBody } from "reactstrap";
import "../assets/css/payment-modal.css";


// modalStyle is now handled by payment-modal.css for embossed look

const PaymentModal = ({ isOpen, toggle, children }) => (
  <Modal isOpen={isOpen} toggle={toggle} centered style={{zIndex: 2000}} contentClassName="payment-modal-content">
    <ModalBody className="payment-modal-content">
      {children}
    </ModalBody>
  </Modal>
);

export default PaymentModal;
