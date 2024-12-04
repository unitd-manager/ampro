import React, { useState, useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import api from "../../constants/api";
import { useHistory } from "react-router-dom";

function Register() {
  const history = useHistory();
  const { addToast } = useToasts();
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [signUpEmailError, setSignUpEmailError] = useState("");
  const [signupPasswordError, setSignupPasswordError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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
  const validateLastName = (last_name) => {
    // name validation regex pattern
    const lastNamePattern = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    return lastNamePattern.test(last_name);
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
    {
      event.preventDefault();
      setFirstNameError("");
      setLastNameError("");
      setSignUpEmailError("");
      setSignupPasswordError("");

      if (!validateFirstName(firstName)) {
        setFirstNameError("Invalid First Name");
      }
      if (!validateLastName(lastName)) {
        setLastNameError("Invalid Last Name");
      }

      // Perform email and password validation
      if (!validateEmail(signupEmail)) {
        setSignUpEmailError("Invalid email");
      }

      if (!validatePassword(signupPassword)) {
        setSignupPasswordError(
          "Password must contain at least 8 characters, including one UpperCase letter,one LowerCase letter,special characer and one number"
        );
      }

      // If both email and password are valid, proceed with form submission
      if (validateEmail(signupEmail) && validatePassword(signupPassword)) {
        signupData.name = signupData.first_name.concat(
          " ",
          signupData.last_name
        );
        signupData.otp_no = otp;
        api
          .post("/api/register", signupData)
          .then((res) => {
            console.log(res.data.data);
            console.log('otp',otp);
            addToast("Registered Successfully", {
              appearance: "success",
              autoDismiss: true,
            });
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
      }
    }
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
          <input
            type="text"
            name="first_name"
            placeholder="Firstname"
            onChange={(e) => {
              handleSignupData(e);
              setFirstName(e.target.value);
            }}
          />
          {firstNameError && <span className="error">{firstNameError}</span>}
          <input
            type="text"
            name="last_name"
            placeholder="Lastname"
            onChange={(e) => {
              handleSignupData(e);
              setLastName(e.target.value);
            }}
          />
          {lastNameError && <span className="error">{lastNameError}</span>}
          <input
            type="mobile"
            name="mobile"
            placeholder="Mobile"
            onChange={(e) => {
              handleSignupData(e);
              setSignupPassword(e.target.value);
            }}
          />
          <input
            name="email"
            placeholder="Email"
            type="email"
            onChange={(e) => {
              handleSignupData(e);
              setSignupEmail(e.target.value);
            }}
          />
          {signUpEmailError && (
            <span className="error">{signUpEmailError}</span>
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
          {signupPasswordError && (
            <span className="error">{signupPasswordError}</span>
          )} 
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
                sendMail(event);
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
