import styles from "./modal.module.css";

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                {children} 
                <button className={styles.closeButton} onClick={onClose}>✖</button>
            </div>
        </div>
    );
};

export default Modal;
