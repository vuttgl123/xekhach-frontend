import { useState, useRef, useEffect, useContext } from "react";
import {
  FaUser,
  FaSignOutAlt,
  FaGift,
  FaRegCreditCard,
  FaRegUser,
  FaAngleDown,
  FaTicketAlt,
  FaStar,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styles from "./userdropdown.module.css";
import { logout } from "../api/authApi";
import { showSuccessAlert } from "../message/SuccessAlert";
import { showErrorAlert } from "../message/ErrorAlert";
import { UserContext } from "../../context/UserContext"; // ✅ Lấy context

const UserDropdown = ({ userName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext); // ✅ dùng context để logout

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

  // ✅ Xử lý đăng xuất
  const handleLogout = async () => {
    try {
      await logout(); // API đăng xuất (nếu có)
      setUser(null);  // Cập nhật context → ẩn UserDropdown toàn app
      await showSuccessAlert("Đăng xuất thành công!");
      navigate("/home");
    } catch (error) {
      showErrorAlert("Lỗi khi đăng xuất. Vui lòng thử lại!");
      console.error("Lỗi khi đăng xuất:", error);
    }
  };

  // 📌 Điều hướng trong dashboard
  const handleNavigate = (section) => {
    navigate(`/user-dashboard?section=${section}`);
    setIsOpen(false);
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
            <li onClick={() => handleNavigate("profile")}>
              <FaRegUser className={styles.menuIcon} />
              Thông tin tài khoản
            </li>
            <li onClick={() => handleNavigate("membership")}>
              <FaTicketAlt className={styles.menuIcon} />
              Thành viên <strong>Thường</strong>
            </li>
            <li onClick={() => handleNavigate("cards")}>
              <FaRegCreditCard className={styles.menuIcon} />
              Quản lý thẻ
            </li>
            <li onClick={() => handleNavigate("reviews")}>
              <FaStar className={styles.menuIcon} />
              Nhận xét chuyến đi
            </li>
            <li onClick={() => handleNavigate("offers")}>
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
