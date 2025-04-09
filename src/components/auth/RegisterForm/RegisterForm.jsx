import { useState } from "react";
import { register } from "../../api/authApi";
import RegisterStep1 from "./RegisterStep1";
import RegisterStep2 from "./RegisterStep2";
import styles from "../../modal/modal.module.css";
import { showErrorAlert } from "../../message/ErrorAlert";
import { showSuccessAlert } from "../../message/SuccessAlert";
import LoadingOverlay from "../../loading/LoadingOverlay"; // ✅ Import loading

const RegisterForm = ({ switchToLogin }) => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false); // ✅ Loading state
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "Nam",
    phoneNumber: "",
    address: "",
  });

  // Xử lý thay đổi input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Bước kế tiếp
  const handleNextStep = () => setStep(2);
  const handleBack = () => setStep(1);

  // Xử lý đăng ký
  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const result = await register(formData);

      await showSuccessAlert(result.message || "Đăng ký thành công! Vui lòng đăng nhập.");
      setTimeout(() => switchToLogin(), 2000);
    } catch (err) {
      showErrorAlert(err.message);
      setError(err.message); // để hiển thị lại nếu muốn
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.formContainer} style={{ position: "relative" }}>
      {isLoading && <LoadingOverlay text="Đang xử lý đăng ký..." />}

      {step === 1 ? (
        <RegisterStep1
          formData={formData}
          handleChange={handleChange}
          handleNextStep={handleNextStep}
          error={error}
          isLoading={isLoading} // ✅ truyền xuống
        />
      ) : (
        <RegisterStep2
          formData={formData}
          handleChange={handleChange}
          handleRegister={handleRegister}
          handleBack={handleBack}
          error={error}
          isLoading={isLoading} // ✅ truyền xuống
        />
      )}

      <p className={styles.signupText}>
        Bạn đã có tài khoản?{" "}
        <a href="#" className={styles.signupLink} onClick={switchToLogin}>
          Đăng nhập
        </a>
      </p>
    </div>
  );
};

export default RegisterForm;
