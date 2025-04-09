import styles from "./bookingguide.module.css";

const BookingGuide = () => {
  const steps = [
    {
      title: "Bước 1: Nhập thông tin chuyến đi",
      desc: "Chọn nơi xuất phát, nơi đến và ngày đi trong ô tìm kiếm.",
      image: "/guide/step1.png",
    },
    {
      title: "Bước 2: Tìm kiếm chuyến xe",
      desc: "Nhấn nút 'Tìm kiếm' để xem danh sách các chuyến xe phù hợp.",
      image: "/guide/step2.png",
    },
    {
      title: "Bước 3: Chọn chuyến và đặt vé",
      desc: "Chọn chuyến bạn muốn và nhấn 'Đặt vé'.",
      image: "/guide/step3.png",
    },
    {
      title: "Bước 4: Nhập thông tin hành khách",
      desc: "Điền thông tin cá nhân để xác nhận vé.",
      image: "/guide/step4.png",
    },
    {
      title: "Bước 5: Thanh toán & nhận vé",
      desc: "Thanh toán và nhận vé điện tử qua email hoặc tin nhắn.",
      image: "/guide/step5.png",
    },
  ];

  return (
    <div className={styles.container}>
      <h1>Hướng Dẫn Đặt Vé</h1>

      {steps.map((step, index) => (
        <div key={index} className={styles.step}>
          <h2>{step.title}</h2>
          <p>{step.desc}</p>
          <img src={step.image} alt={step.title} className={styles.image} />
        </div>
      ))}

      <p className={styles.note}>
        (*) Cam kết hoàn 150% nếu nhà xe không cung cấp dịch vụ như đã đặt.
      </p>
    </div>
  );
};

export default BookingGuide;
