import React from "react";
import styles from "./promocards.module.css";
import useAutoScroll from "./useAutoScroll";

const PromoCards = () => {
  const promoData = [
    {
      description: "Chi tiết khuyến mãi 1",
      imageUrl: "https://f1e425bd6cd9ac6.cmccloud.com.vn/cms-tool/post/images/163/img_card.png?v=193",
    },
    {
      description: "Chi tiết khuyến mãi 2",
      imageUrl: "https://f1e425bd6cd9ac6.cmccloud.com.vn/cms-tool/post/images/163/img_card.png?v=193",
    },
    {
      description: "Chi tiết khuyến mãi 3",
      imageUrl: "https://f1e425bd6cd9ac6.cmccloud.com.vn/cms-tool/post/images/339/img_card.png?v=4",
    },
    {
      description: "Chi tiết khuyến mãi 4",
      imageUrl: "https://f1e425bd6cd9ac6.cmccloud.com.vn/cms-tool/post/images/337/img_card.png?v=9",
    },
    {
      description: "Chi tiết khuyến mãi 5",
      imageUrl: "https://f1e425bd6cd9ac6.cmccloud.com.vn/cms-tool/post/images/166/img_card.png?v=5",
    },
    {
      description: "Chi tiết khuyến mãi 6",
      imageUrl: "https://f1e425bd6cd9ac6.cmccloud.com.vn/cms-tool/post/images/210/img_card.png?v=6",
    },
    {
      description: "Chi tiết khuyến mãi 7",
      imageUrl: "https://cdn.futabus.vn/futa-busline-web-cms-prod/Zalo_11b66ecb81/Zalo_11b66ecb81.png",
    },
    {
      description: "Chi tiết khuyến mãi 8",
      imageUrl: "https://cdn.futabus.vn/futa-busline-cms-dev/Banner_FUTA_Pay_2_57b0471834/Banner_FUTA_Pay_2_57b0471834.png",
    },
  ];

  // Nhân đôi dữ liệu để tạo hiệu ứng cuộn vòng lặp
  const loopedData = [...promoData, ...promoData];
  const itemsPerPage = 3;
  const totalPages = Math.ceil(loopedData.length / itemsPerPage);

  // Sử dụng hook tách riêng để xử lý hiệu ứng tự động cuộn
  const { currentPage, setCurrentPage } = useAutoScroll(totalPages);

  return (
    <div className={styles.promoCardsContainer}>
      <h1 className={styles.heading}>KHUYẾN MÃI NỔI BẬT</h1>

      <div className={styles.cardsWrapper}>
        <div
          className={styles.cardsRow}
          style={{
            transform: `translateX(-${(currentPage * 100) / itemsPerPage}%)`,
          }}
        >
          {loopedData.map((promo, index) => (
            <div key={index} className={styles.card}>
              <img className={styles.cardImage} src={promo.imageUrl} alt={promo.description} />
              <div className={styles.cardContent}>
                <p className={styles.cardDescription}>{promo.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.pageIndicatorContainer}>
        {Array.from({ length: totalPages }).map((_, index) => (
          <span
            key={index}
            className={`${styles.pageIndicator} ${index === currentPage ? styles.active : ""}`}
            onClick={() => setCurrentPage(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default PromoCards;
