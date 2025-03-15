import styles from "./dashboardcontent.module.css";
import UserProfile from "./UserProfile";

const DashboardContent = ({ section }) => {
    return (
        <main className={styles.content}>
            {section === "dashboard" && (
                <div className={styles.cards}>
                    <div className={styles.card}>
                        <h3>120</h3>
                        <p>New Orders</p>
                    </div>
                    <div className={styles.card}>
                        <h3>52</h3>
                        <p>Comments</p>
                    </div>
                    <div className={styles.card}>
                        <h3>24</h3>
                        <p>New Users</p>
                    </div>
                    <div className={styles.card}>
                        <h3>25.2k</h3>
                        <p>Page Views</p>
                    </div>
                </div>
            )}

            {section === "profile" && <UserProfile />}
            {section === "membership" && <p>Thông tin thành viên.</p>}
            {section === "cards" && <p>Quản lý thẻ thanh toán.</p>}
            {section === "reviews" && <p>Nhận xét chuyến đi.</p>}
            {section === "offers" && <p>Ưu đãi của bạn.</p>}
            {section === "logout" && <p>Bạn đã đăng xuất thành công.</p>}
        </main>
    );
};

export default DashboardContent;
