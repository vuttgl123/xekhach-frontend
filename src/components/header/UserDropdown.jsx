import { useState } from "react";
import { FaUser, FaSignOutAlt, FaGift, FaRegCreditCard, FaRegUser, FaAngleDown, FaTicketAlt, FaStar } from "react-icons/fa";
import styles from "./userdropdown.module.css";
import { logout } from "../api/authApi"; // Import hàm logout
import { showSuccessAlert } from "../message/SuccessAlert";
import { showErrorAlert } from "../message/ErrorAlert";

const UserDropdown = ({ userName, setIsLoggedIn }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await logout(); // Gọi API logout

            // ✅ Hiển thị thông báo thành công trước khi cập nhật giao diện
            showSuccessAlert("Đăng xuất thành công!").then(() => {
                setIsLoggedIn(false); // Cập nhật UI về trạng thái chưa đăng nhập
            });
        } catch (error) {
            showErrorAlert("Lỗi khi đăng xuất. Vui lòng thử lại!");
            console.error("Lỗi khi đăng xuất:", error);
        }
    };

    return (
        <div className={styles.userDropdown}>
            <div className={`${styles.userProfile} ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(!isOpen)}>
                <FaUser className={styles.menuIcon} />
                <span>{userName}</span>
                <FaAngleDown className={styles.dropdownIcon} />
            </div>

            {isOpen && (
                <div className={styles.dropdownMenu}>
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
