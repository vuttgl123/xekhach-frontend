import styles from './footer.module.css';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Company Info */}
        <div>
          <h2 className={styles.title}>Dịch Vụ Vận Chuyển</h2>
          <p className={styles.text}>Chúng tôi cung cấp dịch vụ vận chuyển nhanh chóng, an toàn và tiện lợi.</p>
        </div>
        
        {/* Quick Links */}
        <div>
          <h3 className={styles.subtitle}>Liên kết nhanh</h3>
          <ul className={styles.list}>
            <li><a href="/home" className={styles.link}>Trang chủ</a></li>
            <li><a href="/service" className={styles.link}>Dịch vụ</a></li>
            <li><a href="/aboutus" className={styles.link}>Về chúng tôi</a></li>
            <li><a href="/contact" className={styles.link}>Liên hệ</a></li>
          </ul>
        </div>
        
        {/* Contact Info */}
        <div>
          <h3 className={styles.subtitle}>Liên hệ</h3>
          <p className={styles.text}>Email: phamtuanvu1401@gmail.com</p>
          <p className={styles.text}>Hotline: 0833190783</p>
        </div>
        
        {/* Social Media */}
        <div>
          <h3 className={styles.subtitle}>Kết nối với chúng tôi</h3>
          <div className={styles.socialIcons}>
            <a href="https://www.facebook.com/vu.phamtuan.3150" className={styles.icon}><FaFacebook /></a>
            <a href="#" className={styles.icon}><FaTwitter /></a>
            <a href="https://www.instagram.com/vu.phamtuan.3150/" className={styles.icon}><FaInstagram /></a>
            <a href="https://www.linkedin.com/in/v%C5%A9-ph%E1%BA%A1m-tu%E1%BA%A5n-097670346/" className={styles.icon}><FaLinkedin /></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className={styles.copyright}>
        <p>&copy; 2025 Dịch Vụ Vận Chuyển. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
