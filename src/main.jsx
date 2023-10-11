import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "antd/dist/reset.css";

import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/auth.jsx";
import { SearchProvider } from "./contexts/search.jsx";
import { CartProvider } from "./contexts/cart.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <SearchProvider>
      <CartProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartProvider>
    </SearchProvider>
  </AuthProvider>
);
