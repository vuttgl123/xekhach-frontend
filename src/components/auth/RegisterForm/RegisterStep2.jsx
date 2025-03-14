import { useState } from "react";
import { FaPhone, FaMapMarkerAlt, FaVenusMars } from "react-icons/fa";
import styles from "../../modal/modal.module.css";

const RegisterStep2 = ({ formData, handleChange, handleRegister, handleBack }) => {
    const [errors, setErrors] = useState({});
    const genders = ["Nam", "Nữ", "Khác"];

    // Kiểm tra dữ liệu trước khi đăng ký
    const validateStep2 = () => {
        let newErrors = {};

        // Kiểm tra Giới tính
        if (!formData.gender) {
            newErrors.gender = "Giới tính không được để trống";
        }

        // Kiểm tra Số điện thoại
        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = "Số điện thoại không được để trống";
        } else if (!/^\d{10,15}$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = "Số điện thoại phải có từ 10 đến 15 chữ số";
        }

        // Kiểm tra Địa chỉ
        if (!formData.address.trim()) {
            newErrors.address = "Địa chỉ không được để trống";
        } else if (formData.address.length > 500) {
            newErrors.address = "Địa chỉ không được vượt quá 500 ký tự";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Xử lý gửi đăng ký
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateStep2()) {
            handleRegister(e);
        }
    };

    return (
        <div>
            <h2 className={styles.modalTitle}>Đăng ký - Bước 2</h2>

            <form onSubmit={handleSubmit}>
                {/* 🟢 Giới tính - Radio Buttons */}
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
                                    required
                                />
                                {gender}
                            </label>
                        ))}
                    </div>
                </div>
                {errors.gender && <p className={styles.errorMessage}>{errors.gender}</p>}

                {/* 🟢 Số điện thoại */}
                <div className={`${styles.inputGroup} ${errors.phoneNumber ? styles.error : ""}`}>
                    <FaPhone className={styles.icon} />
                    <input
                        type="text"
                        name="phoneNumber"
                        placeholder="Số điện thoại"
                        className={styles.input}
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                {errors.phoneNumber && <p className={styles.errorMessage}>{errors.phoneNumber}</p>}

                {/* 🟢 Địa chỉ */}
                <div className={`${styles.inputGroup} ${errors.address ? styles.error : ""}`}>
                    <FaMapMarkerAlt className={styles.icon} />
                    <input
                        type="text"
                        name="address"
                        placeholder="Địa chỉ"
                        className={styles.input}
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                {errors.address && <p className={styles.errorMessage}>{errors.address}</p>}

                {/* 🟢 Nút hành động */}
                <div className={styles.buttonGroup}>
                    <button type="button" className={styles.backButton} onClick={handleBack}>
                        Quay lại
                    </button>
                    <button type="submit" className={styles.submitButton}>
                        Đăng ký
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RegisterStep2;
