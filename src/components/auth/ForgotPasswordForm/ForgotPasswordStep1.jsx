import { FaEnvelope } from "react-icons/fa";
import styles from "../../modal/modal.module.css";

const ForgotPasswordStep1 = ({ formData, handleChange, handleSendOtp, error }) => {
    return (
        <div>
            <h2 className={styles.modalTitle}>Quên Mật Khẩu</h2>
            <p className={styles.description}>Nhập email của bạn để nhận mã OTP xác thực.</p>

            {error && <p className={styles.errorMessage}>{error}</p>} {/* Hiển thị lỗi */}

            <form onSubmit={handleSendOtp}>
                <div className={styles.inputGroup}>
                    <FaEnvelope className={styles.icon} />
                    <input
                        type="email"
                        name="email"
                        placeholder="Nhập email của bạn"
                        className={styles.input}
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className={styles.submitButton}>Gửi mã OTP</button>
            </form>
        </div>
    );
};

export default ForgotPasswordStep1;
