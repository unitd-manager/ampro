import {
    FETCH_WISHLIST_DATA_REQUEST,
    FETCH_WISHLIST_DATA_SUCCESS,
    FETCH_WISHLIST_DATA_FAILURE,
    INSERT_WISHLIST_DATA_REQUEST,
    INSERT_WISHLIST_DATA_SUCCESS,
    INSERT_WISHLIST_DATA_FAILURE,
    REMOVE_WISHLIST_DATA_REQUEST,
    REMOVE_WISHLIST_DATA_SUCCESS,
    REMOVE_WISHLIST_DATA_FAILURE,
    CLEAR_WISHLIST_DATA_REQUEST,
    CLEAR_WISHLIST_DATA_SUCCESS,
    CLEAR_WISHLIST_DATA_FAILURE,
    EMPTY_WISHLIST_DATA_REQUEST,
    EMPTY_WISHLIST_DATA_SUCCESS,
    EMPTY_WISHLIST_DATA_FAILURE
  } from '../actions/wishlistItemActions';
  
  const initialState = {
    loading: false,
    wishlistItems: [],
    error: null,
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_WISHLIST_DATA_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_WISHLIST_DATA_SUCCESS:
        return {
          ...state,
          loading: false,
          wishlistItems: action.payload,
        };
      case FETCH_WISHLIST_DATA_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
        case INSERT_WISHLIST_DATA_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case INSERT_WISHLIST_DATA_SUCCESS:
        return {
          ...state,
          loading: false,
          wishlistItems: [...state.wishlistItems, action.payload],
          data: action.payload,
        };
      case INSERT_WISHLIST_DATA_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
        case REMOVE_WISHLIST_DATA_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case REMOVE_WISHLIST_DATA_SUCCESS:
        // Safely remove by wish_list_id when available; fallback to product_id if provided.
        // Prevent accidental removal when identifier is undefined.
        const idToRemove = action.payload && action.payload.wish_list_id;
        const productIdToRemove = action.payload && action.payload.product_id;

        if (idToRemove !== undefined && idToRemove !== null) {
          return {
            ...state,
            loading: false,
            wishlistItems: state.wishlistItems.filter(
              (item) => item.wish_list_id !== idToRemove
            ),
          };
        }

        if (productIdToRemove !== undefined && productIdToRemove !== null) {
          return {
            ...state,
            loading: false,
            wishlistItems: state.wishlistItems.filter(
              (item) => item.product_id !== productIdToRemove
            ),
          };
        }

        // If no valid identifier is provided, do not modify the list.
        return {
          ...state,
          loading: false,
        };
      case REMOVE_WISHLIST_DATA_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
        case CLEAR_WISHLIST_DATA_REQUEST:
          return {
            ...state,
            loading: true,
            error: null,
          };
        case CLEAR_WISHLIST_DATA_SUCCESS:
          return {
            ...state,
            loading: false,
            wishlistItems:[]
          };
        case CLEAR_WISHLIST_DATA_FAILURE:
          return {
            ...state,
            loading: false,
            error: action.payload,
          };
          case EMPTY_WISHLIST_DATA_REQUEST:
            return {
              ...state,
              loading: true,
              error: null,
            };
          case EMPTY_WISHLIST_DATA_SUCCESS:
            return {
              ...state,
              loading: false,
              wishlistItems:[]
            };
          case EMPTY_WISHLIST_DATA_FAILURE:
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