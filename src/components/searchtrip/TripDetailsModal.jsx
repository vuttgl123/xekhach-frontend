import React, { useState } from "react";
import TripModal from "../modal/TripModal";
import styles from "./tripdetailsmodal.module.css";
import DriverInfo from "./DriverInfo"; // Import DriverInfo
import Policy from "./Policy";
import PromotionList from "./PromotionList";

const tabs = ["Tài xế", "Giảm giá", "Đánh giá", "Chính sách", "Hình ảnh"];

export default function TripDetailsModal({ isOpen, onClose, trip }) {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  if (!isOpen) return null;

  const driverInfo = trip.driverInfo; // Lấy thông tin tài xế từ trip

  return (
    <TripModal isOpen={isOpen} onClose={onClose}>
      <div className={styles.container}>
        <div className={styles.tabHeader}>
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`${styles.tabItem} ${activeTab === tab ? styles.active : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className={styles.tabContent}>
          {activeTab === "Tài xế" && <DriverInfo driverInfo={driverInfo} />} {/* Truyền toàn bộ thông tin tài xế */}
          {activeTab === "Giảm giá" && <PromotionList />}
          {activeTab === "Đánh giá" && <p>Đánh giá người dùng...</p>}
          {activeTab === "Chính sách" && <Policy/>}
          {activeTab === "Hình ảnh" && <p>Hình ảnh phương tiện, nhà xe...</p>}
        </div>
      </div>
    </TripModal>
  );
}


