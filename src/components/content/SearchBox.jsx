import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { showSuccessAlert } from "../message/SuccessAlert";
import { showErrorAlert } from "../message/ErrorAlert";

import { FaMapMarkerAlt, FaExchangeAlt, FaSearch, FaRegCalendarAlt } from "react-icons/fa";

import styles from "./searchbox.module.css";
import CustomOption from "../option/CustomOption";
import { searchTrips } from "../api/apiTrip";
import { getDriverInfo } from "../api/apiDriver";
import LoadingOverlay from "../loading/LoadingOverlay"; // ✅ Overlay loading

const SearchBox = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const locationOptions = [
    { value: "Hà Nội", label: "Số 456 Minh Khai, P.Vĩnh Tuy, Q.Hai Bà Trưng, TP.Hà Nội" },
    { value: "Nam Định", label: "Số 353 Trần Hưng Đạo, P.Cửa Bắc, TP.Nam Định" },
  ];

  const [departure, setDeparture] = useState(null);
  const [destination, setDestination] = useState(null);
  const [departureDate, setDepartureDate] = useState(new Date());
  const [tripType, setTripType] = useState("oneway");
  const [isSwapped, setIsSwapped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isMobile = window.innerWidth <= 768;

  // Lấy dữ liệu từ URL nếu quay lại từ trang tìm chuyến
  useEffect(() => {
    const searchParams = location.state?.searchParams;
    if (searchParams) {
      setDeparture(searchParams.departure);
      setDestination(searchParams.destination);
      setDepartureDate(new Date(searchParams.departureDate));
      setTripType(searchParams.tripType || "oneway");
    }
  }, [location.state]);

  const handleSearchClick = async () => {
    if (!departure || !destination || !departureDate) {
      showErrorAlert("Vui lòng chọn đầy đủ thông tin.");
      return;
    }

    setIsLoading(true);

    try {
      const formattedDate = departureDate.toISOString();

      // Tìm kiếm chuyến đi
      const trips = await searchTrips({
        origin: departure.value,
        destination: destination.value,
        date: formattedDate,
      });

      if (!trips || trips.length === 0) {
        showErrorAlert("Không tìm thấy chuyến nào phù hợp.");
        return;
      }

      // ✅ Hiển thị thông báo thành công trước khi chuyển trang
      await showSuccessAlert("Tìm thấy các chuyến xe đang hoạt động!");

      // Lấy thông tin tài xế cho mỗi chuyến đi
      const tripsWithDriverInfo = await Promise.all(
        trips.map(async (trip) => {
          const driver = await getDriverInfo(trip.vehicleDriverId); // Lấy thông tin tài xế
          const tripWithDriver = { ...trip, driverInfo: driver }; // Lưu thông tin tài xế vào chuyến đi
          return tripWithDriver;
        })
      );

      // Chuyển đến trang tìm chuyến với dữ liệu chuyến đi và thông tin tài xế
      navigate("/search-trips", {
        state: {
          trips: tripsWithDriverInfo, // Chuyến đi đã có thông tin tài xế
          searchParams: {
            departure,
            destination,
            departureDate: formattedDate,
            tripType,
          },
        },
      });
    } catch (error) {
      showErrorAlert("Đã xảy ra lỗi khi tìm kiếm. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };


  const swapLocations = () => {
    setDeparture(destination);
    setDestination(departure);
    setIsSwapped(!isSwapped);
  };

  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      border: "none",
      boxShadow: "none",
      backgroundColor: "transparent",
      padding: 0,
      height: "29px",
      minHeight: "unset",
    }),
    indicatorSeparator: () => ({ display: "none" }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: 0,
      color: "#666",
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: 0,
    }),
    input: (provided) => ({
      ...provided,
      margin: 0,
      padding: 0,
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
      width: isMobile ? "100%" : "max-content",
      minWidth: isMobile ? "100%" : "250px",
      maxWidth: isMobile ? "100%" : "350px",
      transform: "translateX(-40px)",
      zIndex: 10,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#f1f8ff" : "white",
      color: "#333",
      padding: "8px 12px",
      fontSize: "16px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      cursor: "pointer",
    }),
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchBox} style={{ position: "relative" }}>
        {/* ✅ Loading overlay */}
        {isLoading && <LoadingOverlay text="Đang tìm chuyến xe..." />}

        <div className={styles.tripOptions}>
          <div className={styles.tripSelection}>
            <label>
              <input
                type="radio"
                name="trip"
                value="oneway"
                checked={tripType === "oneway"}
                onChange={() => setTripType("oneway")}
                disabled={isLoading}
              />
              Một chiều
            </label>

            <label>
              <input
                type="radio"
                name="trip"
                value="roundtrip"
                checked={tripType === "roundtrip"}
                onChange={() => setTripType("roundtrip")}
                disabled={isLoading}
              />
              Khứ hồi
            </label>
          </div>
          <a href="/booking-guide" className={styles.guideLink}>
            Hướng dẫn đặt vé
          </a>
        </div>

        <div className={styles.inputGroupWide}>
          {/* Nơi xuất phát */}
          <div className={styles.inputField}>
            <FaMapMarkerAlt className={styles.iconBlue} />
            <Select
              options={locationOptions}
              value={departure}
              onChange={setDeparture}
              placeholder="Nơi xuất phát"
              styles={customSelectStyles}
              className={styles.selectBox}
              components={{ Option: CustomOption }}
              isDisabled={isLoading}
            />
          </div>

          {/* Nút hoán đổi */}
          <button onClick={swapLocations} className={styles.swapBtn} disabled={isLoading}>
            <FaExchangeAlt
              className={`${styles.iconSwap} ${isSwapped ? styles.rotate : ""}`}
            />
          </button>

          {/* Nơi đến */}
          <div className={styles.inputField}>
            <FaMapMarkerAlt className={styles.iconRed} />
            <Select
              options={locationOptions}
              value={destination}
              onChange={setDestination}
              placeholder="Nơi đến"
              styles={customSelectStyles}
              className={styles.selectBox}
              components={{ Option: CustomOption }}
              isDisabled={isLoading}
            />
          </div>

          {/* Ngày đi */}
          <div className={styles.inputField}>
            <FaRegCalendarAlt className={styles.iconBlue} />
            <DatePicker
              selected={departureDate}
              onChange={(date) => setDepartureDate(date)}
              className={styles.datePicker}
              dateFormat="EEE, dd/MM/yyyy"
              minDate={new Date()}
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Nút tìm kiếm */}
        <button
          className={styles.searchBtn}
          onClick={handleSearchClick}
          disabled={isLoading}
        >
          {isLoading ? "Đang tìm..." : (
            <>
              <FaSearch /> Tìm kiếm
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default SearchBox;
