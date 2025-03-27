import React, { useEffect, useState } from "react";
import styles from "./tripmodal.module.css";

export default function TripModal({ isOpen, onClose, children }) {
  const [visible, setVisible] = useState(false);

  // Hiển thị modal khi isOpen === true
  useEffect(() => {
    if (isOpen) setVisible(true);
  }, [isOpen]);

  const handleClose = () => {
    // Kích hoạt animation đóng
    setVisible(false);
    setTimeout(onClose, 300); // Delay khớp với animation
  };

  if (!isOpen && !visible) return null;

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div
        className={`${styles.modal} ${!isOpen ? styles.exit : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeBtn} onClick={handleClose}>✖</button>
        {children}
      </div>
    </div>
  );
}
