import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Modal from "../modal/Modal";
import LoginForm from "../auth/LoginForm";
import RegisterForm from "../auth/RegisterForm/RegisterForm";
import ForgotPasswordForm from "../auth/ForgotPasswordForm/ForgotPasswordForm";

const PAGE_TITLES = {
  "/login": "Đăng nhập - Xe Khách",
  "/register": "Đăng ký - Xe Khách",
  "/forgot-password": "Quên mật khẩu - Xe Khách",
};

export default function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const modalKey = location.pathname.slice(1);
  const isModalOpen = Object.keys(PAGE_TITLES).includes(location.pathname);

  const closeModal = () => navigate(-1); // quay lại trang trước
  const openModal = (modal) => navigate(`/${modal}`);

  const renderModalContent = () => {
    switch (modalKey) {
      case "login":
        return (
            <LoginForm
            switchToRegister={() => openModal("register")}
            switchToForgotPassword={() => openModal("forgot-password")}
            onCloseModal={closeModal}
          />
        );
      case "register":
        return <RegisterForm switchToLogin={() => openModal("login")} />;
      case "forgot-password":
        return <ForgotPasswordForm switchToLogin={() => openModal("login")} />;
      default:
        return null;
    }
  };

  React.useEffect(() => {
    document.title = PAGE_TITLES[location.pathname] || "Xe Khách - VuBac";
  }, [location.pathname]);

  return (
    <>
      <Outlet />
      {isModalOpen && (
        <Modal isOpen onClose={closeModal}>
          {renderModalContent()}
        </Modal>
      )}
    </>
  );
}
