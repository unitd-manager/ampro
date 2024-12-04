import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useToasts } from "react-toast-notifications";
import {  useHistory } from "react-router-dom";
import {
  Badge,
  Button,
  Col,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import api from "../../constants/api";

function ReturnOrderModal({ returnModal, setReturnModal, mobNo, newMobileNumber, setNewMobileNumber }) {
 
const history = useHistory();
const [userData, setUserData] = useState({ mobile: mobNo });
    const { addToast } = useToasts();
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(0);


  const handleUserData = (e) => {
    setUserData({ mobile: e.target.value });
  };
  const getUser=(mob)=>{
    api
    .post("/api/getContactsById", { mobNo: mob })
    .then((res) => {
      setUserData(res.data.data[0]);
      setNewMobileNumber(res.data.data[0].mobile);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const getUserDetail=()=>{
    let mob= newMobileNumber?newMobileNumber:mobNo;
    api
    .post("/api/getContactsById", { mobNo: Number(mob) })
    .then((res) => {
      setUserData(res.data.data[0]);
      setNewMobileNumber(res.data.data[0].mobile);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const updateMobile = () => {
   let mob= newMobileNumber?newMobileNumber:mobNo;
    api
      .post("/api/changeNumber", { mobNo:Number(mob), mobile: Number(userData.mobile) })
      .then((res) => {
        addToast("Account Info Updated successfully", {
          appearance: "success",
          autoDismiss: true,
        });
        getUser(Number(userData.mobile));
      })
      .catch((err) => {
        console.log(err);
        addToast("Unable to Edit the Account Info", {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };
  const handleResendOTP = () => {
    const newOTP = Math.floor(100000 + Math.random() * 900000);

    addToast("Unable to Edit the Account Info", {
      appearance: "info",
      autoDismiss: true,
    });

    api
      .post("/api/changeResendOTP", { mobNo: userData.mobile, newOTP }) // Update the API endpoint and request payload
      .then(() => {
        addToast("OTP updated successfully", {
          appearance: "success",
          autoDismiss: true,
        });
      })
      .catch(() => {
        addToast("Failed to update OTP", {
          appearance: "error",
          autoDismiss: true,
        });
      });

    history.push({
      pathname: process.env.PUBLIC_URL + "/register-verification",
      state: { newOTP: newOTP, mobNo: mobNo },
    });
  };
  useEffect(() => {
   getUserDetail();
  }, []);
  return (
    <div>
      <Modal isOpen={returnModal}>
        <ModalHeader>
          <Row>
            <span
              onClick={() => {
                setReturnModal(false);
              }}
              style={{ cursor: "pointer" }}
            >
              <Badge>x</Badge>
            </span>
          </Row>
        </ModalHeader>
        <ModalBody>
          <div>
            {error != "" && <span>{error}</span>}
            <Row>
              <Col> Mobile Number</Col>
            </Row>
            <Row>
              <Col>
              <input
                  type="text"
                  name="mobile"
                  value={userData && userData.mobile}
                  onChange={handleUserData}
                />
              </Col>
              <Col>
                <Button
               
               onClick={() => {
                updateMobile();
                handleResendOTP();
              }}
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}
ReturnOrderModal.propTypes = {
  returnModal: PropTypes.bool,
  setReturnModal: PropTypes.func,
  item: PropTypes.object,
  newMobileNumber:PropTypes.number,
  setNewMobileNumber:PropTypes.func
};

export default ReturnOrderModal;
