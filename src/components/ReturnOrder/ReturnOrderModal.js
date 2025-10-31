import React,{useState} from 'react'
import PropTypes from 'prop-types'
// import { useToasts } from 'react-toast-notifications';
import { Badge, Button, Col, Input, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import api from '../../constants/api';

function ReturnOrderModal({returnModal,setReturnModal,item}) {

    // const addToast=useToasts();
const[error, setError]=useState('');
const[quantity,setQuantity]=useState(0);

    const handleReturn=()=>{
     if(quantity > item.qty){
setError('Please Enter The Quantity less than The orderItem quantity ')
     }else{
        item.return_status='applied';
        item.return_qty=quantity;
api.post('orders/editReturnOrderItem',item).then((res)=>{
    console.log(res)
}).catch((err)=>{
    console.log(err)
})
     }
    }
  return (
    <div>
<Modal isOpen={returnModal}>
<ModalHeader><Row><Col md={12}><span>Return Items</span></Col><span onClick={()=>{setReturnModal(false)}} style={{cursor:'pointer'}}><Badge>x</Badge></span></Row></ModalHeader>
<ModalBody>
<div>
    {error !==''&& <span>{error}</span>}
    <Row>
       <Col> Return Quantity</Col>
    </Row>
    <Row>
        <Col>
    <Input type='number' name='quantity' onChange={(e)=>setQuantity(e.target.value)}/>
    </Col>
    <Col>
    <Button onClick={()=>{handleReturn()}} color='primary'>Return</Button>
    </Col>
    </Row>
</div>
</ModalBody>
</Modal>
    </div>
  )
}
ReturnOrderModal.propTypes={
    returnModal:PropTypes.bool,
    setReturnModal:PropTypes.func,
    item:PropTypes.object
}

export default ReturnOrderModal