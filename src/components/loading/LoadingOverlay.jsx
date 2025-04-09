import styles from "./loadingoverlay.module.css";

export default function LoadingOverlay({ text = "Đang xử lý..." }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.loader}></div>
      <p className={styles.text}>{text}</p>
    </div>
  );
}
