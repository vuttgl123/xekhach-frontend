import { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import styles from "../../modal/modal.module.css";

const RegisterStep1 = ({ formData, handleChange, handleNextStep, isLoading }) => {
  const [errors, setErrors] = useState({});

  const validateStep1 = () => {
    let newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Họ và tên không được để trống";
    } else if (formData.fullName.length > 255) {
      newErrors.fullName = "Họ và tên không được vượt quá 255 ký tự";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email không được để trống";
    } else if (!/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    } else if (formData.email.length > 320) {
      newErrors.email = "Email không được vượt quá 320 ký tự";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Mật khẩu không được để trống";
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    } else if (formData.password.length > 255) {
      newErrors.password = "Mật khẩu không được vượt quá 255 ký tự";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Xác nhận mật khẩu không được để trống";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className={styles.stepContainer}>
      <h2 className={styles.modalTitle}>Đăng ký - Bước 1</h2>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className={`${styles.inputGroup} ${errors.fullName ? styles.error : ""}`}>
          <FaUser className={styles.icon} />
          <input
            type="text"
            name="fullName"
            placeholder="Họ và tên"
            className={styles.input}
            value={formData.fullName}
            onChange={handleChange}
            disabled={isLoading}
            required
          />
        </div>
        {errors.fullName && <p className={styles.errorMessage}>{errors.fullName}</p>}

        <div className={styles.inputGroup}>
          <FaEnvelope className={styles.icon} />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className={styles.input}
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
            required
          />
          {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}
        </div>

        <div className={styles.inputGroup}>
          <FaLock className={styles.icon} />
          <input
            type="password"
            name="password"
            placeholder="Mật khẩu"
            className={styles.input}
            value={formData.password}
            onChange={handleChange}
            disabled={isLoading}
            required
          />
          {errors.password && <p className={styles.errorMessage}>{errors.password}</p>}
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
            disabled={isLoading}
            required
          />
          {errors.confirmPassword && <p className={styles.errorMessage}>{errors.confirmPassword}</p>}
        </div>

        <button
          type="button"
          className={styles.submitButton}
          onClick={() => {
            if (validateStep1()) handleNextStep();
          }}
          disabled={isLoading}
        >
          {isLoading ? "Đang kiểm tra..." : "Tiếp tục"}
        </button>
      </form>
    </div>
  );
};

export default RegisterStep1;
