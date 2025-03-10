import SearchBox from "./SearchBox";
import PromoCards from "./PromoCards";
import BusRoutes from "./BusRoutes";
import Stats from "./Stats";
// import OtherSection from "./OtherSection"; // Thêm các phần khác nếu có
import styles from "./content.module.css"; // Nếu bạn muốn style riêng cho content

const Content = () => {
    return (
        <div className={styles.contentContainer}>
            <SearchBox />
            <PromoCards />
            <BusRoutes />
            <Stats />
        </div>
    );
};

export default Content;
