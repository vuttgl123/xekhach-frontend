import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Service from "./pages/Service";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import UserDashboard from "./pages/UserDashboard/UserDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Home />} /> {/* Giữ nguyên trang nhưng modal mở */}
        <Route path="/register" element={<Home />} />
        <Route path="/forgot-password" element={<Home />} />
        <Route path="/service" element={<Service />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />

      </Routes>
    </Router>
  );
}

export default App;
