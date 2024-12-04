import React,{useState} from 'react'
import PropTypes from 'prop-types'
import { useToasts } from "react-toast-notifications";
import { Link} from "react-router-dom";
import api from '../../constants/api';

function LoginForModal({loginModal,setLoginModal}) {
    const { addToast } = useToasts();

    const [signinData, setSigninData] = useState({
        email: "",
        password: "",
      });
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [emailError, setEmailError] = useState("");
      const [passwordError, setPasswordError] = useState("");


    
      const validateEmail = (email) => {
        // Email validation regex pattern
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
      };
     
      const validatePassword = (password) => {
        // Password validation regex pattern
        const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
        return passwordPattern.test(password);
      };
    const handleSigninData = (e) => {
      e.stopPropagation();
        setSigninData({ ...signinData, [e.target.name]: e.target.value });
        console.log("signin", signinData);
      };
    

    const signin = (event) => {
        event.preventDefault();
        // Reset previous errors
        setEmailError("");
        setPasswordError("");
    
        // Perform email and password validation
        if (!validateEmail(email)) {
          setEmailError("Invalid email");
        }
    
        if (!validatePassword(password)) {
          setPasswordError(
            "Password must contain at least 8 characters, including one UpperCase letter,one LowerCase letter,special characer and one number"
          );
        }
    
        // If both email and password are valid, proceed with form submission
        if (validateEmail(email) && validatePassword(password)) {
          api.post("/api/login", signinData).then((res) => {
            if (res && res.status === "400") {
              alert("Invalid Username or Password");
              addToast("Invalid Username or Password", {
                appearance: "error",
                autoDismiss: true,
              });
            } 
            else {
              localStorage.setItem("user", JSON.stringify(res.data.data));
              localStorage.setItem("token", JSON.stringify(res.data.token));
              setLoginModal(false);
              setTimeout(()=>{
               
                window.location.reload()
              },200)
            }
          }).catch((err)=>{
            addToast("Invalid Username or Password", {
              appearance: "error",
              autoDismiss: true,
            });
          });
        }
      };
  return (
    <div>
         
                          <div className="login-form-container">
                            <div className="login-register-form">
                              <form>
                                <input
                                autoFocus
                                  type="text"
                                  name="email"
                                  placeholder="Email"
                                  onChange={(e) => {
                                    handleSigninData(e);
                                    setEmail(e.target.value);
                                  }}
                                />
                                {emailError && (
                                  <span className="error">{emailError}</span>
                                )}
                                <input
                                autoFocus
                                  type="password"
                                  name="password"
                                  placeholder="Password"
                                  onChange={(e) => {
                                    handleSigninData(e);
                                    setPassword(e.target.value);
                                  }}
                                />
                                {passwordError && (
                                  <span className="error">{passwordError}</span>
                                )}
                                <div className="button-box">
                                  <div className="login-toggle-btn">
                                    <input type="checkbox" />
                                    <label className="ml-10">Remember me</label>
                                    <Link
                                      to={
                                        process.env.PUBLIC_URL +
                                        "/forgot-password"
                                      }
                                    >
                                      Forgot Password?
                                    </Link>
                                  </div>
                                  <button type="submit" onClick={signin}>
                                    <span>Login</span>
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        
    </div>
  )
}
LoginForModal.propTypes = {
    loginModal: PropTypes.bool,
    setLoginModal: PropTypes.func
  };
export default LoginForModal