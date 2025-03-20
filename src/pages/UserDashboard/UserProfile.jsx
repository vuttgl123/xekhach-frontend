import { useState, useEffect } from "react";
import { FaUser, FaPhone, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { fetchUserProfile, updateUserProfile } from "../../components/api/authApi"; // Import API
import { showSuccessAlert } from "../../components/message/SuccessAlert"; // Thông báo thành công
import { showErrorAlert } from "../../components/message/ErrorAlert"; // Thông báo thất bại
import styles from "./userprofile.module.css";

const UserProfile = () => {
    const [userData, setUserData] = useState({
        fullName: "",
        phoneNumber: "",
        birthDate: "",
        gender: "",
        address: "",
    });

    const [editMode, setEditMode] = useState(false);
    const [errors, setErrors] = useState({}); // Lưu lỗi hiển thị dưới input

    // 🚀 Lấy thông tin user từ API khi component mount
    useEffect(() => {
        fetchUserProfile().then((data) => {
            if (data) setUserData(data);
        });
    }, []);

    // 🚀 Hàm xử lý thay đổi input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    // 🚀 Kiểm tra lỗi trước khi cập nhật
    const validateForm = () => {
        let newErrors = {};

        if (!userData.fullName.trim()) {
            newErrors.fullName = "Họ và tên không được để trống";
        } else if (userData.fullName.length > 255) {
            newErrors.fullName = "Họ và tên không được vượt quá 255 ký tự";
        }

        if (!userData.birthDate) {
            newErrors.birthDate = "Ngày sinh không được để trống";
        }

        if (!["Nam", "Nữ", "Khác"].includes(userData.gender)) {
            newErrors.gender = "Giới tính không hợp lệ";
        }

        if (userData.address.length > 500) {
            newErrors.address = "Địa chỉ không được vượt quá 500 ký tự";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // 🚀 Gửi dữ liệu cập nhật lên API
    const handleSave = async () => {
        if (!validateForm()) {
            showErrorAlert("Có lỗi xảy ra! Vui lòng kiểm tra lại.");
            return;
        }

        try {
            const updatedData = await updateUserProfile(userData);
            if (updatedData) {
                showSuccessAlert("Cập nhật thông tin thành công!");
                setEditMode(false);
            } else {
                throw new Error("Lỗi khi cập nhật thông tin!");
            }
        } catch (error) {
            showErrorAlert("Cập nhật thất bại! Vui lòng thử lại.");
        }
    };

    return (
        <div className={styles.profileContainer}>
            <h2>Thông Tin Cá Nhân</h2>
            <form className={styles.userProfileForm}>
                {/* Họ và tên */}
                <label className={styles.labelstyle}>Họ và tên *</label>
                <div className={styles.inputGroup}>
                    <FaUser />
                    <input
                        type="text"
                        name="fullName"
                        value={userData.fullName}
                        onChange={handleChange}
                        disabled={!editMode}
                    />
                </div>
                {errors.fullName && <p className={styles.errorMessage}>{errors.fullName}</p>}

                {/* Số điện thoại (Không cho phép chỉnh sửa) */}
                <label className={styles.labelstyle}>Số điện thoại</label>
                <div className={styles.inputGroup}>
                    <FaPhone />
                    <input type="text" name="phoneNumber" value={userData.phoneNumber} disabled />
                </div>

                {/* Ngày sinh */}
                <label className={styles.labelstyle}>Ngày sinh</label>
                <div className={styles.inputGroup}>
                    <FaCalendarAlt />
                    <input
                        type="date"
                        name="birthDate"
                        value={userData.birthDate || ""}
                        onChange={handleChange}
                        disabled={!editMode}
                    />
                </div>
                {errors.birthDate && <p className={styles.errorMessage}>{errors.birthDate}</p>}

                {/* Giới tính */}
                <label className={styles.labelstyle}>Giới tính</label>
                <div className={styles.genderContainer}>
                    {["Nam", "Nữ", "Khác"].map((option) => (
                        <button
                            key={option}
                            type="button"
                            className={userData.gender === option ? styles.active : ""}
                            onClick={() => editMode && setUserData({ ...userData, gender: option })}
                        >
                            {option}
                        </button>
                    ))}
                </div>
                {errors.gender && <p className={styles.errorMessage}>{errors.gender}</p>}

                {/* Địa chỉ */}
                <label className={styles.labelstyle}>Địa chỉ</label>
                <div className={`${styles.inputGroup} ${styles.inputGroupFull}`}>
                    <FaMapMarkerAlt />
                    <input
                        type="text"
                        name="address"
                        value={userData.address}
                        onChange={handleChange}
                        disabled={!editMode}
                    />
                </div>
                {errors.address && <p className={styles.errorMessage}>{errors.address}</p>}

                {/* Nút Chỉnh sửa & Lưu */}
                <button
                    type="button"
                    className={styles.saveButton}
                    onClick={() => {
                        if (editMode) {
                            handleSave();
                        } else {
                            setEditMode(true);
                        }
                    }}
                >
                    {editMode ? "Lưu" : "Chỉnh sửa"}
                </button>
            </form>
        </div>
    );
};

export default UserProfile;
