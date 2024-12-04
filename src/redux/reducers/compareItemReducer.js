import {
    FETCH_COMPARE_DATA_REQUEST,
    FETCH_COMPARE_DATA_SUCCESS,
    FETCH_COMPARE_DATA_FAILURE,
    INSERT_COMPARE_DATA_REQUEST,
    INSERT_COMPARE_DATA_SUCCESS,
    INSERT_COMPARE_DATA_FAILURE,
    REMOVE_COMPARE_DATA_REQUEST,
    REMOVE_COMPARE_DATA_SUCCESS,
    REMOVE_COMPARE_DATA_FAILURE,
    CLEAR_COMPARE_DATA_REQUEST,
    CLEAR_COMPARE_DATA_SUCCESS,
    CLEAR_COMPARE_DATA_FAILURE
  } from '../actions/compareItemActions';
  
  const initialState = {
    loading: false,
    compareItems: [],
    error: null,
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_COMPARE_DATA_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_COMPARE_DATA_SUCCESS:
        return {
          ...state,
          loading: false,
          compareItems: action.payload,
        };
      case FETCH_COMPARE_DATA_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
        case INSERT_COMPARE_DATA_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case INSERT_COMPARE_DATA_SUCCESS:
        return {
          ...state,
          loading: false,
          compareItems: [...state.compareItems, action.payload],
          data: action.payload,
        };
      case INSERT_COMPARE_DATA_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
        case REMOVE_COMPARE_DATA_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case REMOVE_COMPARE_DATA_SUCCESS:
        const filteredItems = state.compareItems.filter(
          (item) => item.product_compare_id !== action.payload.product_compare_id
        );
        return {
          ...state,
          loading: false,
          compareItems: filteredItems
        };
      case REMOVE_COMPARE_DATA_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
        case CLEAR_COMPARE_DATA_REQUEST:
          return {
            ...state,
            loading: true,
            error: null,
          };
        case CLEAR_COMPARE_DATA_SUCCESS:
          return {
            ...state,
            loading: false,
            compareItems:[]
          };
        case CLEAR_COMPARE_DATA_FAILURE:
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