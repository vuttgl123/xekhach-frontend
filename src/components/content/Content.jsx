import { useState } from "react";
import SearchBox from "./SearchBox";
import PromoCards from "./PromoCards";
import BusRoutes from "./BusRoutes";
import Stats from "./Stats";
import LoadingOverlay from "../loading/LoadingOverlay"; // ✅ Import overlay
import styles from "./content.module.css";

const Content = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (value) => {
    setIsLoading(true);
    setSearchTerm(value);

    // 👇 Giả lập delay gọi API
    setTimeout(() => {
      setIsLoading(false);
    }, 1500); // bạn có thể thay bằng await fetch ở đây
  };

  return (
    <div className={styles.contentContainer} style={{ position: "relative" }}>
      {isLoading && <LoadingOverlay text="Đang tìm kiếm tuyến xe..." />}

      <SearchBox onSearch={handleSearch} isLoading={isLoading} />
      <PromoCards />
      <BusRoutes filter={searchTerm} isLoading={isLoading} />
      <Stats />
    </div>
  );
};

export default Content;
