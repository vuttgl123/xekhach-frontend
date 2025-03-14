import { useState } from "react";
import { register } from "../../api/authApi";
import RegisterStep1 from "./RegisterStep1";
import RegisterStep2 from "./RegisterStep2";
import styles from "../../modal/modal.module.css";
import { showErrorAlert } from "../../message/ErrorAlert";
import { showSuccessAlert } from "../../message/SuccessAlert";


const RegisterForm = ({ switchToLogin }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "Nam",
        phoneNumber: "",
        address: "",
    });

    const [error, setError] = useState(null);

    // Xử lý thay đổi input
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Chuyển sang bước 2
    const handleNextStep = () => {
        setStep(2);
    };

    // Quay lại bước 1
    const handleBack = () => {
        setStep(1);
    };

    // Xử lý đăng ký
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            // console.log("🚀 Gửi dữ liệu đăng ký:", formData);
            const result = await register(formData);
            
            // 🟢 Hiển thị thông báo thành công
            showSuccessAlert(result.message || "Đăng ký thành công! Vui lòng đăng nhập.");
            
            // ✅ Chuyển về trang đăng nhập sau khi người dùng nhấn OK
            setTimeout(() => switchToLogin(), 2000);
        } catch (error) {
            // console.error("❌ Lỗi khi đăng ký:", error);
            
            // 🔴 Hiển thị lỗi từ API
            showErrorAlert(error.message);
        }
    };
    
    return (
        <div className={styles.formContainer}>
            {step === 1 ? (
                <RegisterStep1 formData={formData} handleChange={handleChange} handleNextStep={handleNextStep} error={error} />
            ) : (
                <RegisterStep2 formData={formData} handleChange={handleChange} handleRegister={handleRegister} handleBack={handleBack} error={error} />
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
