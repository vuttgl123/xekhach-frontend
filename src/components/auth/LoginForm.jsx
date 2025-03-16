import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { login } from "../api/authApi"; // API đăng nhập
import { showSuccessAlert } from "../message/SuccessAlert"; // Alert thành công
import { showErrorAlert } from "../message/ErrorAlert"; // Alert lỗi
import styles from "../modal/modal.module.css"; // Giữ nguyên module CSS

const LoginForm = ({ switchToRegister, switchToForgotPassword }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        // console.log("🚀 Nút đăng nhập đã được bấm!");

        try {
            const data = await login(email, password);
            // console.log("✅ API trả về:", data);

            showSuccessAlert("Đăng nhập thành công!").then(() => {
                window.location.href = "/home";
            });

        } catch (err) {
            // console.error("❌ Lỗi khi gọi API:", err);
            showErrorAlert(err.message);
        }
    };
    return (
        <div className={styles.formContainer}>
            <h2 className={styles.modalTitle}>Đăng nhập</h2>
            <div className={styles.inputGroupLogin}>
                <FaUser className={styles.icon} />
                <input
                    type="text"
                    placeholder="Nhập email của bạn"
                    className={styles.input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className={styles.inputGroupLogin}>
                <FaLock className={styles.icon} />
                <input
                    type="password"
                    placeholder="Mật khẩu"
                    className={styles.input}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <a href="#" className={styles.forgotPassword} onClick={switchToForgotPassword}>Quên mật khẩu?</a>

            <button className={styles.submitButton} onClick={handleLogin}>Đăng nhập</button>

            <p className={styles.signupText}>
                Bạn không có tài khoản? <a href="#" className={styles.signupLink} onClick={switchToRegister}>Đăng kí ngay</a>
            </p>
        </div>
    );
};

export default LoginForm;
