import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { save, load } from "redux-localstorage-simple";
import { Provider } from "react-redux";
import rootReducer from "./redux/reducers/rootReducer";
import App from "./App";
import "./assets/scss/style.scss";
import * as serviceWorker from "./serviceWorker";
import { composeWithDevTools } from "redux-devtools-extension";

// ⭐ ADD THIS
import { GoogleOAuthProvider } from "@react-oauth/google";

// ⭐ Your Google Client ID (replace with your actual ID)
const GOOGLE_CLIENT_ID =
  "746902365410-ql5ac2lqlkljfmr4j32ae2vbpke1n7tj.apps.googleusercontent.com";

const store = createStore(
  rootReducer,
  load(),
  composeWithDevTools(applyMiddleware(thunk, save()))
);

ReactDOM.render(
  <Provider store={store}>
    {/* ⭐ Wrap App inside Google OAuth provider */}
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
