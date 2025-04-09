import { useState } from "react";
import { FaPhone, FaMapMarkerAlt, FaVenusMars } from "react-icons/fa";
import styles from "../../modal/modal.module.css";

const RegisterStep2 = ({
  formData,
  handleChange,
  handleRegister,
  handleBack,
  isLoading, // ✅ Thêm prop
}) => {
  const [errors, setErrors] = useState({});
  const genders = ["Nam", "Nữ", "Khác"];

  const validateStep2 = () => {
    let newErrors = {};

    if (!formData.gender) {
      newErrors.gender = "Giới tính không được để trống";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Số điện thoại không được để trống";
    } else if (!/^\d{10,15}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Số điện thoại phải có từ 10 đến 15 chữ số";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Địa chỉ không được để trống";
    } else if (formData.address.length > 500) {
      newErrors.address = "Địa chỉ không được vượt quá 500 ký tự";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep2()) {
      handleRegister(e);
    }
  };

  return (
    <div className={styles.stepContainer}>
      <h2 className={styles.modalTitle}>Đăng ký - Bước 2</h2>

      <form onSubmit={handleSubmit}>
        {/* Giới tính */}
        <div className={styles.inputGroup}>
          <FaVenusMars className={styles.icon} />
          <div className={styles.genderGroup}>
            {genders.map((gender) => (
              <label key={gender} className={styles.radioLabel}>
                <input
                  type="radio"
                  name="gender"
                  value={gender}
                  checked={formData.gender === gender}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                />
                {gender}
              </label>
            ))}
          </div>
        </div>
        {errors.gender && <p className={styles.errorMessage}>{errors.gender}</p>}

        {/* Số điện thoại */}
        <div className={`${styles.inputGroup} ${errors.phoneNumber ? styles.error : ""}`}>
          <FaPhone className={styles.icon} />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Số điện thoại"
            className={styles.input}
            value={formData.phoneNumber}
            onChange={handleChange}
            disabled={isLoading}
            required
          />
        </div>
        {errors.phoneNumber && <p className={styles.errorMessage}>{errors.phoneNumber}</p>}

        {/* Địa chỉ */}
        <div className={`${styles.inputGroup} ${errors.address ? styles.error : ""}`}>
          <FaMapMarkerAlt className={styles.icon} />
          <input
            type="text"
            name="address"
            placeholder="Địa chỉ"
            className={styles.input}
            value={formData.address}
            onChange={handleChange}
            disabled={isLoading}
            required
          />
        </div>
        {errors.address && <p className={styles.errorMessage}>{errors.address}</p>}

        {/* Nút hành động */}
        <div className={styles.buttonGroup}>
          <button
            type="button"
            className={styles.backButton}
            onClick={handleBack}
            disabled={isLoading}
          >
            Quay lại
          </button>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? "Đang đăng ký..." : "Đăng ký"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterStep2;
