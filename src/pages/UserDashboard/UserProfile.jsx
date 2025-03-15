import { useState } from "react";
import { FaUser, FaPhone, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import styles from "./userprofile.module.css";

const UserProfile = () => {
    const [userData, setUserData] = useState({
        fullName: "Nguyễn Văn A",
        phoneNumber: "0987654321",
        birthDate: "2000-01-05",
        gender: "Nam",
        address: "123 Đường ABC, Quận 1, TP.HCM",
    });

    const [editMode, setEditMode] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    return (
        <div className={styles.profileContainer}>
            <h2>Thông Tin Cá Nhân</h2>
            <form>
                {/* Họ và tên */}
                <label>Họ và tên *</label>
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

                {/* Số điện thoại */}
                <label>Số điện thoại</label>
                <div className={styles.inputGroup}>
                    <FaPhone />
                    <input type="text" name="phoneNumber" value={userData.phoneNumber} disabled />
                </div>

                {/* Ngày sinh (Có thể chọn lịch hoặc nhập) */}
                <label>Ngày sinh</label>
                <div className={styles.inputGroup}>
                    <FaCalendarAlt />
                    <input 
                        type="date" 
                        name="birthDate" 
                        value={userData.birthDate} 
                        onChange={handleChange} 
                        disabled={!editMode} 
                    />
                </div>

                {/* Giới tính */}
                <label>Giới tính</label>
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

                {/* Địa chỉ */}
                <label>Địa chỉ</label>
                <div className={`${styles.inputGroup} ${styles.inputGroupFull}`}>
                    <FaMapMarkerAlt />
                    <input type="text" name="address" value={userData.address} onChange={handleChange} disabled={!editMode} />
                </div>

                {/* Nút chỉnh sửa & Lưu */}
                <button type="button" className={styles.saveButton} onClick={() => setEditMode(!editMode)}>
                    {editMode ? "Lưu" : "Chỉnh sửa"}
                </button>
            </form>
        </div>
    );
};

export default UserProfile;
