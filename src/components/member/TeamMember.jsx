import styles from "./teammember.module.css";

export default function TeamMember({ member }) {
  return (
    <div className={styles.card}>
      <img src={member.image} alt={member.name} className={styles.image} />
      <h4 className={styles.name}>{member.name}</h4>
      <p className={styles.role}>{member.role}</p>
      <p className={styles.class}>{member.class}</p>
    </div>
  );
}
