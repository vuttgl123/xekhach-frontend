import { useState, useEffect } from "react";
import { 
    FaUserCircle, FaSignOutAlt, FaGift, FaRegCreditCard, 
    FaRegUser, FaTicketAlt, FaStar, FaHome, FaBars, FaTimes 
} from "react-icons/fa";
import styles from "./sidebar.module.css";

const Sidebar = ({ activeSection, handleNavigation }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isOpen, setIsOpen] = useState(!isMobile); // Desktop mở sẵn, Mobile đóng

    // 🔹 Cập nhật khi resize cửa sổ
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setIsMobile(true);
                setIsOpen(false); // Ẩn trên mobile
            } else {
                setIsMobile(false);
                setIsOpen(true); // Luôn mở trên desktop
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            {/* 🔹 Nút Menu trên Mobile */}
            {isMobile && (
                <button className={styles.menuButton} onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
            )}

            {/* 🔹 Sidebar */}
            <div className={`${styles.sidebar} ${isMobile && !isOpen ? styles.closed : styles.open}`}>
                {/* Profile Section */}
                <div className={styles.profile}>
                    <FaUserCircle className={styles.userIcon} />
                    <p>Username</p>
                    <span className={styles.status}>● ONLINE</span>
                </div>

                {/* Menu Items */}
                <ul>
                    <li className={activeSection === "dashboard" ? styles.active : ""} onClick={() => handleNavigation("dashboard")}>
                        <FaHome className={styles.icon} /> Dashboard
                    </li>
                    <li className={activeSection === "profile" ? styles.active : ""} onClick={() => handleNavigation("profile")}>
                        <FaRegUser className={styles.icon} /> Thông tin tài khoản
                    </li>
                    <li className={activeSection === "membership" ? styles.active : ""} onClick={() => handleNavigation("membership")}>
                        <FaTicketAlt className={styles.icon} /> Thành viên
                    </li>
                    <li className={activeSection === "cards" ? styles.active : ""} onClick={() => handleNavigation("cards")}>
                        <FaRegCreditCard className={styles.icon} /> Quản lý thẻ
                    </li>
                    <li className={activeSection === "reviews" ? styles.active : ""} onClick={() => handleNavigation("reviews")}>
                        <FaStar className={styles.icon} /> Nhận xét
                    </li>
                    <li className={activeSection === "offers" ? styles.active : ""} onClick={() => handleNavigation("offers")}>
                        <FaGift className={styles.icon} /> Ưu đãi
                    </li>
                    <li className={styles.logout} onClick={() => handleNavigation("logout")}>
                        <FaSignOutAlt className={styles.icon} /> Đăng xuất
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Sidebar;
