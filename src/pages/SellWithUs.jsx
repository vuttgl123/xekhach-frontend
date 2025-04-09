import { FaBusAlt, FaChartLine, FaTools, FaUsers } from "react-icons/fa";
import styles from "./sellwithus.module.css";

const SellWithUs = () => {
  return (
    <div className={styles.page}>
      {/* Hero section */}
      <section className={styles.hero}>
        <div className={styles.overlay}>
          <h1>Mở bán vé cùng VuBac</h1>
          <p>Giải pháp hiện đại cho nhà xe – Đặt vé nhanh, vận hành dễ</p>
          <a href="/partner/dashboard" className={styles.heroButton}>Khám phá hệ thống quản lý</a>
        </div>
      </section>

      {/* Lợi ích */}
      <section className={styles.benefitsSection}>
        <h2>Vì sao nên hợp tác với VuBac?</h2>
        <div className={styles.benefits}>
          <div className={styles.benefit}>
            <FaChartLine className={styles.icon} />
            <h3>Tăng doanh thu</h3>
            <p>Tiếp cận hàng ngàn hành khách mỗi ngày.</p>
          </div>
          <div className={styles.benefit}>
            <FaTools className={styles.icon} />
            <h3>Vận hành thông minh</h3>
            <p>Quản lý chuyến, ghế, lịch xe trên 1 nền tảng duy nhất.</p>
          </div>
          <div className={styles.benefit}>
            <FaUsers className={styles.icon} />
            <h3>Đồng hành 24/7</h3>
            <p>Đội ngũ hỗ trợ đối tác nhiệt tình, phản hồi nhanh chóng.</p>
          </div>
          <div className={styles.benefit}>
            <FaBusAlt className={styles.icon} />
            <h3>Thương hiệu tin cậy</h3>
            <p>VuBac đã kết nối hơn 100+ hãng xe lớn tại Việt Nam.</p>
          </div>
        </div>
      </section>

      {/* CTA cuối trang */}
      <section className={styles.ctaSection}>
        <h2>Sẵn sàng đồng hành cùng VuBac?</h2>
        <p>Chỉ mất 2 phút để trở thành đối tác và bắt đầu nhận đơn hàng ngay hôm nay.</p>
        <a href="/partner/agent" className={styles.ctaButton}>Trở thành đại lý ngay</a>
      </section>
    </div>
  );
};

export default SellWithUs;
