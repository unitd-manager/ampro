import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import LayoutOne from "../../layouts/Layout";
import api from "../../constants/api";
import { getUser } from "../../common/user";

const EnquiryHistory = () => {
  const userData = getUser();

  const [enquiries, setEnquiries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [newAddress, setNewAddress] = useState({
    shipper_name: "",
    address_type: "Shipping",
    address_flat: "",
    address_street: "",
    address_town: "",
    address_state: "",
    address_country: "",
    address_po_code: "",
  });

  // useEffect(() => {
  //   fetchAddresses();
  // }, []);

  const fetchAddresses = () => {
    api
      .post(`/address/getQuoteTrackItemsById`, {
        contact_id: userData?.contact_id,
      })
      .then((res) => {
        setEnquiries(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prevState) => ({
      ...prevState,
      [name]: value ? String(value).trim() : "",
    }));
  };

  const [errors, setErrors] = useState({});
  
  const validateFields = () => {
    let validationErrors = {};
  
    if (!newAddress.shipper_name.trim()) validationErrors.shipper_name = "Shipper Name is required";
    if (!newAddress.address_flat.trim()) validationErrors.address_flat = "Flat/House No. is required";
    if (!newAddress.address_town.trim()) validationErrors.address_town = "Town/City is required";
    if (!newAddress.address_country.trim()) validationErrors.address_country = "Country is required";
    if (!newAddress.address_po_code.trim()) {
      validationErrors.address_po_code = "Postal Code is required";
    } else if (!/^\d+$/.test(newAddress.address_po_code)) {
      validationErrors.address_po_code = "Postal Code must be numeric";
    }
  
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };
    
  const handleSaveAddress = () => {
    if (!validateFields()) return;

    const apiEndpoint = editMode
      ? `/address/editEquipmentRequestItem`
      : `/address/insertQuoteItems`;

    const addressData = { ...newAddress, contact_id: userData.contact_id };
    if (editMode) addressData.company_address_id = selectedAddressId;

    api
      .post(apiEndpoint, addressData)
      .then(() => {
        alert(editMode ? "Address Updated Successfully" : "Address Added Successfully");
        setShowModal(false);
        fetchAddresses();
      })
      .catch((err) => console.log(err));
  };

  const handleEditAddress = (address) => {
    setNewAddress(address);
    setSelectedAddressId(address.customer_address_id);
    setEditMode(true);
    setShowModal(true);
  };

  const modalStyles = {
    maxHeight: "90vh",
    display: "flex",
    flexDirection: "column",
  };
  
  const modalBodyStyles = {
    overflowY: "auto",
    maxHeight: "60vh",
  };

  const handleDeleteAddress = (addressId) => {
    if (!window.confirm("Are you sure you want to delete this address?")) return;

    api
      .post("/address/deleteTrackEditItem", { customer_address_id: addressId })
      .then(() => {
        alert("Address Deleted Successfully");
        fetchAddresses();
      })
      .catch((err) => console.log(err));
  };

  return (
    <LayoutOne headerTop="visible">
      <div className="container mt-4">
        <h2 className="text-center mb-3">Shipping Address</h2>

        {/* Add Shipment Address Button */}
        <div className="text-center mb-3">
          <button
            className="btn btn-primary"
            onClick={() => {
              setNewAddress({
                shipper_name: "",
                address_type: "Shipping",
                address_flat: "",
                address_street: "",
                address_town: "",
                address_state: "",
                address_country: "",
                address_po_code: "",
              });
              setEditMode(false);
              setShowModal(true);
            }}
          >
            Add Shipment Address
          </button>
        </div>

        {/* Enquiries List */}
        <div className="container">
          <div className="row shippingAddress">
          {enquiries?.map((enquiry, index) => {
              return (
                <div key={index} className="col-md-6 mb-3">
                  <div className="card shadow-sm">
                    <div className="card-body">
                      <h6 className="card-title">{enquiry.shipper_name}</h6>
                      <p className="text-muted">
                        {enquiry.address_flat}, {enquiry.address_street}, {enquiry.address_town}
                      </p>
                      <p className="text-muted">
                        {enquiry.address_state}, {enquiry.address_country} {enquiry.address_po_code}
                      </p>
                      <div className="d-flex justify-content-end">
                        <button
                          className="btn btn-sm btn-info me-2"
                          onClick={() => handleEditAddress(enquiry)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger ml-3"
                          onClick={() => handleDeleteAddress(enquiry.customer_address_id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" style={modalStyles} role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editMode ? "Edit Shipment Address" : "Add Shipment Address"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                >
                  X
                </button>
              </div>
              <div className="modal-body" style={modalBodyStyles}>
                {[
                  { name: "shipper_name", placeholder: "Shipper Name" },
                  { name: "address_flat", placeholder: "Flat/House No." },
                  { name: "address_street", placeholder: "Street" },
                  { name: "address_town", placeholder: "Town/City" },
                  { name: "address_state", placeholder: "State" },
                  { name: "address_country", placeholder: "Country" },
                  { name: "address_po_code", placeholder: "Postal Code" },
                ].map((field) => (
                  <div key={field.name} className="mb-2">
                    {errors[field.name] && <small className="text-danger">{errors[field.name]}</small>}
                    <input
                      type="text"
                      className="form-control"
                      name={field.name}
                      placeholder={field.placeholder}
                      value={newAddress[field.name]}
                      onChange={handleInputChange}
                    />
                  </div>
                ))}
                <div className="mb-2">
                  <select className="form-control" name="address_type" value={newAddress.address_type} onChange={handleInputChange}>
                    <option value="Shipping">Shipping</option>
                    <option value="Delivery">Delivery</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSaveAddress}
                >
                  {editMode ? "Update Address" : "Save Address"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </LayoutOne>
  );
};

export default EnquiryHistory;
