import React, { useState, useEffect } from "react";
import { FaWhatsapp, FaCheckCircle, FaTimesCircle, FaClock, FaList } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import LayoutOne from "../../layouts/Layout";
import api from "../../constants/api";
import { getUser } from "../../common/user";
import { Link } from "react-router-dom";
import moment from "moment";

// Status badge function
const getStatusBadge = (status) => {
  switch (status) {
    case "Approved":
      return "badge status-approved";
    case "Rejected":
      return "badge status-rejected";
    case "Pending":
      return "badge status-pending";
    default:
      return "badge status-default";
  }
};

const EnquiryHistory = () => {
  const userData = getUser();
  const [enquiries, setEnquiries] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Search state

  // Fetch Enquiries
  useEffect(() => {
    api
      .post(`/enquiry/getEnquiryByContactId`, {
        contact_id: userData?.contact_id,
      })
      .then((res) => {
        const sortedEnquiries = res.data.data?.sort((a, b) => b.enquiry_id - a.enquiry_id);

        setEnquiries(sortedEnquiries);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Filter based on Enquiry Code & Order Code
  const filteredEnquiries = enquiries.filter(
    (enquiry) =>
      enquiry.enquiry_code?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enquiry.order_code?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <LayoutOne headerTop="visible">
      <div className="container mt-4">
        <h2 className="text-center mb-4 text-primary">Enquiry History</h2>

        {/* Summary Section */}
        <div className="row mb-4 justify-content-center">
          <div
            className="col-md-5 p-3 rounded text-center shadow-sm custom-summary-card me-md-3"
            style={{ backgroundColor: "#124157", color: "white" }}
          >
            <p style={{ color: "white" }}>Total Enquiries</p>
            <h5 style={{ color: "white" }}>
              <FaList /> {enquiries.length}
            </h5>
          </div>
          <div
            className="col-md-5 p-3 rounded text-center shadow-sm custom-summary-card"
            style={{ backgroundColor: "#1da6aa", color: "white" }}
          >
            <p style={{ color: "white" }}>Orders</p>
            <h5 style={{ color: "white" }}>
              <FaClock />{" "}
              {
                parseFloat(enquiries.filter((e) => e.order_code && e.order_code !== "").length
              )}
            </h5>
          </div>
        </div>

        {/* Search Input */}
        <div className="mb-4 text-center">
          <input
            type="text"
            placeholder="Search by Enquiry Code or Order Code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-control w-75 mx-auto shadow-sm"
            style={{ borderRadius: "20px", padding: "12px", fontSize: "16px" }}
          />
        </div>

        {/* Enquiry Cards */}
        <div className="row">
          {filteredEnquiries.length > 0 ? (
            filteredEnquiries.map((enquiry, index) => (
              <div className="col-6 col-md-4 col-lg-3 col-xl-2 mb-4 d-flex" key={index}>
                <Link
                  to={`${process.env.PUBLIC_URL}/enquirydetails/${enquiry.enquiry_id}`}
                  className="text-decoration-none flex-fill"
                >
                  <div className="card h-100 enquiry-card">
                    <div className="card-body text-center">
                      <h6 className="card-title fw-bold text-primary">{enquiry.enquiry_code}</h6>
                      <p className="text-muted mb-1" style={{ fontSize: "0.85rem" }}>
                        {enquiry.enquiry_date
                          ? moment(enquiry.enquiry_date).format("MMM DD, YYYY")
                          : ""}
                      </p>
                      <p className="text-muted mb-2" style={{ fontSize: "0.85rem" }}>
                        Order: {enquiry.order_code || "N/A"}
                      </p>
                      <div className={getStatusBadge(enquiry.status)}>{enquiry.status}</div>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-center text-muted">No enquiries found.</p>
          )}
        </div>
      </div>

      {/* Custom styles */}
      <style jsx="true">{`
        .custom-summary-card {
          min-height: 120px;
        }
        .status-badge {
          font-size: 0.95rem;
          padding: 6px 12px;
          border-radius: 20px;
          display: inline-block;
          margin-top: 8px;
        }
        .enquiry-card {
          border-radius: 12px;
          min-height: 170px;
          padding: 5px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Shadow for cards */
          transition: transform 0.2s ease-in-out;
        }
        .enquiry-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
        }
        .form-control {
          font-size: 16px;
        }
          status-approved {
    background-color: #124157; 
    color: white;
  }
  .status-rejected {
    background-color:rgb(50, 161, 213); 
    color: white;
  }
  .status-pending {
    background-color:rgb(122, 204, 226); 
    color: white;
  }
  .status-default {
    background-color:rgb(20, 65, 104);
    color: white;
  }
        @media (max-width: 576px) {
          .form-control {
            width: 100% !important;
          }
        }
      `}</style>
    </LayoutOne>
  );
};

export default EnquiryHistory;
