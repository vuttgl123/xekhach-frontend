import styles from "./contact.module.css";
import { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { validateForm } from "./useValidation";
import { showSuccessAlert } from "../components/message/SuccessAlert";
import { showErrorAlert } from "../components/message/ErrorAlert";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showErrorAlert("Vui lòng điền đầy đủ thông tin.");
    } else {
      showSuccessAlert("Chúng tôi sẽ liên hệ với bạn sớm nhất.");
      setFormData({ name: "", email: "", message: "" });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Liên Hệ Chúng Tôi</h2>
        <p className={styles.description}>
          Nếu bạn có bất kỳ câu hỏi nào, đừng ngần ngại liên hệ với chúng tôi.
        </p>
      </div>

      <div className={styles.contactWrapper}>
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Gửi Tin Nhắn</h3>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label>Họ và Tên</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                placeholder="Nhập họ và tên"
                onChange={handleChange}
              />
              {errors.name && <span className={styles.error}>{errors.name}</span>}
            </div>

            <div className={styles.inputGroup}>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                placeholder="Nhập email"
                onChange={handleChange}
              />
              {errors.email && <span className={styles.error}>{errors.email}</span>}
            </div>

            <div className={styles.inputGroup}>
              <label>Nội dung</label>
              <textarea
                name="message"
                value={formData.message}
                placeholder="Nhập nội dung cần liên hệ"
                onChange={handleChange}
              />
              {errors.message && <span className={styles.error}>{errors.message}</span>}
            </div>

            <button type="submit" className={styles.submitButton}>Gửi</button>
          </form>
        </div>

        <div className={styles.infoSection}>
          <h3 className={styles.sectionTitle}>Thông Tin Liên Hệ</h3>
          <p><FaPhone className={styles.icon} /> 0833.190.783</p>
          <p><FaEnvelope className={styles.icon} /> phamtuanvu1401@gmail.com</p>
          <p><FaMapMarkerAlt className={styles.icon} /> Số 218 Đường Lĩnh Nam,Q.Hoàng Mai,TP.Hà Nội</p>
        </div>
      </div>
    </div>
  );
}
