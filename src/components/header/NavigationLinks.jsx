import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import styles from "./navigationlinks.module.css";

const NavigationLinks = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    return (
        <nav className={styles.navLinks}>
            <a href="#" className={styles.navItem}>Lịch sử đặt vé</a>
            <a href="/sell-on-vubac" className={styles.navItem}>Mở bán vé trên VuBac</a>
            <div 
                className={styles.partnerDropdown} 
                onMouseEnter={() => setDropdownOpen(true)} 
                onMouseLeave={() => setDropdownOpen(false)}
            >
                <a href="#" className={styles.navItem}>
                    Trở thành đối tác 
                    <FaChevronDown className={`${styles.dropdownIcon} ${isDropdownOpen ? styles.rotate : ""}`} />
                </a>

                {isDropdownOpen && (
                    <div className={styles.dropdownMenu}>
                        <a href="/partner/dashboard" className={styles.dropdownItem}>Hệ thống quản lý nhà xe</a>
                        <a href="/partner/agent" className={styles.dropdownItem}>Phần mềm đại lý</a>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default NavigationLinks;
