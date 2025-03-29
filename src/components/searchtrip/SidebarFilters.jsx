import React, { useState, useEffect } from "react";
import styles from "./sidebarfilters.module.css";

export default function SidebarFilters({ filters, onFilterChange, tripType = "oneway" }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [selectedSort, setSelectedSort] = useState(filters?.sort || "Mặc định");
  const [timeRanges, setTimeRanges] = useState(filters?.timeRanges || []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    onFilterChange?.({
      sort: selectedSort,
      timeRanges,
    });
  }, [selectedSort, timeRanges]);

  const handleTimeRangeChange = (value) => {
    setTimeRanges((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const resetFilters = () => {
    setSelectedSort("Mặc định");
    setTimeRanges([]);
  };

  const sidebarContent = (
    <aside className={`${styles.sidebar} ${isMobile && isOpen ? styles.open : ""}`}>
      {isMobile && (
        <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>✖</button>
      )}

      <div className={styles.section}>
        <h2 className={styles.title}>Sắp xếp</h2>
        <div className={styles.radioGroup}>
          {["Mặc định", "Giờ đi sớm nhất", "Giờ đi muộn nhất", "Xe ít người nhất", "Đánh giá cao nhất"].map((label) => (
            <label key={label} className={styles.option}>
              <input
                type="radio"
                name="sort"
                checked={selectedSort === label}
                onChange={() => setSelectedSort(label)}
              />
              {label}
            </label>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.title}>Lọc</h2>

        <div className={styles.subSection}>
          <h3 className={styles.subtitle}>Giờ đi</h3>
          <div className={styles.checkboxGroup}>
            {["Sáng sớm", "Buổi trưa", "Buổi tối"].map((label) => (
              <label key={label} className={styles.option}>
                <input
                  type="checkbox"
                  checked={timeRanges.includes(label)}
                  onChange={() => handleTimeRangeChange(label)}
                />
                {label}
              </label>
            ))}
          </div>
        </div>

        <button className={styles.resetBtn} onClick={resetFilters}>Xoá lọc</button>
      </div>
    </aside>
  );

  return (
    <>
      {isMobile && (
        <button className={styles.toggleBtn} onClick={() => setIsOpen(true)}>🧰 Bộ lọc</button>
      )}
      {isMobile && isOpen && <div className={styles.overlay} onClick={() => setIsOpen(false)} />}
      {(!isMobile || isOpen) && sidebarContent}
    </>
  );
}
