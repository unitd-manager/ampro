import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaUpload, FaWhatsapp, FaFileDownload, FaFilePdf, FaTrash } from "react-icons/fa";
import { useHistory, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import LayoutOne from "../../layouts/Layout";
import api from "../../constants/api";
import moment from "moment";
import { useToasts } from "react-toast-notifications";
import { Alert, Badge, Button, Card, Col, Row } from "reactstrap";
import { Form } from "react-bootstrap";
import ProductsLinkedModal from "../../components/EnquiryProductsLinked";
import Swal from "sweetalert2";

const EnquiryDetails = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [enquiries, setEnquiries] = useState({});
  const [tracking, setTracking] = useState({});
  const [profile, setProfile] = useState({});
  const [receiptFile, setReceiptFile] = useState(null);
  const [receiptFileDoc, setReceiptFileDoc] = useState(null);
  const [receiptArrival, setReceiptArrival] = useState(null);
  const [receiptArrival1, setReceiptArrival1] = useState(null);

  const [receiptUrl, setReceiptUrl] = useState("");
  const [receiptUrl1, setReceiptUrl1] = useState("");
  const [receiptUrl2, setReceiptUrl2] = useState("");
  const [receiptUrl3, setReceiptUrl3] = useState("");
  const [addressList, setAddressList] = useState([]);
  const [productsLinked, setProductsLinked] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null); // State for selected address
  const[uploaded, setUploaded]=useState(null);
  const[uploaded1, setUploaded1]=useState(null);
  const[uploaded2, setUploaded2]=useState(null);


  const [selectedAddressString, setSelectedAddressString] = useState('');
  console.log('selectedAddressString',selectedAddressString);
  const { id } = useParams();
  const history = useHistory();
 const { addToast } = useToasts();

 const profileAddress = {
  customer_address_id: "profile", // Unique id for selection
  shipper_name: profile.first_name + ' ' + (profile.last_name || ''),
  address_flat: profile.address2 || '',
  address_street: profile.address_area || '',
  address_city: profile.address_city || '',
  address_town: profile.address_town || '',
  address_po_code: profile.address_po_code || '',
  address_state: profile.address_state || '',
  address_country: profile.address_country || '',

};
console.log('profile',profile);
  useEffect(() => {
    api
    .post(`/contact/getContactsById`, { contact_id: user.contact_id })
    .then((res) => {
      setProfile(res.data.data[0]);
      
    })
    .catch((err) => console.log(err));
    api
      .post(`/enquiry/getEnquiryById`, { enquiry_id: id })
      .then((res) => {
        setEnquiries(res.data.data[0]);
        
      })
      .catch((err) => console.log(err));

      api
      .post(`/enquiry/getEnquiryProductsByEnquiryId`, { enquiry_id: id })
      .then((res) => {
        setProductsLinked(res.data.data);
        
      })
      .catch((err) => console.log(err));

    api.post('/file/getListOfFiles', { record_id: id, room_name: 'PaymentReceipt' }).then((res) => {
      setReceiptUrl(res.data);
    });
    api.post('/file/getListOfFiles', { record_id: id, room_name: 'OnDocPayment' }).then((res) => {
      setReceiptUrl1(res.data);
    });
    api.post('/file/getListOfFiles', { record_id: id, room_name: 'AfterArrival' }).then((res) => {
      setReceiptUrl2(res.data);
    });
    api.post('/file/getListOfFiles', { record_id: id, room_name: 'Enquiry' }).then((res) => {
      setReceiptUrl3(res.data);
    });
if(user){
    api
    .post(`/contact/getAddressessByContactId`, { contact_id: user.contact_id })
    .then((res) => {
      setAddressList(res.data.data);
      
    })
    .catch((err) => console.log(err));
  }

  api
  .post(`/tracking/getQuoteTrackItemsById`, { enquiry_id: id })
  .then((res) => {
    setTracking(res.data.data[0]);
    
  })
  .catch((err) => console.log(err));

  
  }, [id]);

  const deleteFile = (fileId) => {
    Swal.fire({
      title: `Are you sure?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#124157',
      cancelButtonColor: '#grey',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        api
          .post('/file/deleteFile', { media_id: fileId })
          .then((res) => {
            console.log(res);
            Swal.fire('Deleted!', 'Media has been deleted.', 'success');
            //setViewLineModal(false)

            window.location.reload();
          })
          .catch(() => {
            addToast("Unable to Upload file", {
              appearance: "success",
              autoDismiss: true,
            })
          });
      }
    });
  };

  const combinedAddressList = [profileAddress, ...addressList];

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.type !== "application/pdf") {
        alert("Only PDF files are allowed!");
        e.target.value = "";
        return;
      }
      setReceiptFile(file);
    }
  };
console.log('receiptUrl',receiptUrl)
  const handleUpload = async () => {
    if (!receiptFile) {
      alert("Please select a PDF file first.");
      return;
    }

    const formData = new FormData();
    formData.append("files", receiptFile);
    formData.append("enquiry_id", id);
    formData.append('record_id', id)
    formData.append('room_name', 'PaymentReceipt')
    formData.append('alt_tag_data', 'PaymentReceipt')
    formData.append('description', 'PaymentReceipt')
    api.post('/file/uploadFiles',formData,{onUploadProgress:(filedata)=>{
      console.log( Math.round((filedata.loaded/filedata.total)*100))
      setUploaded( Math.round((filedata.loaded/filedata.total)*100))                 
    }}).then(()=>{
      addToast("Files Uploaded Successfully", {
        appearance: "success",
        autoDismiss: true,
      })
      setTimeout(() => {
          window.location.reload()
      }, 400);
    }).catch(()=>{                  
      addToast("Unable to upload file", {
        appearance: "error",
        autoDismiss: true,
      })                                
    })
  };

  const handleFileDocChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.type !== "application/pdf") {
        alert("Only PDF files are allowed!");
        e.target.value = "";
        return;
      }
      setReceiptFileDoc(file);
    }
  };

  const handleUploadOnDoc = async () => {
    if (!receiptFileDoc) {
      alert("Please select a PDF file first.");
      return;
    }

    const formData = new FormData();
    formData.append("files", receiptFileDoc);
    formData.append("enquiry_id", id);
    formData.append('record_id', id)
    formData.append('room_name', 'OnDocPayment')
    formData.append('alt_tag_data', 'OnDocPayment')
    formData.append('description', 'OnDocPayment')
    api.post('/file/uploadFiles',formData,{onUploadProgress:(filedata)=>{
      console.log( Math.round((filedata.loaded/filedata.total)*100))
      setUploaded1( Math.round((filedata.loaded/filedata.total)*100))                 
    }}).then(()=>{
      addToast("Files Uploaded Successfully", {
        appearance: "success",
        autoDismiss: true,
      })
      setTimeout(() => {
          window.location.reload()
      }, 400);
    }).catch(()=>{                  
      addToast("Unable to upload file", {
        appearance: "error",
        autoDismiss: true,
      })                                
    })
  }; 

  const handleArrival = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.type !== "application/pdf") {
        alert("Only PDF files are allowed!");
        e.target.value = "";
        return;
      }
      setReceiptArrival(file);
    }
  };

  const handleUploadArrival = async () => {
    if (!receiptArrival) {
      alert("Please select a PDF file first.");
      return;
    }

    const formData = new FormData();
    formData.append("files", receiptArrival);
    formData.append("enquiry_id", id);
    formData.append('record_id', id)
    formData.append('room_name', 'AfterArrival')
    formData.append('alt_tag_data', 'AfterArrival')
    formData.append('description', 'AfterArrival')
    api.post('/file/uploadFiles',formData,{onUploadProgress:(filedata)=>{
      console.log( Math.round((filedata.loaded/filedata.total)*100))
      setUploaded2( Math.round((filedata.loaded/filedata.total)*100))                 
    }}).then(()=>{
      addToast("Files Uploaded Successfully", {
        appearance: "success",
        autoDismiss: true,
      })
      setTimeout(() => {
          window.location.reload()
      }, 400);
    }).catch(()=>{                  
      addToast("Unable to upload file", {
        appearance: "error",
        autoDismiss: true,
      })                                
    })
  };

  

  const generateOrder = () => {
    if(selectedAddressString){
    enquiries.modification_date = moment().format('DD-MM-YYYY h:mm:ss a');
    enquiries.shipping_address = selectedAddressString;
      api
        .post('/enquiry/updateShipping', enquiries)
        .then(() => {
          addToast("Address updated Successfully", {
            appearance: "success",
            autoDismiss: true,
          })
          // setTimeout(() => {
          //   window.location.reload();
          // }, 300);
        })
        .catch(() => {
          addToast("Unable to update shipping address", {
            appearance: "error",
            autoDismiss: true,
          })
        
        });
      }else{
        addToast("Please Select the shipping address", {
          appearance: "error",
          autoDismiss: true,
        })
      
      }
   
  };


  const handleSelect = (id) => {
    setSelectedAddress(id);
  
    const selectedAddr = combinedAddressList.find(addr => addr.customer_address_id === id);
  
    if (selectedAddr) {
      // Concatenate address fields
      const fullAddress = `${selectedAddr.shipper_name}, ${selectedAddr.address_flat}, ${selectedAddr.address_street}, ${selectedAddr.address_city}, ${selectedAddr.address_town}, ${selectedAddr.address_state}, ${selectedAddr.address_country} - ${selectedAddr.address_po_code}${selectedAddr.phone ? `, Phone: ${selectedAddr.phone}` : ''}`;
  
      // Set the formatted address string
      setSelectedAddressString(fullAddress);
    }
  };
  
  return (
    <LayoutOne headerTop="visible">
      <div className="container mt-4">
        <div className="d-flex align-items-center justify-content-between mb-3 w-100">
          <div className="d-flex align-items-center">
            <button className="btn btn-outline-primary me-3" onClick={() => history.goBack()}>
              <FaArrowLeft className="me-2" /> Back
            </button>
            <h4 className="m-4">Enquiry Details</h4>
            <p className="m-4">Creation Date : {enquiries?.creation_date?.toLocaleString()}</p>
          </div>
          <div>
            {productsLinked && <ProductsLinkedModal productsLinked={productsLinked} />}
          </div>
        </div>
        <div>
          <Card className="p-4 shadow-sm rounded-3">
            {/* Enquiry Code & Status */}
            <h5 className="fw-bold mb-4">
              Enquiry Code: <span className="text-primary">{enquiries?.enquiry_code || 'N/A'}</span>
              {enquiries?.status && (
                <Badge
                  bg={enquiries.status === "Active" ? "success" : "secondary"}
                  className="ms-2 text-white ml-3"
                >
                  {enquiries.status}
                </Badge>
              )}
            </h5>

            <Row className="gy-3">
              {/* Title */}
              <Col md={6}>
                <div className="mb-3">
                  <p className="text-muted mb-1">Title:</p>
                  <p className="fw-bold m-0">{enquiries?.title || 'N/A'}</p>
                </div>
              </Col>

              {/* Enquiry Type */}
              <Col md={6}>
                <div className="mb-3">
                  <p className="text-muted mb-1">Enquiry Type:</p>
                  <p className="fw-bold m-0">{enquiries?.enquiry_type || 'N/A'}</p>
                </div>
              </Col>

              {/* Address */}
              <Col md={6}>
                <div className="mb-3">
                  <p className="text-muted mb-1">Address:</p>
                  <p className="fw-bold m-0">{enquiries?.shipping_address || 'N/A'}</p>
                </div>
              </Col>

              {/* Creation Date */}
              <Col md={6}>
                <div>
                  <p className="text-muted mb-1">Creation Date:</p>
                  <p className="fw-bold m-0">
                    {enquiries?.creation_date ? moment(enquiries.creation_date).format("MMM DD, YYYY") : 'N/A'}
                  </p>
                </div>
              </Col>

              <Col md={6}>
                <div>
                  <p className="text-muted mb-1">Order Code:</p>
                  <p className="fw-bold m-0">{enquiries?.order_code || 'N/A'}</p>
                </div>
              </Col>
            </Row>
          </Card>

          <h5 className="mb-4 mt-4 fw-bold">Select Address</h5>

          {combinedAddressList?.map((addr) => (
          <Card
            key={addr.customer_address_id}
            className={`mb-3 p-3 shadow-sm ${selectedAddress === addr.customer_address_id ? 'border-primary' : ''}`}
            style={{ borderRadius: '15px' }}
          >
            <Row>
              <Col xs={10}>
                <div className="d-flex align-items-center mb-2">
                  <Badge bg="secondary" className="me-2">
                    {/* <h6 className="m-0 fw-bold text-white">{addr.shipper_name || "Address"}</h6> */}
                    <h6 className="m-0 fw-bold text-white">
                      {addr.customer_address_id === 'profile' ? 'Profile Address' : (addr.shipper_name || 'Address')}
                    </h6>
                  </Badge>        
                </div>
                <div className="text-muted small">
                  {addr.address_flat}, {addr.address_street}<br />
                  {addr.address_city}, {addr.address_town} - {addr.address_po_code}<br />
                  {addr.address_state}, {addr.address_country}
                </div>
                {addr.phone && (
                  <p className="m-0 text-muted small mt-1"><b>Phone:</b> {addr.phone}</p>
                )}
              </Col>
              <Col xs={2} className="text-end">
                <Form.Check
                  type="radio"
                  name="addressSelect"
                  checked={selectedAddress === addr.customer_address_id}
                  onChange={() => handleSelect(addr.customer_address_id)}
                  style={{ transform: 'scale(0.5)' }}
                />
              </Col>
            </Row>
          </Card>
        ))}

        <button className="btn btn-primary mt-2" onClick={()=>generateOrder()}>
            Save Address
        </button><br/><br/>
      </div>

        {/* Stylish File Upload Section */}
      
        <div className="card p-4 text-center border-dashed mb-3">
        <h6 className="d-flex justify-content-between align-items-center my-2 fw-bold mt-4">Payment Receipt</h6>
          <div className="custom-file-upload">
            <input
              type="file"
              id="fileInput"
              className="d-none"
              accept="application/pdf"
              onChange={handleFileChange}
            />
            <label htmlFor="fileInput" className="btn btn-outline-primary">
              <FaUpload className="me-2" /> Choose PDF File
            </label>
          </div>

          {receiptFile && (
            <p className="mt-2 text-success">
              <FaFilePdf className="me-2" />
              {receiptFile.name}
            </p>
          )}
          { uploaded &&  <div className='progress mt-2'>
            <div className="progress-bar h-4" role='progressbar'
              aria-valuenow={uploaded}
              aria-valuemin='0'
              aria-valuemax='100'
              style={{width:`${uploaded}%`}}>
                {`${uploaded}% uploaded`}
            </div>
          </div>}
          {receiptFile && (<button className="btn btn-primary mt-2" onClick={handleUpload} disabled={!receiptFile}>
            <FaUpload className="me-2" /> Upload Receipt
          </button>)}
            {/* Show Uploaded Receipt */}
        {receiptUrl && receiptUrl.length > 0 && receiptUrl.map((res, index) => (
        <div
          key={index}
          className="d-flex justify-content-between align-items-center my-2"
        >
          <a
            href={`https://amproadmin.zaitunsoftsolutions.com:2004/category/download/${res.name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-decoration-none d-flex align-items-center text-primary"
          >
            <FaFileDownload className="me-2" />
            {res.name}
          </a>
    
          <button
            type="button"
            className="btn btn-sm btn-light shadow-none"
            onClick={() => deleteFile(res.media_id)}
          >
            <FaTrash />
          </button>
        </div>
        ))}
        </div>

      

        {/* 2. On documents payment Upload Section */}
        <div className="card p-4 text-center border-dashed mb-3">
        <h6 className="d-flex justify-content-between align-items-center my-2 fw-bold mt-4">On documents payment</h6>

          <div className="custom-file-upload">
            <input
              type="file"
              id="fileInputDoc"
              className="d-none"
              accept="application/pdf"
              onChange={handleFileDocChange}
            />
            <label htmlFor="fileInputDoc" className="btn btn-outline-primary">
              <FaUpload className="me-2" /> Choose PDF File
            </label>
          </div>

          {receiptFileDoc && (
            <p className="mt-2 text-success">
              <FaFilePdf className="me-2" />
              {receiptFileDoc.name}
            </p>
          )}
          { uploaded1 &&  <div className='progress mt-2'>
            <div className="progress-bar h-4" role='progressbar'
              aria-valuenow={uploaded1}
              aria-valuemin='0'
              aria-valuemax='100'
              style={{width:`${uploaded1}%`}}>
                {`${uploaded1}% uploaded`}
            </div>
          </div>}
          {receiptFileDoc && (<button className="btn btn-primary mt-2" onClick={handleUploadOnDoc} disabled={!receiptFileDoc}>
            <FaUpload className="me-2" /> Upload Receipt
          </button>)}

          
        {receiptUrl1 && receiptUrl1.length > 0 && receiptUrl1.map((res1, index) => (
        <div
          key={index}
          className="d-flex justify-content-between align-items-center my-2"
        >
          <a
            href={`https://amproadmin.zaitunsoftsolutions.com:2004/category/download/${res1.name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-decoration-none d-flex align-items-center text-primary"
          >
            <FaFileDownload className="me-2" />
            {res1.name}
          </a>
    
          <button
            type="button"
            className="btn btn-sm btn-light shadow-none"
            onClick={() => deleteFile(res1.media_id)}
          >
            <FaTrash />
          </button>
        </div>
        ))}
        </div>


  

       {/* 2. On documents payment Upload Section */}
        <div className="card p-4 text-center border-dashed mb-3">
        <h6 className="d-flex justify-content-between align-items-center my-2 fw-bold mt-4">After Arrival</h6>

          <div className="custom-file-upload">
            <input
              type="file"
              id="fileInputArrival"
              className="d-none"
              accept="application/pdf"
              onChange={handleArrival}
            />
            <label htmlFor="fileInputArrival" className="btn btn-outline-primary">
              <FaUpload className="me-2" /> Choose PDF File
            </label>
          </div>

          {receiptArrival && (
            <p className="mt-2 text-success">
              <FaFilePdf className="me-2" />
              {receiptArrival.name}
            </p>
          )}
          { uploaded2 &&  <div className='progress mt-2'>
            <div className="progress-bar h-4" role='progressbar'
              aria-valuenow={uploaded2}
              aria-valuemin='0'
              aria-valuemax='100'
              style={{width:`${uploaded2}%`}}>
                {`${uploaded2}% uploaded`}
            </div>
          </div>}
          {receiptArrival && (<button className="btn btn-primary mt-2" onClick={handleUploadArrival} disabled={!receiptArrival}>
            <FaUpload className="me-2" /> Upload Arrival Receipt
          </button>)}

          {receiptUrl2 && receiptUrl2.length > 0 && receiptUrl2.map((res1, index) => (
        <div
          key={index}
          className="d-flex justify-content-between align-items-center my-2"
        >
          <a
            href={`https://amproadmin.zaitunsoftsolutions.com:2004/category/download/${res1.name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-decoration-none d-flex align-items-center text-primary"
          >
            <FaFileDownload className="me-2" />
            {res1.name}
          </a>
    
          <button
            type="button"
            className="btn btn-sm btn-light shadow-none"
            onClick={() => deleteFile(res1.media_id)}
          >
            <FaTrash />
          </button>
        </div>
        ))}
        </div>



        
       {/* 2. On documents payment Upload Section */}
       <div className="card p-4 text-center border-dashed mb-3">
        <h6 className="d-flex justify-content-between align-items-center my-2 fw-bold mt-4">Buisness Document</h6>

          {/* <div className="custom-file-upload">
            <input
              type="file"
              id="fileInputArrival"
              className="d-none"
              accept="application/pdf"
              onChange={handleArrival}
            />
            <label htmlFor="fileInputArrival" className="btn btn-outline-primary">
              <FaUpload className="me-2" /> Choose PDF File
            </label>
          </div> */}

          {/* {receiptArrival1 && (
            <p className="mt-2 text-success">
              <FaFilePdf className="me-2" />
              {receiptArrival1.name}
            </p>
          )} */}
          {/* { uploaded2 &&  <div className='progress mt-2'>
            <div className="progress-bar h-4" role='progressbar'
              aria-valuenow={uploaded2}
              aria-valuemin='0'
              aria-valuemax='100'
              style={{width:`${uploaded2}%`}}>
                {`${uploaded2}% uploaded`}
            </div>
          </div>}
          {receiptArrival1 && (<button className="btn btn-primary mt-2" onClick={handleUploadArrival} disabled={!receiptArrival1}>
            <FaUpload className="me-2" /> Upload Arrival Receipt
          </button>)} */}

          {receiptUrl3 && receiptUrl3.length > 0 && receiptUrl3.map((res1, index) => (
        <div
          key={index}
          className="d-flex justify-content-between align-items-center my-2"
        >
          <a
            href={`http://amproadmin.zaitunsoftsolutions.com/storage/uploads/${res1.name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-decoration-none d-flex align-items-center text-primary"
          >
            <FaFileDownload className="me-2" />
            {res1.name}
          </a>
{/*     
          <button
            type="button"
            className="btn btn-sm btn-light shadow-none"
            onClick={() => deleteFile(res1.media_id)}
          >
            <FaTrash />
          </button> */}
        </div>
        ))}
        </div>

      

        <Card className="p-4 shadow-sm rounded-3 mb-4">
          {/* Enquiry Code & Status */}
          <h5 className="fw-bold mb-4">
            Carrier Tracking
          </h5>

          <Row className="gy-3">
            {/* Title */}
            <Col md={6}>
              <div className="mb-3">
                <p className="text-muted mr-3 pull-left">Carrier Name :</p>
                <p className="fw-bold m-0 pull-left">{tracking?.carrier_name || 'N/A'}</p>
              </div>
            </Col>

            <Col md={6}>
              <div className="mb-3">
                <p className="text-muted mr-3 pull-left">Container Number :</p>
                <p className="fw-bold m-0 pull-left">{tracking?.container_no || 'N/A'}</p>
              </div>
            </Col>

            <Col md={6}>
              <div className="mb-3">
                <p className="text-muted mr-3 pull-left">Bill of Lading :</p>
                <p className="fw-bold m-0 pull-left">{tracking?.bill_of_loading || 'N/A'}</p>
              </div>
            </Col>

            <Col md={6}>
              <div className="mb-3">
                <p className="text-muted mr-3 pull-left">Order Number :</p>
                <p className="fw-bold m-0 pull-left">{tracking?.order_no || 'N/A'}</p>
              </div>
            </Col>

            <Col md={6}>
              <div className="mb-3">
                <p className="text-muted mr-3 pull-left">ETD :</p>
                <p className="fw-bold m-0 pull-left">{tracking?.actual_delivery_date || 'N/A'}</p>
              </div>
            </Col>

            <Col md={6}>
              <div className="mb-3">
                <p className="text-muted mr-3 pull-left">ETA :</p>
                <p className="fw-bold m-0 pull-left">{tracking?.expected_delivery_date || 'N/A'}</p>
              </div>
            </Col>          
          </Row>
          
        </Card>
      </div>
    </LayoutOne>
  );
};

export default EnquiryDetails;
