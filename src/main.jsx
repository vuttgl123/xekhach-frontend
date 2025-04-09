import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext"; // ✅ Thêm dòng này
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider> {/* ✅ Bọc toàn bộ app */}
        <App />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
