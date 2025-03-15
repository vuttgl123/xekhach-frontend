import { useState } from "react";
import ForgotPasswordStep1 from "./ForgotPasswordStep1";
import ForgotPasswordStep2 from "./ForgotPasswordStep2";
import ForgotPasswordStep3 from "./ForgotPasswordStep3";
import { sendOtp, verifyOtp, resetPassword } from "../../api/authApi";
import { showErrorAlert } from "../../message/ErrorAlert";
import { showSuccessAlert } from "../../message/SuccessAlert";
import styles from "../../modal/modal.module.css";

const ForgotPasswordForm = ({ switchToLogin }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        email: "",
        otp: "",
        newPassword: "",
        confirmPassword: "",
    });

    // 📌 Xử lý thay đổi input
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 📌 Gửi yêu cầu gửi OTP
    const handleSendOtp = async (e) => {
        e.preventDefault();
        try {
            await sendOtp(formData.email);
            showSuccessAlert("Mã OTP đã được gửi đến email của bạn!");
            setStep(2); // ✅ Chuyển sang bước nhập OTP
        } catch (err) {
            showErrorAlert("Hãy kiểm tra lại tài khoản email!");
        }
    };

    // 📌 Xác thực OTP
    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        try {
            await verifyOtp(formData.email, formData.otp);
            showSuccessAlert("Xác thực OTP thành công! Hãy đặt lại mật khẩu.");
            setStep(3); // ✅ Chuyển sang bước đặt lại mật khẩu
        } catch (err) {
            showErrorAlert(err.message);
        }
    };

    // 📌 Đổi mật khẩu mới
    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (formData.newPassword !== formData.confirmPassword) {
            showErrorAlert("Mật khẩu xác nhận không khớp!");
            return;
        }
        try {
            await resetPassword(formData.email, formData.newPassword);
            showSuccessAlert("Mật khẩu đã được cập nhật thành công!");
            switchToLogin(); // ✅ Quay về màn hình đăng nhập
        } catch (err) {
            showErrorAlert(err.message);
        }
    };

    return (
        <div className={styles.formContainer}>
            {step === 1 && <ForgotPasswordStep1 formData={formData} handleChange={handleChange} handleSendOtp={handleSendOtp} />}
            {step === 2 && <ForgotPasswordStep2 formData={formData} handleChange={handleChange} handleVerifyOtp={handleVerifyOtp} />}
            {step === 3 && <ForgotPasswordStep3 formData={formData} handleChange={handleChange} handleResetPassword={handleResetPassword} switchToLogin={switchToLogin} />}
        </div>
    );
};

export default ForgotPasswordForm;
