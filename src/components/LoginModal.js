import React from "react";
import PropTypes from 'prop-types'
import { Modal} from 'react-bootstrap'
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import Register from "./auth/Register";
import LoginForModal from "./auth/LoginForModal";

function LoginModal({loginModal,setLoginModal}) {
  
  return (
    <>
            <Modal
        show={loginModal}
        onHide={()=>setLoginModal(false)}
        className="product-quickview-modal-wrapper"
      >
        <Modal.Header closeButton></Modal.Header>
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-12 ml-auto mr-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="login">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="login">
                          <h4>Login</h4>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="register">
                          <h4>Register</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="login">
                        <>
                         <LoginForModal loginModal={loginModal} setLoginModal={setLoginModal} />
                        </>
                      </Tab.Pane>
                      <Tab.Pane eventKey="register">
                       <Register/>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      
    </Modal>
    </>
  )
}

LoginModal.propTypes = {
    loginModal: PropTypes.bool,
    setLoginModal: PropTypes.func
  };
export default LoginModal
