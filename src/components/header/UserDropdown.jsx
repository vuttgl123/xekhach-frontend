import { useState, useRef, useEffect } from "react";
import { FaUser, FaSignOutAlt, FaGift, FaRegCreditCard, FaRegUser, FaAngleDown, FaTicketAlt, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // 🔹 Điều hướng không cần reload trang
import styles from "./userdropdown.module.css";
import { logout } from "../api/authApi"; 
import { showSuccessAlert } from "../message/SuccessAlert";
import { showErrorAlert } from "../message/ErrorAlert";

const UserDropdown = ({ userName, setIsLoggedIn }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    // 📌 Đóng dropdown khi click ra ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
            showSuccessAlert("Đăng xuất thành công!").then(() => {
                setIsLoggedIn(false);
                navigate("/login"); // 🔥 Điều hướng không cần reload trang
            });
        } catch (error) {
            showErrorAlert("Lỗi khi đăng xuất. Vui lòng thử lại!");
            console.error("Lỗi khi đăng xuất:", error);
        }
    };

    return (
        <div className={styles.userDropdown} ref={dropdownRef}>
            <div
                className={`${styles.userProfile} ${isOpen ? styles.open : ""}`}
                onClick={() => setIsOpen(!isOpen)}
                role="button"
                aria-expanded={isOpen}
                tabIndex={0}
            >
                <FaUser className={styles.menuIcon} />
                <span>{userName}</span>
                <FaAngleDown className={styles.dropdownIcon} />
            </div>

            {isOpen && (
                <div className={styles.dropdownMenu} role="menu">
                    <ul>
                        <li>
                            <FaRegUser className={styles.menuIcon} />
                            Thông tin tài khoản
                        </li>
                        <li>
                            <FaTicketAlt className={styles.menuIcon} />
                            Thành viên <strong>Thường</strong>
                        </li>
                        <li>
                            <FaRegCreditCard className={styles.menuIcon} />
                            Quản lý thẻ
                        </li>
                        <li>
                            <FaStar className={styles.menuIcon} />
                            Nhận xét chuyến đi
                        </li>
                        <li>
                            <FaGift className={styles.menuIcon} />
                            Ưu đãi
                        </li>
                        <li className={styles.logout} onClick={handleLogout}>
                            <FaSignOutAlt className={styles.menuIcon} />
                            Đăng xuất
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default UserDropdown;
