import React from "react";
import styles from "./driverinfo.module.css"; // Đảm bảo bạn đã import CSS mới

export default function DriverInfo({ driverInfo }) {
  if (!driverInfo) {
    return <p>Không tìm thấy thông tin tài xế.</p>;
  }

  return (
    <div className={styles.driverInfo}>
      <h3>Thông tin tài xế</h3>

      <div className={styles.infoRow}>
      <img src={`${process.env.PUBLIC_URL}/images/long.png`} alt="Avatar" className={styles.avatarWrapper} />
        <div className={styles.details}>
          <p><strong>Tên tài xế:</strong> {driverInfo.fullName}</p>
          <p><strong>Số điện thoại:</strong> {driverInfo.phoneNumber}</p>
          <p><strong>Giấy phép lái xe:</strong> {driverInfo.licenseType}</p>
          <p><strong>Ngày cấp:</strong> {new Date(driverInfo.licenseExpiryDate).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}
