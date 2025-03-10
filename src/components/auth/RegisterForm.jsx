import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import styles from "../modal/modal.module.css";

const RegisterForm = ({ switchToLogin }) => {
    return (
        <div className={styles.formContainer}>
            <h2 className={styles.modalTitle}>Đăng ký</h2>

            <div className={styles.inputGroup}>
                <FaUser className={styles.icon} />
                <input type="text" placeholder="Họ và tên" className={styles.input} />
            </div>

            <div className={styles.inputGroup}>
                <FaEnvelope className={styles.icon} />
                <input type="email" placeholder="Email" className={styles.input} />
            </div>

            <div className={styles.inputGroup}>
                <FaLock className={styles.icon} />
                <input type="password" placeholder="Mật khẩu" className={styles.input} />
            </div>

            <div className={styles.inputGroup}>
                <FaLock className={styles.icon} />
                <input type="password" placeholder="Xác nhận mật khẩu" className={styles.input} />
            </div>

            <button className={styles.submitButton}>Đăng ký</button>

            <p className={styles.signupText}>
                Bạn đã có tài khoản? <a href="#" className={styles.signupLink} onClick={switchToLogin}>Đăng nhập</a>
            </p>
        </div>
    );
};

export default RegisterForm;
