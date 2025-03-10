import styles from "./aboutus.module.css";
import { FaTruckMoving, FaUsers } from "react-icons/fa";
import TeamMember from "../components/member/TeamMember";
import aboutUsImage from "../assets/hanoi.jpg";

const teamMembers = [
  {
    name: "Phạm Tuấn Vũ",
    role: "Sáng lập viên",
    class: "Lớp DHTI15A16HN",
    image: "../assets/founder1.jpg",
  },
  {
    name: "Nguyễn Tự Bắc",
    role: "Sáng lập viên",
    class: "Lớp DHTI15A14HN",
    image: "../assets/founder2.jpg",
  },
];

export default function AboutUs() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Về Chúng Tôi</h2>
        <p className={styles.description}>
          Chào mừng bạn đến với <span className={styles.highlight}>Dịch Vụ Vận Chuyển</span>, được sáng lập bởi các sinh viên trường <br />
          <span className={styles.university}>Đại học Kinh tế Kỹ thuật Công nghiệp.</span>
        </p>
      </div>

      <div className={styles.content}>
        <img src={aboutUsImage} alt="Về Chúng Tôi" className={styles.aboutImage} />
        <div className={styles.text}>
          <h3 className={styles.sectionTitle}>
            <FaTruckMoving className={styles.icon} /> Dịch vụ vận chuyển chuyên nghiệp
          </h3>
          <p className={styles.paragraph}>
            Với sứ mệnh mang đến trải nghiệm vận chuyển nhanh chóng, tiện lợi và an toàn, 
            chúng tôi luôn không ngừng cải tiến để đáp ứng nhu cầu ngày càng cao của khách hàng.
          </p>
        </div>
      </div>

      <div className={styles.teamSection}>
        <h3 className={styles.sectionTitle}>
          <FaUsers className={styles.icon} /> Đội Ngũ Sáng Lập
        </h3>
        <div className={styles.teamGrid}>
          {teamMembers.map((member, index) => (
            <TeamMember key={index} member={member} />
          ))}
        </div>
      </div>
    </div>
  );
}
