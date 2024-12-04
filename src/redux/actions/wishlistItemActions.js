import api from "../../constants/api";

export const FETCH_WISHLIST_DATA_REQUEST = 'FETCH_WISHLIST_DATA_REQUEST';
export const FETCH_WISHLIST_DATA_SUCCESS = 'FETCH_WISHLIST_DATA_SUCCESS';
export const FETCH_WISHLIST_DATA_FAILURE = 'FETCH_WISHLIST_DATA_FAILURE';

export const INSERT_WISHLIST_DATA_REQUEST = 'INSERT_WISHLIST_DATA_REQUEST';
export const INSERT_WISHLIST_DATA_SUCCESS = 'INSERT_WISHLIST_DATA_SUCCESS';
export const INSERT_WISHLIST_DATA_FAILURE = 'INSERT_WISHLIST_DATA_FAILURE';

export const REMOVE_WISHLIST_DATA_REQUEST = 'REMOVE_WISHLIST_DATA_REQUEST';
export const REMOVE_WISHLIST_DATA_SUCCESS = 'REMOVE_WISHLIST_DATA_SUCCESS';
export const REMOVE_WISHLIST_DATA_FAILURE = 'REMOVE_WISHLIST_DATA_FAILURE';

export const CLEAR_WISHLIST_DATA_REQUEST = 'CLEAR_WISHLIST_DATA_REQUEST';
export const CLEAR_WISHLIST_DATA_SUCCESS = 'CLEAR_WISHLIST_DATA_SUCCESS';
export const CLEAR_WISHLIST_DATA_FAILURE = 'CLEAR_WISHLIST_DATA_FAILURE';

export const fetchWishlistData = (userInfo) => {
    return (dispatch) => {
      dispatch(fetchWishlistDataRequest({contact_id:userInfo.contact_id}));
     
      // Make the API call
      api.post('/contact/getFavByContactId',{contact_id:userInfo.contact_id})
        .then((res) => {
          res.data.data.forEach(element => {
            element.images=String(element.images).split(',')
          });
          dispatch(fetchWishlistDataSuccess(res.data.data))})
        .catch((error) => {dispatch(fetchWishlistDataFailure(error))});
    };
  };
  
  export const insertWishlistData = (data,addToast) => {
    
    return (dispatch) => {
      dispatch(insertWishlistDataRequest(data));
  
      // Make the API call
      api.post('/contact/insertToWishlist',data)
        .then(() => {dispatch(insertWishlistDataSuccess(data));
          addToast("Item Added to Wishlist", {
            appearance: "success",
            autoDismiss: true,
           })})
        .catch((error) => dispatch(insertWishlistDataFailure(error)));
    };
  };

  export const removeWishlistData = (Item,addToast) => {
    return (dispatch) => {
      dispatch(removeWishlistDataRequest( { wish_list_id: Item.wish_list_id }));
  
      // Make the API call
      api
      .post("/contact/deleteWishlistItem", { wish_list_id: Item.wish_list_id })
        .then((res) => {dispatch(removeWishlistDataSuccess(Item));
          addToast("Item removed from Wishlist", {
            appearance: "success",
            autoDismiss: true,
           })})
        .catch((error) => dispatch(removeWishlistDataFailure(error)));
    };
  };

  export const clearWishlistData = (user,addToast) => {
    return (dispatch) => {
      dispatch(clearWishlistDataRequest({contact_id:user.contact_id}));
  
      // Make the API call
      api
      .post("/contact/clearWishlistItems", { contact_id: user.contact_id })
        .then((res) => {dispatch(clearWishlistDataSuccess(res.data.data));
          addToast("Wishlist is cleared", {
            appearance: "success",
            autoDismiss: true,
           })})
        .catch((error) => dispatch(clearWishlistDataFailure(error)));
    };
  };


  export const fetchWishlistDataRequest = () => ({
    type: FETCH_WISHLIST_DATA_REQUEST,
  });
  
  export const fetchWishlistDataSuccess = (data) => ({
    type: FETCH_WISHLIST_DATA_SUCCESS,
    payload: data,
  });
  
  export const fetchWishlistDataFailure = (error) => ({
    type: FETCH_WISHLIST_DATA_FAILURE,
    payload: error,
  });

  
  export const insertWishlistDataRequest = () => ({
    type: INSERT_WISHLIST_DATA_REQUEST,
  });
  
  export const insertWishlistDataSuccess = (data) => ({
    type: INSERT_WISHLIST_DATA_SUCCESS,
    payload: data,
  });
  
  export const insertWishlistDataFailure = (error) => ({
    type: INSERT_WISHLIST_DATA_FAILURE,
    payload: error,
  });

  
  export const removeWishlistDataRequest = () => ({
    type: REMOVE_WISHLIST_DATA_REQUEST,
  });
  
  export const removeWishlistDataSuccess = (data) => ({
    type: REMOVE_WISHLIST_DATA_SUCCESS,
    payload: data,
  });
  
  export const removeWishlistDataFailure = (error) => ({
    type: REMOVE_WISHLIST_DATA_FAILURE,
    payload: error,
  });

  export const clearWishlistDataRequest = () => ({
    type: CLEAR_WISHLIST_DATA_REQUEST,
  });
  
  export const clearWishlistDataSuccess = (user) => ({
    type: CLEAR_WISHLIST_DATA_SUCCESS,
    payload: user,
  });
  
  export const clearWishlistDataFailure = (error) => ({
    type: CLEAR_WISHLIST_DATA_FAILURE,
    payload: error,
  });