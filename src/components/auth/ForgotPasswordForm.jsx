import { useState } from "react";
import { FaEnvelope, FaLock, FaKey } from "react-icons/fa";
import styles from "../modal/modal.module.css";

const ForgotPasswordForm = ({ switchToLogin }) => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Xử lý gửi email để nhận mã OTP
    const handleSendOtp = (e) => {
        e.preventDefault();
        setStep(2); // Chuyển sang bước 2 (Nhập mã OTP)
    };

    // Xử lý xác nhận mã OTP
    const handleVerifyOtp = (e) => {
        e.preventDefault();
        setStep(3); // Chuyển sang bước 3 (Đổi mật khẩu)
    };

    // Xử lý cập nhật mật khẩu
    const handleResetPassword = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert("Mật khẩu xác nhận không khớp!");
            return;
        }
        alert("Mật khẩu đã được cập nhật!");
        switchToLogin(); // Quay lại đăng nhập sau khi cập nhật thành công
    };

    return (
        <div className={styles.formContainer}>
            {step === 1 && (
                <>
                    <h2 className={styles.modalTitle}>Quên Mật Khẩu</h2>
                    <p className={styles.description}>
                        Nhập email của bạn để nhận mã OTP xác thực.
                    </p>
                    <form onSubmit={handleSendOtp}>
                        <div className={styles.inputGroup}>
                            <FaEnvelope className={styles.icon} />
                            <input
                                type="email"
                                placeholder="Nhập email của bạn"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className={styles.submitButton}>Gửi mã OTP</button>
                    </form>
                </>
            )}

            {step === 2 && (
                <>
                    <h2 className={styles.modalTitle}>Xác nhận OTP</h2>
                    <p className={styles.description}>
                        Nhập mã OTP đã được gửi đến email của bạn.
                    </p>
                    <form onSubmit={handleVerifyOtp}>
                        <div className={styles.inputGroup}>
                            <FaKey className={styles.icon} />
                            <input
                                type="number"
                                placeholder="Nhập mã OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className={styles.submitButton}>Xác nhận</button>
                    </form>
                </>
            )}

            {step === 3 && (
                <>
                    <h2 className={styles.modalTitle}>Cập nhật Mật Khẩu</h2>
                    <p className={styles.description}>
                        Nhập mật khẩu mới của bạn để hoàn tất quá trình.
                    </p>
                    <form onSubmit={handleResetPassword}>
                        <div className={styles.inputGroup}>
                            <FaLock className={styles.icon} />
                            <input
                                type="password"
                                placeholder="Mật khẩu mới"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <FaLock className={styles.icon} />
                            <input
                                type="password"
                                placeholder="Xác nhận mật khẩu"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className={styles.submitButton}>Cập nhật mật khẩu</button>
                    </form>
                </>
            )}

            <p className={styles.backToLogin}>
                <a href="#" className={styles.signupLink} onClick={switchToLogin}>Quay lại đăng nhập</a>
            </p>
        </div>
    );
};

export default ForgotPasswordForm;
