import React, { useState, useEffect } from "react";
import styles from "./sidebarfilters.module.css";

export default function SidebarFilters() {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Kiểm tra kích thước màn hình để xác định chế độ mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const sidebarContent = (
    <aside className={`${styles.sidebar} ${isMobile && isOpen ? styles.open : ""}`}>
      {isMobile && (
        <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
          ✖
        </button>
      )}

      <div className={styles.section}>
        <h2 className={styles.title}>Sắp xếp</h2>
        <div className={styles.radioGroup}>
          {["Mặc định", "Giờ đi sớm nhất", "Giờ đi muộn nhất", "Đánh giá cao nhất"].map((label, idx) => (
            <label key={idx} className={styles.option}>
              <input type="radio" name="sort" defaultChecked={idx === 0} />
              {label}
            </label>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.title}>Lọc</h2>
        {[
          { title: "Giờ đi", options: ["Sáng sớm", "Buổi trưa", "Buổi tối"] },
          { title: "Chuyến đi", options: ["Một chiều", "Khứ hồi"] },
        ].map((group, idx) => (
          <div key={idx} className={styles.section}>
            <h3 className={styles.title}>{group.title}</h3>
            <div className={styles.checkboxGroup}>
              {group.options.map((opt, i) => (
                <label key={i} className={styles.option}>
                  <input type="checkbox" />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        ))}
        <button className={styles.resetBtn}>Xóa lọc</button>
      </div>
    </aside>
  );

  return (
    <>
      {/* Nút toggle chỉ hiển thị trên mobile */}
      {isMobile && (
        <button className={styles.toggleBtn} onClick={() => setIsOpen(true)}>
          🧰 Bộ lọc
        </button>
      )}

      {/* Overlay nền xám trên mobile */}
      {isMobile && isOpen && <div className={styles.overlay} onClick={() => setIsOpen(false)} />}

      {(!isMobile || isOpen) && sidebarContent}
    </>
  );
}
