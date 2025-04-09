import styles from "./dashboardcontent.module.css";
import UserProfile from "./UserProfile";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import LoadingOverlay from "../../components/loading/LoadingOverlay";

const DashboardContent = ({ section }) => {
    const { user } = useContext(UserContext);

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

            {section === "profile" && (
                <>
                    {user ? <UserProfile user={user} /> : <LoadingOverlay text="Đang tải hồ sơ..." />}
                </>
            )}

            {section === "membership" && <p>Thông tin thành viên.</p>}
            {section === "tickets" && <p>Vé của tôi.</p>}
            {section === "reviews" && <p>Nhận xét chuyến đi.</p>}
            {section === "offers" && <p>Ưu đãi của bạn.</p>}
            {section === "logout" && <p>Bạn đã đăng xuất thành công.</p>}
        </main>
    );
};

export default DashboardContent;
