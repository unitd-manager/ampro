import PropTypes from "prop-types";
import React from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const EnquirySuccess = ({ location }) => {
 
const history=useHistory();
  // Outer container style (centered)
  const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1.5rem",
  };

  const reload = () => { 
    history.push("/")
    window.location.reload()
  }

  // Choose background style based on status
  const backgroundClass ="bg-gray-100";

  return (
    <div className={`${backgroundClass}`} style={containerStyle}>
   
        <div
          className="bg-white rounded-xl shadow-2xl p-8 md:p-12 text-center"
          style={{ maxWidth: "400px", width: "100%" }}
        >
          <div className="mb-4">
            <AiOutlineCheckCircle size={80} style={{ color: "#10B981" }} />
          </div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: "#1F2937" }}>
            Enquiry Submitted Successfully!
          </h1>
          <p className="mb-6" style={{ color: "#4B5563", fontSize: "16px" }}>
            Your enquiry has been submitted successfully.
          </p>
          <button
            onClick={() => reload()}
            style={{
              padding: "12px 24px",
              backgroundColor: "#10B981",
              color: "white",
              fontWeight: "600",
              border: "none",
              borderRadius: "9999px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#059669")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#10B981")}
          >
            Go to Home
          </button>
        </div>
      
    </div>
  );
};

EnquirySuccess.propTypes = {
  location: PropTypes.object.isRequired,
};

export default EnquirySuccess;
