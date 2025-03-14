import { useState, useEffect } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "../modal/Modal";
import styles from "./useraction.module.css";
import LoginForm from "../auth/LoginForm";
import RegisterForm from "../auth/RegisterForm/RegisterForm";
import ForgotPasswordForm from "../auth/ForgotPasswordForm";
import { fetchUserProfile } from "../api/authApi";
import UserDropdown from "./UserDropdown";

const PAGE_TITLES = {
    "/login": "Đăng nhập - Xe Khách",
    "/register": "Đăng ký - Xe Khách",
    "/forgot-password": "Quên mật khẩu - Xe Khách",
};

const UserActions = () => {
    const [activeModal, setActiveModal] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const user = await fetchUserProfile();
                setIsLoggedIn(!!user);
                setUserName(user?.fullName || "User");
            } catch (error) {
                setIsLoggedIn(false);
            }
        };

        checkLoginStatus();
    }, []);

    useEffect(() => {
        const modalType = location.pathname.slice(1); // Lấy phần sau dấu "/"
        setActiveModal(PAGE_TITLES[location.pathname] ? modalType : null);
        document.title = PAGE_TITLES[location.pathname] || "Trang chủ - Xe Khách";
    }, [location.pathname]);

    const openModal = (modalName) => navigate(`/${modalName}`);
    const closeModal = () => navigate("/home");

    return (
        <div className={styles.userActions}>
            <button className={styles.hotlineButton}>
                <FaPhoneAlt className={styles.icon} /> Hotline 24/7
            </button>

            {isLoggedIn ? (
                <UserDropdown userName={userName} setIsLoggedIn={setIsLoggedIn} />
            ) : (
                <button className={styles.loginButton} onClick={() => openModal("login")}>
                    Login
                </button>
            )}

            {["login", "register", "forgot-password"].map((modal) => (
                <Modal key={modal} isOpen={activeModal === modal} onClose={closeModal}>
                    {modal === "login" && (
                        <LoginForm
                            switchToRegister={() => openModal("register")}
                            switchToForgotPassword={() => openModal("forgot-password")}
                        />
                    )}
                    {modal === "register" && <RegisterForm switchToLogin={() => openModal("login")} />}
                    {modal === "forgot-password" && <ForgotPasswordForm switchToLogin={() => openModal("login")} />}
                </Modal>
            ))}
        </div>
    );
};

export default UserActions;
