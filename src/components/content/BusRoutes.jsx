import React from 'react';
import styles from './busroutes.module.css';  // Bạn có thể thay đổi tên tệp css cho phù hợp
import hanoiNamDinhImg from "../../assets/hanoi.jpg";
import namDinhHanoiImg from "../../assets/namdinh.jpg";

const BusRoutes = () => {
  const busRoutes = [
    {
      route: "Tuyến từ Nam Định về Hà Nội",
      distance: "83 km",
      time: "1 giờ 35 phút",
      price: "100.000đ",
      date: "01/03/2025",
      imageUrl: hanoiNamDinhImg,
    },
    {
      route: "Tuyến từ Hà Nội về Nam Định",
      distance: "83 km",
      time: "1 giờ 35 phút",
      price: "100.000đ",
      date: "01/03/2025",
      imageUrl: namDinhHanoiImg,
    },
  ];

  return (
    <div className={styles.busRoutesContainer}>
      <h1 className={styles.heading}>TUYẾN XE CỐ ĐỊNH</h1>
      <div className={styles.routesWrapper}>
        {busRoutes.map((route, index) => (
          <div key={index} className={styles.routeCard}>
            <img src={route.imageUrl} alt={route.route} className={styles.routeImage} />
            <div className={styles.routeContent}>
              <h2 className={styles.routeTitle}>{route.route}</h2>
              <p className={styles.routeDetails}>Khoảng cách: {route.distance}</p>
              <p className={styles.routeDetails}>Thời gian: {route.time}</p>
              <p className={styles.routeDetails}><strong>Giá vé: {route.price}</strong></p>
              <p className={styles.routeDetails}>Ngày khởi hành: {route.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusRoutes;
