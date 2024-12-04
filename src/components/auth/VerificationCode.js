import React, { useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";
import { useLocation, useHistory, Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import NumberModal from "../../components/ReturnOrder/NumberModal";
import api from "../../constants/api";


function VerificationCode(signupData) {
  const location = useLocation();
  const [otpNo, setOtpNo] = useState(location.state?.otpNo);
  const mobNo = location.state?.mobNo;
  const { addToast } = useToasts();
  const [userData, setUserData] = useState({});
  const history = useHistory();
  const [userEnteredOTP, setUserEnteredOTP] = useState('');
  const [error, setError] = useState(false);
  const [returnModal, setReturnModal] = useState(false);
  const newOTPs = location.state?.newOTPs;
  const [regeneratedOTP, setRegeneratedOTP] = useState(""); 
  const [newMobileNumber, setNewMobileNumber] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserData();
  };
  const handleResendOTP = (e) => {
    e.preventDefault(); 
    const newOTP = Math.floor(100000 + Math.random() * 900000);
  
    addToast("New OTP is Generated", {
      appearance: "info",
      autoDismiss: true,
    });
  
    setRegeneratedOTP(newOTP);
    setOtpNo(newOTP); // Update otpNo state with the newly generated OTP
 
    api
      .post("/api/resendOTP", { newOTP, mobNo })
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
  };
  const updateUserData = () => {
    if (userEnteredOTP.toString() === otpNo.toString()) { // Compare entered OTP with stored OTP
      api
        .post("/api/checkOTP", { otp_no: otpNo }) // Use otpNo instead of userEnteredOTP
        .then(() => {
          addToast("OTP is correct", {
            appearance: "success",
            autoDismiss: true,
          });
          history.push("/");
        })
        .catch(() => {
          addToast("Invalid OTP", {
            appearance: "error",
            autoDismiss: true,
          });
        });
    } else {
      addToast("Invalid OTP", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };
  useEffect(() => {
    // Set the regenerated OTP when it is received
    setRegeneratedOTP(location.state?.newOTP);
  }, [location.state?.newOTP]);
  useEffect(() => {
    // Update otpNo with regenerated OTP when it changes
    if (regeneratedOTP) {
      setOtpNo(regeneratedOTP);
    }
  }, [regeneratedOTP]);
  useEffect(() => {
    // Update otpNo when location state changes
    setOtpNo(location.state?.otpNo);
  }, [location.state?.otpNo]);
  
  return (
    <div>
      <div className="login-form-container">
        <div className="login-register-form">
          <form>
          <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav>
                          Your one time pass word has sent to the following
                          number {mobNo}
                          <Nav.Link
                            onClick={() => {
                              setReturnModal(true);
                            }}
                            style={{ paddingLeft: "10px" }}
                          >
                            Change Number
                          </Nav.Link>
                        </Nav>
                      </Nav.Item>
                    </Nav>
                    {returnModal && (
                      <NumberModal
                        returnModal={returnModal}
                        setReturnModal={setReturnModal}
                        mobNo={mobNo}
                        newMobileNumber={newMobileNumber}
                        setNewMobileNumber={setNewMobileNumber}
                      />
                    )}
            <div className="login-toggle-btn">
              <Link
                to={process.env.PUBLIC_URL + "/"}
                style={{ paddingLeft: "400px" }}
              >
                Verify Later
              </Link>
            </div>
            <input
  type="text"
  name="otp_no"
  value={regeneratedOTP ? `${regeneratedOTP} ` : otpNo}
  readOnly
/>
          

            <input
              type="text"
              name="otp_no"
              value={userEnteredOTP}
              onChange={(e) => {
                setUserData({ ...userData, otp_no: e.target.value });
                setUserEnteredOTP(e.target.value);
                setError(false);
              }}
            />

            <div className="button-box">
              <div className="login-toggle-btn">

              <button onClick={handleResendOTP}>
  Resend OTP
</button>
              </div>

              <button type="submit" onClick={handleSubmit}>
                <span>Submit</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default VerificationCode;
