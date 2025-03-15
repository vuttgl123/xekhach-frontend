import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/header/Header"; // Import Header
import Sidebar from "./Sidebar"; // Thanh sidebar riêng
import DashboardContent from "./DashboardContent"; // Nội dung thay đổi theo section
import styles from "./userdashboard.module.css";

const UserDashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const [activeSection, setActiveSection] = useState(params.get("section") || "dashboard");

    // Xử lý chuyển trang khi click vào sidebar
    const handleNavigation = (sectionName) => {
        setActiveSection(sectionName);
        navigate(`/user-dashboard?section=${sectionName}`);
    };

    return (
        <div className={styles.dashboardWrapper}>
            {/* Thêm Header */}
            <Header />

            <div className={styles.dashboardContent}>
                <Sidebar activeSection={activeSection} handleNavigation={handleNavigation} />
                <DashboardContent section={activeSection} />
            </div>
        </div>
    );
};

export default UserDashboard;
