import { useEffect, useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom"; // 🧩 Thêm
import styles from "./useraction.module.css";
import { fetchUserProfile } from "../api/authApi";
import UserDropdown from "./UserDropdown";

export default function UserActions() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const location = useLocation(); // ✅ Thêm dòng này

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const user = await fetchUserProfile();
        setIsLoggedIn(!!user);
        setUserName(user?.name || "User");
      } catch {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <div className={styles.userActions}>
      <button className={styles.hotlineButton}>
        <FaPhoneAlt className={styles.icon} /> Hotline 24/7
      </button>

      {isLoggedIn ? (
        <UserDropdown userName={userName} setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <button
          className={styles.loginButton}
          onClick={() => navigate("/login", { state: { backgroundLocation: location } })}
        >
          Login
        </button>
      )}
    </div>
  );
}
