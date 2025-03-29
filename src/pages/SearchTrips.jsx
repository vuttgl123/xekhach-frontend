import React, { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/header/Header";
import SearchBox from "../components/content/SearchBox";
import SidebarFilters from "../components/searchtrip/SidebarFilters";
import SearchResults from "../components/searchtrip/SearchResults";
import styles from "./searchtrips.module.css";

export default function SearchTrips() {
  const location = useLocation();
  const originalTrips = location.state?.trips || [];
  const tripType = location.state?.searchParams?.tripType || "oneway";

  const departureDateStr = location.state?.searchParams?.departureDate;
  const departureDate = departureDateStr ? new Date(departureDateStr) : null;

  const now = new Date();

  const [filters, setFilters] = useState({
    sort: "Mặc định",
    timeRanges: [],
  });

  const filteredTrips = useMemo(() => {
    let trips = [...originalTrips];

    // ✅ Nếu là ngày hôm nay → chỉ giữ chuyến chưa khởi hành
    if (departureDate && departureDate.toDateString() === now.toDateString()) {
      trips = trips.filter((trip) => {
        const timeStr = trip.routeTrip?.startTime || trip.departureTime || "00:00";
        const [h, m] = timeStr.split(":").map(Number);
        const tripTime = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          h,
          m,
          0
        );
        return tripTime > now;
      });
    }

    // --- Lọc theo khung giờ ---
    if (filters.timeRanges.length > 0) {
      const matchTimeRange = (timeStr) => {
        const [h] = timeStr.split(":").map(Number);
        if (h < 12) return "Sáng sớm";
        if (h < 18) return "Buổi trưa";
        return "Buổi tối";
      };

      trips = trips.filter((trip) => {
        const time = trip.routeTrip?.startTime || trip.departureTime || "00:00";
        return filters.timeRanges.includes(matchTimeRange(time));
      });
    }

    // --- Sắp xếp ---
    if (filters.sort === "Giờ đi sớm nhất") {
      trips.sort((a, b) =>
        (a.routeTrip?.startTime || a.departureTime).localeCompare(
          b.routeTrip?.startTime || b.departureTime
        )
      );
    } else if (filters.sort === "Giờ đi muộn nhất") {
      trips.sort((a, b) =>
        (b.routeTrip?.startTime || b.departureTime).localeCompare(
          a.routeTrip?.startTime || a.departureTime
        )
      );
    }

    return trips;
  }, [originalTrips, filters, departureDate]);

  return (
    <div className={styles.pageWrapper}>
      <Header />
      <div className={styles.searchBoxWrapper}>
        <SearchBox />
      </div>

      <div className={styles.resultsRow}>
        <SidebarFilters
          filters={filters}
          onFilterChange={setFilters}
          tripType={tripType}
        />
        <main className={styles.mainContent}>
          <SearchResults trips={filteredTrips} tripType={tripType} />
        </main>
      </div>
    </div>
  );
}
