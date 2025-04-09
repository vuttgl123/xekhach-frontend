import { useState } from "react";
import ForgotPasswordStep1 from "./ForgotPasswordStep1";
import ForgotPasswordStep2 from "./ForgotPasswordStep2";
import ForgotPasswordStep3 from "./ForgotPasswordStep3";
import { sendOtp, verifyOtp, resetPassword } from "../../api/authApi";
import { showErrorAlert } from "../../message/ErrorAlert";
import { showSuccessAlert } from "../../message/SuccessAlert";
import LoadingOverlay from "../../loading/LoadingOverlay"; // ✅ Thêm dòng này
import styles from "../../modal/modal.module.css";

const ForgotPasswordForm = ({ switchToLogin }) => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false); // ✅ Loading state
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true); // ✅ Bắt đầu loading
    try {
      await sendOtp(formData.email);
      await showSuccessAlert("Mã OTP đã được gửi đến email của bạn!");
      setStep(2);
    } catch (err) {
      showErrorAlert("Hãy kiểm tra lại tài khoản email!");
    } finally {
      setIsLoading(false); // ✅ Kết thúc loading
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await verifyOtp(formData.email, formData.otp);
      await showSuccessAlert("Xác thực OTP thành công! Hãy đặt lại mật khẩu.");
      setStep(3);
    } catch (err) {
      showErrorAlert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      showErrorAlert("Mật khẩu xác nhận không khớp!");
      return;
    }

    setIsLoading(true);
    try {
      await resetPassword(formData.email, formData.newPassword);
      await showSuccessAlert("Mật khẩu đã được cập nhật thành công!");
      switchToLogin();
    } catch (err) {
      showErrorAlert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.formContainer} style={{ position: "relative" }}>
      {isLoading && <LoadingOverlay text="Đang xử lý..." />} {/* ✅ Hiển thị overlay */}

      {step === 1 && (
        <ForgotPasswordStep1
          formData={formData}
          handleChange={handleChange}
          handleSendOtp={handleSendOtp}
          isLoading={isLoading} // ✅ truyền loading xuống
        />
      )}
      {step === 2 && (
        <ForgotPasswordStep2
          formData={formData}
          handleChange={handleChange}
          handleVerifyOtp={handleVerifyOtp}
          isLoading={isLoading}
        />
      )}
      {step === 3 && (
        <ForgotPasswordStep3
          formData={formData}
          handleChange={handleChange}
          handleResetPassword={handleResetPassword}
          switchToLogin={switchToLogin}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default ForgotPasswordForm;
