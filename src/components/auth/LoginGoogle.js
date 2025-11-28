import React,{useState} from 'react'
import { useToasts } from "react-toast-notifications";
import { Link, useHistory } from "react-router-dom";
import api from '../../constants/api';
import { useDispatch } from "react-redux";
import { GoogleLogin } from '@react-oauth/google';


import {
  fetchCartData } from '../../redux/actions/cartItemActions';
  import {
    fetchWishlistData } from '../../redux/actions/wishlistItemActions';

function Login() {
    const { addToast } = useToasts();
const dispatch = useDispatch();
    const [signinData, setSigninData] = useState({
        email: "",
        password: "",
      });
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [emailError, setEmailError] = useState("");
      const [passwordError, setPasswordError] = useState("");


      const history=useHistory();
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
            "Password must contain at least 8 characters, including UpperCase, LowerCase,Special character & numbers."
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
     dispatch(fetchCartData(res.data.data));
     dispatch(fetchWishlistData(res.data.data));
              setTimeout(()=>{
    history.push('/')
              },300)
            }
          }).catch((err)=>{
            addToast("Invalid Username or Password", {
              appearance: "error",
              autoDismiss: true,
            });
          });
        }
      };

      const handleGoogleLogin = async (credentialResponse) => {
  try {
    const idToken = credentialResponse.credential; // Google ID Token

    const res = await api.post("/api/google-login", {
      token: idToken,
    });

    if (res.data.status === "success") {
      localStorage.setItem("user", JSON.stringify(res.data.data));
      localStorage.setItem("token", JSON.stringify(res.data.token));

      dispatch(fetchCartData(res.data.data));
      dispatch(fetchWishlistData(res.data.data));

      addToast("Login success", { appearance: "success" });

      setTimeout(() => {
        history.push("/");
      }, 300);
    }
  } catch (err) {
    addToast("Google Login Failed", { appearance: "error" });
  }
};

  return (
    <div>
         
                          <div className="login-form-container">
                            <div className="login-register-form">
                              <form>
                              {emailError && (
                                  <span className="error">{emailError}</span>
                                )}
                                <input
                                  type="text"
                                  name="email"
                                  placeholder="Email"
                                  onChange={(e) => {
                                    handleSigninData(e);
                                    setEmail(e.target.value);
                                  }}
                                />
                                {passwordError && (
                                  <span className="error">{passwordError}</span>
                                )}
                                <input
                                  type="password"
                                  name="password"
                                  placeholder="Password"
                                  onChange={(e) => {
                                    handleSigninData(e);
                                    setPassword(e.target.value);
                                  }}
                                />
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
                                  <div style={{ marginTop: "20px", textAlign: "center" }}>
  <GoogleLogin
    onSuccess={(credentialResponse) => handleGoogleLogin(credentialResponse)}
    onError={() => {
      addToast("Google Login Failed", { appearance: "error" });
    }}
  />
</div>
                                </div>
                              </form>
                            </div>
                          </div>
                        
    </div>
  )
}

export default Login