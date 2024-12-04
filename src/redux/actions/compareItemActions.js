import api from "../../constants/api";

export const FETCH_COMPARE_DATA_REQUEST = 'FETCH_COMPARE_DATA_REQUEST';
export const FETCH_COMPARE_DATA_SUCCESS = 'FETCH_COMPARE_DATA_SUCCESS';
export const FETCH_COMPARE_DATA_FAILURE = 'FETCH_COMPARE_DATA_FAILURE';

export const INSERT_COMPARE_DATA_REQUEST = 'INSERT_COMPARE_DATA_REQUEST';
export const INSERT_COMPARE_DATA_SUCCESS = 'INSERT_COMPARE_DATA_SUCCESS';
export const INSERT_COMPARE_DATA_FAILURE = 'INSERT_COMPARE_DATA_FAILURE';

export const REMOVE_COMPARE_DATA_REQUEST = 'REMOVE_COMPARE_DATA_REQUEST';
export const REMOVE_COMPARE_DATA_SUCCESS = 'REMOVE_COMPARE_DATA_SUCCESS';
export const REMOVE_COMPARE_DATA_FAILURE = 'REMOVE_COMPARE_DATA_FAILURE';

export const CLEAR_COMPARE_DATA_REQUEST = 'CLEAR_COMPARE_DATA_REQUEST';
export const CLEAR_COMPARE_DATA_SUCCESS = 'CLEAR_COMPARE_DATA_SUCCESS';
export const CLEAR_COMPARE_DATA_FAILURE = 'CLEAR_COMPARE_DATA_FAILURE';

export const fetchCompareData = (userInfo) => {
    return (dispatch) => {
      dispatch(fetchCompareDataRequest({contact_id:userInfo.contact_id}));
     
      // Make the API call
      api
        .post("/contact/getCompareByContactId", {
          contact_id: userInfo.contact_id,
        })
        .then((res) => {
          res.data.data.forEach(element => {
            element.images=String(element.images).split(',')
          });
          dispatch(fetchCompareDataSuccess(res.data.data))})
        .catch((error) => {dispatch(fetchCompareDataFailure(error))});
    };
  };
  
  export const insertCompareData = (data,addToast) => {
    
    return (dispatch) => {
      dispatch(insertCompareDataRequest(data));
  
      // Make the API call
      api.post('/contact/insertToCompare',data)
        .then(() => {dispatch(insertCompareDataSuccess(data));
          addToast("Compare Item is Added", {
            appearance: "success",
            autoDismiss: true,
           })})
        .catch((error) => dispatch(insertCompareDataFailure(error)));
    };
  };

  export const removeCompareData = (Item,addToast) => {
    return (dispatch) => {
      dispatch(removeCompareDataRequest( { product_compare_id: Item.product_compare_id, }));
  
      // Make the API call
      api
      .post("/contact/deleteCompareItem", {
        product_compare_id: Item.product_compare_id,
      })
        .then((res) => {dispatch(removeCompareDataSuccess(Item));
          addToast("Compare Item is removed", {
            appearance: "success",
            autoDismiss: true,
           })})
        .catch((error) => dispatch(removeCompareDataFailure(error)));
    };
  };

  export const clearCompareData = (user,addToast) => {
    return (dispatch) => {
      dispatch(clearCompareDataRequest({contact_id:user.contact_id}));
  
      // Make the API call
      api
      .post("/contact/clearWishlistItems", { contact_id: user.contact_id })
        .then((res) => {dispatch(clearCompareDataSuccess(res.data.data));
          addToast("Wishlist is cleared", {
            appearance: "success",
            autoDismiss: true,
           })})
        .catch((error) => dispatch(clearCompareDataFailure(error)));
    };
  };


  export const fetchCompareDataRequest = () => ({
    type: FETCH_COMPARE_DATA_REQUEST,
  });
  
  export const fetchCompareDataSuccess = (data) => ({
    type: FETCH_COMPARE_DATA_SUCCESS,
    payload: data,
  });
  
  export const fetchCompareDataFailure = (error) => ({
    type: FETCH_COMPARE_DATA_FAILURE,
    payload: error,
  });

  
  export const insertCompareDataRequest = () => ({
    type: INSERT_COMPARE_DATA_REQUEST,
  });
  
  export const insertCompareDataSuccess = (data) => ({
    type: INSERT_COMPARE_DATA_SUCCESS,
    payload: data,
  });
  
  export const insertCompareDataFailure = (error) => ({
    type: INSERT_COMPARE_DATA_FAILURE,
    payload: error,
  });

  
  export const removeCompareDataRequest = () => ({
    type: REMOVE_COMPARE_DATA_REQUEST,
  });
  
  export const removeCompareDataSuccess = (data) => ({
    type: REMOVE_COMPARE_DATA_SUCCESS,
    payload: data,
  });
  
  export const removeCompareDataFailure = (error) => ({
    type: REMOVE_COMPARE_DATA_FAILURE,
    payload: error,
  });

  export const clearCompareDataRequest = () => ({
    type: CLEAR_COMPARE_DATA_REQUEST,
  });
  
  export const clearCompareDataSuccess = (user) => ({
    type: CLEAR_COMPARE_DATA_SUCCESS,
    payload: user,
  });
  
  export const clearCompareDataFailure = (error) => ({
    type: CLEAR_COMPARE_DATA_FAILURE,
    payload: error,
  });