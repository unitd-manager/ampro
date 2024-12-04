import {
    FETCH_CART_DATA_REQUEST,
    FETCH_CART_DATA_SUCCESS,
    FETCH_CART_DATA_FAILURE,
    INSERT_CART_DATA_REQUEST,
    INSERT_CART_DATA_SUCCESS,
    INSERT_CART_DATA_FAILURE,
    UPDATE_CART_DATA_REQUEST,
    UPDATE_CART_DATA_SUCCESS,
    UPDATE_CART_DATA_FAILURE,
    REMOVE_CART_DATA_REQUEST,
    REMOVE_CART_DATA_SUCCESS,
    REMOVE_CART_DATA_FAILURE,
    CLEAR_CART_DATA_REQUEST,
    CLEAR_CART_DATA_SUCCESS,
    CLEAR_CART_DATA_FAILURE
  } from '../actions/cartItemActions';
  
  const initialState = {
    loading: false,
    cartItems: [],
    error: null,
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_CART_DATA_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_CART_DATA_SUCCESS:
        return {
          ...state,
          loading: false,
          cartItems: action.payload,
        };
      case FETCH_CART_DATA_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
        case INSERT_CART_DATA_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case INSERT_CART_DATA_SUCCESS:
        return {
          ...state,
          loading: false,
          cartItems: [...state.cartItems, action.payload],
          data: action.payload,
        };
      case INSERT_CART_DATA_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
        case UPDATE_CART_DATA_REQUEST:
          return {
            ...state,
            loading: true,
            error: null,
          };
        case UPDATE_CART_DATA_SUCCESS:
          return {
            ...state,
            loading: false,
            cartItems: state.cartItems.map(item => {
              if (item.basket_id === action.payload.basket_id) {
                return {
                  ...item,
                  qty: action.payload.qty,
                };
              }
              return item;
            }),
            data: action.payload,
          };
        case UPDATE_CART_DATA_FAILURE:
          return {
            ...state,
            loading: false,
            error: action.payload,
          };
        case REMOVE_CART_DATA_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case REMOVE_CART_DATA_SUCCESS:
        const updatedCartItems = state.cartItems.filter(
          (item) => item.basket_id !== action.payload.basket_id
        );
        return {
          ...state,
          loading: false,
          cartItems: updatedCartItems,
        };
      case REMOVE_CART_DATA_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
        case CLEAR_CART_DATA_REQUEST:
          return {
            ...state,
            loading: true,
            error: null,
          };
        case CLEAR_CART_DATA_SUCCESS:
         
          return {
            ...state,
            loading: false,
            cartItems: []
          };
        case CLEAR_CART_DATA_FAILURE:
          return {
            ...state,
            loading: false,
            error: action.payload,
          };
      default:
        return state;
    }
  };
  
  export default reducer;