import { useState, useEffect } from "react";
import {
    FaUser,
    FaPhone,
    FaCalendarAlt,
    FaMapMarkerAlt,
} from "react-icons/fa";
import {
    fetchUserProfile,
    updateUserProfile,
} from "../../components/api/authApi";
import { showSuccessAlert } from "../../components/message/SuccessAlert";
import { showErrorAlert } from "../../components/message/ErrorAlert";
import LoadingOverlay from "../../components/loading/LoadingOverlay"; // ✅ import overlay
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
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(true); // ✅ loading khi fetch
    const [isSaving, setIsSaving] = useState(false); // ✅ loading khi lưu

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchUserProfile();
                if (data) setUserData(data);
            } catch (err) {
                showErrorAlert("Không thể tải thông tin người dùng.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

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

    const handleSave = async () => {
        if (!validateForm()) {
            showErrorAlert("Có lỗi xảy ra! Vui lòng kiểm tra lại.");
            return;
        }

        setIsSaving(true);
        try {
            const updatedData = await updateUserProfile(userData);
            if (updatedData) {
                showSuccessAlert("Cập nhật thông tin thành công!");
                setEditMode(false);
            } else {
                throw new Error("Cập nhật thất bại");
            }
        } catch (err) {
            showErrorAlert("Cập nhật thất bại! Vui lòng thử lại.");
        } finally {
            setIsSaving(false);
        }
    };

    // ✅ Loading khi chưa fetch xong
    if (isLoading) {
        return <LoadingOverlay text="Đang tải thông tin cá nhân..." />;
    }

    return (
        <div className={styles.profileContainer}>
            <h2>Thông Tin Cá Nhân</h2>
            <form className={styles.userProfileForm}>
                <label className={styles.labelstyle}>Họ và tên *</label>
                <div className={styles.inputGroup}>
                    <FaUser />
                    <input
                        type="text"
                        name="fullName"
                        value={userData.fullName}
                        onChange={handleChange}
                        disabled={!editMode || isSaving}
                    />
                </div>
                {errors.fullName && <p className={styles.errorMessage}>{errors.fullName}</p>}

                <label className={styles.labelstyle}>Số điện thoại</label>
                <div className={styles.inputGroup}>
                    <FaPhone />
                    <input
                        type="text"
                        name="phoneNumber"
                        value={userData.phoneNumber}
                        disabled
                    />
                </div>

                <label className={styles.labelstyle}>Ngày sinh</label>
                <div className={styles.inputGroup}>
                    <FaCalendarAlt />
                    <input
                        type="date"
                        name="birthDate"
                        value={userData.birthDate || ""}
                        onChange={handleChange}
                        disabled={!editMode || isSaving}
                    />
                </div>
                {errors.birthDate && <p className={styles.errorMessage}>{errors.birthDate}</p>}

                <label className={styles.labelstyle}>Giới tính</label>
                <div className={styles.genderContainer}>
                    {["Nam", "Nữ", "Khác"].map((option) => (
                        <button
                            key={option}
                            type="button"
                            className={userData.gender === option ? styles.active : ""}
                            onClick={() =>
                                editMode && !isSaving && setUserData({ ...userData, gender: option })
                            }
                        >
                            {option}
                        </button>
                    ))}
                </div>
                {errors.gender && <p className={styles.errorMessage}>{errors.gender}</p>}

                <label className={styles.labelstyle}>Địa chỉ</label>
                <div className={`${styles.inputGroup} ${styles.inputGroupFull}`}>
                    <FaMapMarkerAlt />
                    <input
                        type="text"
                        name="address"
                        value={userData.address}
                        onChange={handleChange}
                        disabled={!editMode || isSaving}
                    />
                </div>
                {errors.address && <p className={styles.errorMessage}>{errors.address}</p>}

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
                    disabled={isSaving}
                >
                    {isSaving ? "Đang lưu..." : editMode ? "Lưu" : "Chỉnh sửa"}
                </button>
            </form>
        </div>
    );
};

export default UserProfile;
