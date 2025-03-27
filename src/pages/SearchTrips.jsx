import React, { useState } from "react";
import SidebarFilters from "../components/searchtrip/SidebarFilters";
import TripCard from "../components/searchtrip/TripCard";
import Header from "../components/header/Header";
import SearchBox from "../components/content/SearchBox";
import TripDetailsModal from "../components/searchtrip/TripDetailsModal"; // 👈 Thêm dòng này
import styles from "./searchtrips.module.css";

export default function SearchTrips() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={styles.pageWrapper}>
      <Header />

      {/* SearchBox chiếm ngang trên cùng */}
      <div className={styles.searchBoxWrapper}>
        <SearchBox />
      </div>

      {/* Dưới SearchBox là 2 cột: Sidebar + Kết quả */}
      <div className={styles.resultsRow}>
        <SidebarFilters />
        <main className={styles.mainContent}>
          <h1 className={styles.title}>Kết quả chiều đi: 518 chuyến</h1>

          {/* TripCard truyền hàm mở modal */}
          <TripCard onOpenDetails={() => setShowModal(true)} />
        </main>
      </div>

      {/* Modal chi tiết chuyến */}
      <TripDetailsModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
