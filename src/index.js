import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

// This is the root component
import App from "./components/App";
import mainStore from "./store/mainStore";

// stylesheets
import "./index.css";
import "./lib.css";

ReactDOM.render(
  <Provider store={mainStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
