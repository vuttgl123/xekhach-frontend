import React, { useState } from "react";
import TripCard from "./TripCard";
import TripDetailsModal from "./TripDetailsModal";
import styles from "./searchresults.module.css";

const SearchResults = ({ trips, tripType }) => {
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const calculateDuration = (start, end) => {
    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);
    let minutes = (eh * 60 + em) - (sh * 60 + sm);
    if (minutes < 0) minutes += 24 * 60;
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h${m > 0 ? m + "m" : ""}`;
  };

  return (
    <div className={styles.resultsPage}>
      <h2 className={styles.heading}>Kết quả có: {trips.length} chuyến</h2>

      <div className={styles.resultScrollArea}>
        <div className={styles.resultList}>
          {trips.map((trip) => {
            const route = trip.routeTrip || {};
            const departureTime = route.startTime || trip.departureTime || "??:??";
            const arrivalTime = route.endTime || "??:??";
            const duration = calculateDuration(departureTime, arrivalTime);
            const operator = route.origin || "Nhà xe";
            const from = "Số 456 Minh Khai, P.Vĩnh Tuy, Q.Hai Bà Trưng, TP.Hà Nội";
            const to = "Số 353 Trần Hưng Đạo, P.Cửa Bắc, TP.Nam Định";
            const routeLabel = `${route.code}: ${route.origin} - ${route.destination}`;
            const date = new Date(trip.departureDate).toLocaleDateString("vi-VN");
            const price = 100000;
            const rating = 4.7;
            const reviews = 704;

            return (
              <TripCard
                key={trip.id}
                operator={operator}
                route={routeLabel}
                date={date}
                departureTime={departureTime}
                arrivalTime={arrivalTime}
                duration={duration}
                from={from}
                to={to}
                price={price}
                seatsLeft={trip.availableSeats}
                rating={rating}
                reviews={reviews}
                isround={tripType === "roundtrip" ? "Khứ hồi" : "Một chiều"}
                vehicleDriverId={trip.vehicleDriverId} // Thêm vehicleDriverId vào TripCard
                onOpenDetails={() => {
                  setSelectedTrip(trip); // Lưu chuyến đi được chọn vào state
                  setShowModal(true); // Mở modal
                }}
              />
            );
          })}
        </div>
      </div>

      {selectedTrip && (
        <TripDetailsModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          trip={selectedTrip} // Truyền chuyến đi đã chọn vào modal
        />
      )}
    </div>
  );
};

export default SearchResults;
