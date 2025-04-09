import { useContext } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./useraction.module.css";
import { UserContext } from "../../context/UserContext"; // ✅ Dùng context
import UserDropdown from "./UserDropdown";

export default function UserActions() {
  const { user } = useContext(UserContext); // ✅ Lấy user từ context
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={styles.userActions}>
      <button className={styles.hotlineButton}>
        <FaPhoneAlt className={styles.icon} /> Hotline 24/7
      </button>
      {user ? (
        <UserDropdown userName={"User"} /> // ✅ Đã login: hiện dropdown
      ) : (
        <button
          className={styles.loginButton}
          onClick={() =>
            navigate("/login", {
              state: { backgroundLocation: location },
            })
          }
        >
          Login
        </button>
      )}
    </div>
  );
}
