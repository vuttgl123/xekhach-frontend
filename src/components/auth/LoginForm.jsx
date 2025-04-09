import { useState, useContext } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { login } from "../api/authApi";
import { showSuccessAlert } from "../message/SuccessAlert";
import { showErrorAlert } from "../message/ErrorAlert";
import LoadingOverlay from "../loading/LoadingOverlay";
import { UserContext } from "../../context/UserContext"; // ✅ Import context
import styles from "../modal/modal.module.css";

const LoginForm = ({ switchToRegister, switchToForgotPassword }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.backgroundLocation?.pathname || "/home";

  const { checkLoginStatus } = useContext(UserContext); // ✅ Dùng context

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const data = await login(email, password);
      await showSuccessAlert("Đăng nhập thành công!");

      await checkLoginStatus(); // ✅ cập nhật trạng thái user toàn app

      navigate(from, { replace: true });
    } catch (err) {
      showErrorAlert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.formContainer} style={{ position: "relative" }}>
      {isLoading && <LoadingOverlay text="Đang đăng nhập..." />}

      <h2 className={styles.modalTitle}>Đăng nhập</h2>

      <div className={styles.inputGroup}>
        <FaUser className={styles.icon} />
        <input
          type="text"
          placeholder="Nhập email của bạn"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className={styles.inputGroup}>
        <FaLock className={styles.icon} />
        <input
          type="password"
          placeholder="Mật khẩu"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <a href="" className={styles.forgotPassword} onClick={switchToForgotPassword}>
        Quên mật khẩu?
      </a>

      <button
        className={styles.submitButton}
        onClick={handleLogin}
        disabled={isLoading}
      >
        Đăng nhập
      </button>

      <p className={styles.signupText}>
        Bạn không có tài khoản?{" "}
        <a href="" className={styles.signupLink} onClick={switchToRegister}>
          Đăng kí ngay
        </a>
      </p>
    </div>
  );
};

export default LoginForm;
