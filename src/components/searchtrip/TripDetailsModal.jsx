import React, { useState } from "react";
import TripModal from "../modal/TripModal";
import styles from "./tripdetailsmodal.module.css";

const tabs = ["Giảm giá", "Đón/trả", "Đánh giá", "Chính sách", "Hình ảnh"];

export default function TripDetailsModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  if (!isOpen) return null; // ❗ Tránh nháy/chớp do React render lại modal

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
          {activeTab === "Giảm giá" && <DiscountList />}
          {activeTab === "Đón/trả" && <p>Thông tin điểm đón/trả...</p>}
          {activeTab === "Đánh giá" && <p>Đánh giá người dùng...</p>}
          {activeTab === "Chính sách" && <p>Chính sách hoàn vé, đổi trả...</p>}
          {activeTab === "Hình ảnh" && <p>Hình ảnh phương tiện, nhà xe...</p>}
        </div>
      </div>
    </TripModal>
  );
}

function DiscountList() {
  const data = [
    { brand: "Muadee", value: "20k", min: "200k", exp: "T2, 30/06" },
    { brand: "Muadee", value: "50k", min: "500k", exp: "T2, 30/06" },
    { brand: "HD SAISON", value: "100k", min: "450k", exp: "T7, 31/05" },
    { brand: "HD SAISON", value: "50k", min: "250k", exp: "T7, 31/05" },
    { brand: "Vexere", value: "10%", min: "1 vé", exp: "T3, 01/04" },
  ];

  return (
    <div className={styles.discountGrid}>
      {data.map((d, i) => (
        <div key={i} className={styles.discountCard}>
          <p className={styles.discountBrand}>{d.brand}</p>
          <p className={styles.discountValue}>Giảm {d.value}</p>
          <p className={styles.discountText}>Đơn từ {d.min}</p>
          <p className={styles.discountExp}>HSD: {d.exp}</p>
        </div>
      ))}
    </div>
  );
}
