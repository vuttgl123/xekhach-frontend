import React from "react";
import styles from "./tripcard.module.css";
import { FaClock, FaStar } from "react-icons/fa";

export default function TripCard({
    operator = "Hà Nội",
    rating = 4.7,
    reviews = 704,
    price = 100000,
    seatsLeft = 4,
    departureTime = "7:30",
    arrivalTime = "9:00",
    duration = "1h30m",
    from = "Số 456 Minh Khai, P.Vĩnh Tuy, Q.Hai Bà Trưng, TP.Hà Nội",
    to = "Số 353 Trần Hưng Đạo, P.Cửa Bắc, TP.Nam Định",
    vehicle = "Limousine 16 chỗ",
    route = "T01: Hà Nội - Nam Định",
    date = "27/03/2025",
    onOpenDetails = () => { }, // 👈 nhận callback mở modal từ cha
}) {
    return (
        <div className={styles.card}>
            <div className={styles.left}>
                <div className={styles.metaInfo}>
                    <span className={styles.route}>{route}</span>
                    <span className={styles.date}>{date}</span>
                </div>
                <div className={styles.operator}>{operator}</div>
                <div className={styles.vehicle}>{vehicle}</div>

                <div className={styles.timeline}>
                    <div className={styles.timeBlock}>
                        <div className={styles.timeItem}>
                            <FaClock />
                            <strong>{departureTime}</strong>
                        </div>
                        <div className={styles.place}>{from}</div>
                    </div>

                    <div className={styles.duration}>{duration}</div>

                    <div className={styles.timeBlock}>
                        <div className={styles.timeItem}>
                            <FaClock />
                            <strong>{arrivalTime}</strong>
                        </div>
                        <div className={styles.place}>{to}</div>
                    </div>
                </div>

                <div className={styles.price}>Chỉ {price.toLocaleString()}đ</div>
                <div className={styles.seats}>Còn {seatsLeft} chỗ trống</div>
            </div>

            <div className={styles.right}>
                <div className={styles.rating}>
                    <span className={styles.star}><FaStar /></span>
                    <span className={styles.score}>{rating}</span>
                    <span className={styles.reviews}>({reviews})</span>
                </div>
                <div className={styles.actions}>
                    <a onClick={onOpenDetails} className={styles.details}>Thông tin chi tiết</a>
                    <button className={styles.bookBtn}>Chọn chuyến</button>
                </div>
            </div>
        </div>
    );
}
