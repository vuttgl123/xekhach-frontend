import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import SearchTrips from "./pages/SearchTrips";
import Service from "./pages/Service";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import BookingGuide from "./pages/BookingGuide";
import SellWithUs from "./pages/SellWithUs";
import UserDashboard from "./pages/UserDashboard/UserDashboard";
import AppLayout from "./components/layout/AppLayout";

import Modal from "./components/modal/Modal";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm/RegisterForm";
import ForgotPasswordForm from "./components/auth/ForgotPasswordForm/ForgotPasswordForm";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state;
  const backgroundLocation = state?.backgroundLocation;

  const closeModal = () => navigate(state?.backgroundLocation?.pathname || "/");

  return (
    <>
      {/* Giao diện chính */}
      <Routes location={backgroundLocation || location}>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search-trips" element={<SearchTrips />} />
          <Route path="/service" element={<Service />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/booking-guide" element={<BookingGuide />} />
          <Route path="/sell-on-vubac" element={<SellWithUs />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
        </Route>
      </Routes>

      {/* Các modal được hiển thị nếu có backgroundLocation */}
      {backgroundLocation && (
        <Routes>
          <Route
            path="/login"
            element={
              <Modal isOpen={true} onClose={closeModal}>
                <LoginForm
                  switchToRegister={() =>
                    navigate("/register", { state: { backgroundLocation } })
                  }
                  switchToForgotPassword={() =>
                    navigate("/forgot-password", { state: { backgroundLocation } })
                  }
                />
              </Modal>
            }
          />
          <Route
            path="/register"
            element={
              <Modal isOpen={true} onClose={closeModal}>
                <RegisterForm switchToLogin={() => navigate("/login", { state: { backgroundLocation } })} />
              </Modal>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <Modal isOpen={true} onClose={closeModal}>
                <ForgotPasswordForm switchToLogin={() => navigate("/login", { state: { backgroundLocation } })} />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;
