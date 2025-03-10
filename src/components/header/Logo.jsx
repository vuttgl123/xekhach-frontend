import styles from "./logo.module.css";
import logoImage from "../../assets/logo_luanan.png"; // Thay ảnh logo

const Logo = () => {
    return (
        <div className={styles.logoContainer}>
            <a href="/" className={styles.logoLink}>
                <img src={logoImage} alt="Logo" className={styles.logoImg} />
            </a>
            <p className={styles.commitmentText}>
                <span>Cam kết hoàn 150% nếu nhà xe</span><br/>
                <span>không cung cấp dịch vụ vận chuyển (*)</span>
            </p>
        </div>
    );
};

export default Logo;
