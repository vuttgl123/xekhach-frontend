import { FaKey } from "react-icons/fa";
import styles from "../../modal/modal.module.css";

const ForgotPasswordStep2 = ({ formData, handleChange, handleVerifyOtp, error, isLoading }) => {
  return (
    <div className={styles.stepContainer}>
      <h2 className={styles.modalTitle}>Xác nhận OTP</h2>
      <p className={styles.description}>Nhập mã OTP đã được gửi đến email của bạn.</p>

      {error && <p className={styles.errorMessage}>{error}</p>}

      <form onSubmit={handleVerifyOtp}>
        <div className={styles.inputGroup}>
          <FaKey className={styles.icon} />
          <input
            type="text"
            name="otp"
            placeholder="Nhập mã OTP"
            className={styles.input}
            value={formData.otp}
            onChange={handleChange}
            disabled={isLoading} // ✅ Disable khi loading
            required
          />
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isLoading} // ✅ Disable khi loading
        >
          {isLoading ? "Đang xác nhận..." : "Xác nhận"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordStep2;
