import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'select2/dist/js/select2.min.js';
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.scss";
import UserProvider from "./context/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
  <UserProvider>
    <App />
  </UserProvider>
  </>
);

reportWebVitals();
