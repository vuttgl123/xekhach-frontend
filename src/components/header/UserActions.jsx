import { useState, useEffect } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import Modal from "../modal/Modal";
import styles from "./useraction.module.css";
import LoginForm from "../auth/LoginForm";
import RegisterForm from "../auth/RegisterForm";
import ForgotPasswordForm from "../auth/ForgotPasswordForm";
import { fetchUserProfile } from "../api/authApi";
import UserDropdown from "./UserDropdown";

const UserActions = () => {
    const [activeModal, setActiveModal] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const user = await fetchUserProfile();
                setIsLoggedIn(!!user);
                if (user) setUserName(user.fullName || "Người dùng"); // Lấy tên user
            } catch (error) {
                setIsLoggedIn(false);
            }
        };

        checkLoginStatus();
    }, []);

    const switchModal = (modalName) => {
        setActiveModal(null);
        setTimeout(() => setActiveModal(modalName), 300);
    };

    return (
        <div className={styles.userActions}>
            <button className={styles.hotlineButton}>
                <FaPhoneAlt className={styles.icon} /> Hotline 24/7
            </button>

            {isLoggedIn ? (
                <UserDropdown userName={userName} setIsLoggedIn={setIsLoggedIn} />
            ) : (
                <button className={styles.loginButton} onClick={() => setActiveModal("login")}>
                    Đăng nhập
                </button>
            )}

            <Modal isOpen={activeModal === "login"} onClose={() => setActiveModal(null)}>
                <LoginForm 
                    switchToRegister={() => switchModal("register")} 
                    switchToForgotPassword={() => switchModal("forgotPassword")} 
                />
            </Modal>

            <Modal isOpen={activeModal === "register"} onClose={() => setActiveModal(null)}>
                <RegisterForm switchToLogin={() => switchModal("login")} />
            </Modal>

            <Modal isOpen={activeModal === "forgotPassword"} onClose={() => setActiveModal(null)}>
                <ForgotPasswordForm switchToLogin={() => switchModal("login")} />
            </Modal>
        </div>
    );
};

export default UserActions;
