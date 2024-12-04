import currencyReducer from "./currencyReducer";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import wishlistReducer from "./wishlistReducer";
import wishlistItemReducer from './wishlistItemReducer';
import compareReducer from "./compareReducer";
import compareItemReducer from "./compareItemReducer";
import cartItemReducer from "./cartItemReducer";
import { combineReducers } from "redux";
import { createMultilanguageReducer } from "redux-multilanguage";

const rootReducer = combineReducers({
  multilanguage: createMultilanguageReducer({ currentLanguageCode: "en" }),
  currencyData: currencyReducer,
  productData: productReducer,
  cartData: cartReducer,
  wishlistData: wishlistReducer,
  compareData: compareReducer,
  cartItems:cartItemReducer,
  wishlistItems:wishlistItemReducer,
  compareItems:compareItemReducer
});

export default rootReducer;
