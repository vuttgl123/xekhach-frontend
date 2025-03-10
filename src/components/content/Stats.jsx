import React from 'react';
import { FaUsers, FaBus, FaMapMarkerAlt } from 'react-icons/fa';
import styles from './stats.module.css';
import logoImage from "../../assets/Stats.png";

const Stats = () => {
  const statsData = [
    {
      icon: <FaUsers className={styles.icon} />,
      title1: "Hơn 200k",
      title2: "Lượt khách",
      description: "VuBac phục vụ hơn 200k lượt khách bình quân 1 năm"
    },
    {
      icon: <FaMapMarkerAlt className={styles.icon} />,
      title1: "Bán vé tại",
      title2: "Nam Định & Hà Nội",
      description: "VuBac có 2 điểm bán vé chính tại bến xe Nam Định và bến xe Hà Nội."
    },
    {
      icon: <FaBus className={styles.icon} />,
      title1: "35 chuyến",
      title2: "Mỗi ngày",
      description: "VuBac vận hành 35 chuyến xe mỗi ngày, phục vụ tuyến Nam Định - Hà Nội."
    }
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.hd1}>VuBac SERVICE - CHẤT LƯỢNG LÀ DANH DỰ</h2>
      <h4 className={styles.hd2}>Được khách hàng tin tưởng và lựa chọn</h4>

      {/* Thẻ div để căn giữa */}
      <div className={styles.centerWrapper}>
        <div className={styles.statsWrapper}>
          {statsData.map((item, index) => (
            <div key={index} className={styles.statCard}>
              <div className={styles.iconWrapper}>{item.icon}</div>
              <div className={styles.textWrapper}>
                <div className={styles.titles}>
                  <h3 className={styles.title1}>{item.title1}</h3>
                  <h4 className={styles.title2}>{item.title2}</h4>
                </div>
                <p className={styles.description}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className={styles.imageWrapper}>
          <img src={logoImage} alt="Illustration" className={styles.image} />
        </div>
      </div>
    </div>
  );
};

export default Stats;
