import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import UserAuthProvider from "./store/userAuth.jsx";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserAuthProvider>
        <Toaster position="top-center" />
        <App />
      </UserAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
