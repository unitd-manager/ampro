import React, { useState, useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import api from "../../constants/api";
import { useHistory } from "react-router-dom";

function Register() {
  const history = useHistory();
  const { addToast } = useToasts();
  const [firstNameError, setFirstNameError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [signUpEmailError, setSignUpEmailError] = useState("");
  const [signupPasswordError, setSignupPasswordError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [mobile, setMobile] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [RegisterEmail, setRegisterEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupData, setSignupData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    otp_no:"",
     });

  const [otp, setOTP] = useState('');

  const generateOTP = () => {
    const min = 1000;
    const max = 9999;
    const newOTP = Math.floor(Math.random() * (max - min + 1)) + min;
    setOTP(newOTP.toString());
    
  };

  const [mailId, setmailId] = useState("");
  const getEmail = () => {
    api.get("/setting/getMailId").then((res) => {
      setmailId(res.data.data[0]);
    });
  };
  const [userMessage, setMessage] = useState("");
  const getMessage = () => {
    api.get("/setting/getMessage").then((res) => {
      setMessage(res.data.data[0]);
    });
  };
  const validateFirstName = (first_name) => {
    // name validation regex pattern
    const firstNamePattern = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    return firstNamePattern.test(first_name);
  };
  const validateMobile = (mobile) => {
    // Mobile number validation pattern (10-digit numbers)
    const mobilePattern = /^[6-9]\d{9}$/;
    return mobilePattern.test(mobile);
  };  

  const validateEmail = (email) => {
    // Email validation regex pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    // Password validation regex pattern
    const passwordPattern =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    return passwordPattern.test(password);
  };

  const signup = (event) => {
      event.preventDefault();
      setFirstNameError("");
      setMobileError("");
      setSignUpEmailError("");
      setSignupPasswordError("");

      let hasError = false;

      if (!validateFirstName(firstName)) {
        setFirstNameError("Invalid Name");
        hasError = true;
      }

      if (!validateMobile(mobile)) {
        setMobileError("Invalid Mobile Number");
        hasError = true;
      }
      
      // Perform email and password validation
      if (!validateEmail(signupEmail)) {
        setSignUpEmailError("Invalid email");
        hasError = true;
      }

      if (!validatePassword(signupPassword)) {
        setSignupPasswordError(
          "Password must contain at least 8 characters, including UpperCase, LowerCase,Special character & numbers."
        );
        hasError = true;
      }

      if (hasError) {
        return;
      }

      // If both email and password are valid, proceed with form submission
        signupData.name = signupData.first_name.concat(
          " ",
          signupData.last_name
        );
        signupData.otp_no = otp;
        signupData.creation_date = new Date().toLocaleString();
        signupData.date_of_creation = new Date().toLocaleString();
        api
          .post("/api/register", signupData)
          .then((res) => {
            console.log(res.data.data);
            console.log('otp',otp);
            addToast("Registered Successfully", {
              appearance: "success",
              autoDismiss: true,
            });
            sendMail();
            setTimeout(() => {
              // Pass the contact ID as state to the next page
              history.push({
                pathname: `/register-verification/${signupData.email}`,
               state: { otpNo: signupData.otp_no, mobNo: signupData.mobile },
             
              });
            }, 1000);
           
            // console.log('contact',res.data.data.contact_id);
            console.log('cont',signupData);
          })
          .catch((err) => {
            addToast("This Email is already Registered", {
              appearance: "error",
              autoDismiss: true,
            });
          });
  };
  const sendMail = () => {
    {
  

      // If both email and password are valid, proceed with form submission
      {
        const to = signupData.email;
        const subject = "Registration";
        api
          .post("/commonApi/sendUseremail", { to,subject })
          .then((res) => {
            console.log(res.data.data);

            addToast("Registration Email has sent Successfully", {
              appearance: "success",
              autoDismiss: true,
            });
            setTimeout(() => {
              history.push("/");
            }, 100);
          })
          .catch((err) => {
            addToast("Registration Email is already Exist", {
              appearance: "error",
              autoDismiss: true,
            });
          });
      }
    }
    

      {
        const to = mailId.email;
        const text = JSON.stringify(signupData);
        const subject = "Registration";
        const dynamic_template_data = {
          first_name: signupData.first_name,
          email: signupData.email,
          password: signupData.password,
        };
        api
          .post("/commonApi/sendregisteremail", {
            to,
            text,
            subject,
            dynamic_template_data,
          })
          .then(() => {});
      }
    
  };
  const handleSignupData = (e) => {
    e.stopPropagation();
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
    console.log("signup", signupData);
  };

  useEffect(() => {
    getEmail();
    getMessage();
    generateOTP();
  }, []);
  return (
    <div className="login-form-container">
      <div className="login-register-form">
        <form>
        {firstNameError && <span className="error">{firstNameError}</span>}
        <input
            type="text"
            name="first_name"
            placeholder="Name"
            onChange={(e) => {
              handleSignupData(e);
              setFirstName(e.target.value);
            }}
          />
        {mobileError && <span className="error">{mobileError}</span>}
        <input
          type="text"
          name="mobile"
          placeholder="Mobile"
          value={mobile}
          onChange={(e) => {
            setMobile(e.target.value);  // Update mobile state
            handleSignupData(e);        // Update signupData state
          }}
        />


          {signUpEmailError && (
            <span className="error">{signUpEmailError}</span>
          )}
          <input
            name="email"
            placeholder="Email"
            type="email"
            onChange={(e) => {
              handleSignupData(e);
              setSignupEmail(e.target.value);
            }}
          />
          {signupPasswordError && (
            <span className="error">{signupPasswordError}</span>
          )} 
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => {
              handleSignupData(e);
              setSignupPassword(e.target.value);
            }}
          />
          <input
           type="hidden"
          name="otp_no"
          value={otp}
          />   
          <div className="button-box">
            <button
              type="submit"
              onClick={(event) => {
                signup(event);
                
              }}
            >
              <span>Register</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
