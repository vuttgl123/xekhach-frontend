import React from "react";
import styles from "./service.module.css";
import transportBanner from "../assets/Service.jpg";
import hanoiNamDinhImg from "../assets/hanoi.jpg";
import namDinhHanoiImg from "../assets/namdinh.jpg";

const routes = [
    { id: 1, title: "📍 Hà Nội ➝ Nam Định", description: "Xe khách chạy hàng ngày từ Hà Nội đến Nam Định với lịch trình linh hoạt.", image: hanoiNamDinhImg, time: "7h30 - 22h30" },
    { id: 2, title: "📍 Nam Định ➝ Hà Nội", description: "Xe chất lượng cao từ Nam Định đến Hà Nội, khởi hành sớm.", image: namDinhHanoiImg, time: "7h - 22h15" },
];

const Service = () => {
    return (
        <div className={styles.routeContainer}>
            <header className={styles.header} style={{ backgroundImage: `url(${transportBanner})` }}>
                <h1 className={styles.title}>Dịch Vụ Vận Tải Tuyến Cố Định</h1>
                <p className={styles.subtitle}>Chúng tôi cung cấp xe khách chất lượng cao với lịch trình cố định mỗi ngày.</p>
            </header>

            <div className={styles.routeList}>
                {routes.map(route => (
                    <div key={route.id} className={styles.routeCard}>
                        <img src={route.image} alt={route.title} className={styles.routeImage} />
                        <div className={styles.routeInfo}>
                            <h2>{route.title}</h2>
                            <p>{route.description}</p>
                            <p className={styles.routeTime}>🕒 Giờ khởi hành: {route.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Service;
