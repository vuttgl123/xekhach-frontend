import React, { useState, useEffect } from "react";
import { getActivePromotions } from "../api/apiPromotion";
import styles from './promotionlist.module.css';

const PromotionList = () => {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const activePromotions = await getActivePromotions();
        setPromotions(activePromotions);
      } catch (err) {
        setError("Có lỗi xảy ra khi tải khuyến mãi.");
      } finally {
        setLoading(false);
      }
    };

    fetchPromotions();
  }, []);

  if (loading) return <p>Đang tải khuyến mãi...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.promotionList}>
      <h2 className={styles.heading}>Khuyến Mãi Đang Còn Hiệu Lực</h2>
      <div className={styles.promotionContainer}>
        {promotions.length === 0 ? (
          <div className={styles.promotionCard}>Không có khuyến mãi hiện tại.</div>
        ) : (
          promotions.map((promo) => (
            <div key={promo.id} className={styles.promotionCard}>
              <h3 className={styles.promotionTitle}>{promo.code}</h3>
              <p className={styles.promotionDescription}>{promo.description}</p>
              <div className={styles.discountInfo}>
                <p className={styles.discount}>Giảm giá: {promo.discount}%</p>
                {promo.minRideAmount && <span className={styles.minAmount}>Áp dụng cho chuyến từ {promo.minRideAmount}đ</span>}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PromotionList;
