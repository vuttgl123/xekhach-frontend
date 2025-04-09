// src/components/Policy.jsx
import React from "react";
import styles from "./policy.module.css";  // Chắc chắn rằng bạn đã có CSS cho phần này

const policyData = {
  refundPolicy: "Chính sách hoàn vé: Vé không được hoàn lại sau 24 giờ kể từ thời gian khởi hành.",
  exchangePolicy: "Chính sách đổi trả: Vé có thể được đổi trong vòng 7 ngày, với điều kiện không có sự thay đổi lịch trình.",
  otherPolicies: "Chính sách khác: Các điều khoản và quy định có thể thay đổi theo từng thời kỳ. Vui lòng tham khảo lại trước khi sử dụng dịch vụ."
};

const Policy = () => {
  return (
    <div className={styles.policy}>
      <div className={styles.policySection}>
        <h4>Chính sách hoàn vé</h4>
        <p>{policyData.refundPolicy}</p>
      </div>
      <div className={styles.policySection}>
        <h4>Chính sách đổi trả</h4>
        <p>{policyData.exchangePolicy}</p>
      </div>
      <div className={styles.policySection}>
        <h4>Chính sách khác</h4>
        <p>{policyData.otherPolicies}</p>
      </div>
    </div>
  );
};

export default Policy;
