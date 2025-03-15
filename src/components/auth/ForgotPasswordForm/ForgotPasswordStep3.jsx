import { FaLock } from "react-icons/fa";
import styles from "../../modal/modal.module.css";

const ForgotPasswordStep3 = ({ formData, handleChange, handleResetPassword, error, switchToLogin }) => {
    return (
        <div>
            <h2 className={styles.modalTitle}>Cập nhật Mật Khẩu</h2>
            <p className={styles.description}>Nhập mật khẩu mới của bạn để hoàn tất quá trình.</p>

            {error && <p className={styles.errorMessage}>{error}</p>} {/* Hiển thị lỗi */}

            <form onSubmit={handleResetPassword}>
                <div className={styles.inputGroup}>
                    <FaLock className={styles.icon} />
                    <input
                        type="password"
                        name="newPassword"
                        placeholder="Mật khẩu mới"
                        className={styles.input}
                        value={formData.newPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.inputGroup}>
                    <FaLock className={styles.icon} />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Xác nhận mật khẩu"
                        className={styles.input}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className={styles.submitButton}>Cập nhật mật khẩu</button>
            </form>
        </div>
    );
};

export default ForgotPasswordStep3;
