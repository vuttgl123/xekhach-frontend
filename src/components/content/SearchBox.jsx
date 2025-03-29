import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Select from "react-select";
import { FaMapMarkerAlt, FaExchangeAlt, FaSearch, FaRegCalendarAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./searchbox.module.css";
import CustomOption from "../option/CustomOption";
import { searchTrips } from "../api/apiTrip";

const SearchBox = () => {
  const locationOptions = [
    { value: "Hà Nội", label: "Hà Nội" },
    { value: "Nam Định", label: "Nam Định" },
  ];

  const [departure, setDeparture] = useState(null);
  const [destination, setDestination] = useState(null);
  const [departureDate, setDepartureDate] = useState(new Date());
  const [isSwapped, setIsSwapped] = useState(false);
  const isMobile = window.innerWidth <= 768;
  const navigate = useNavigate();

  const handleSearchClick = async () => {
    if (!departure || !destination || !departureDate) {
      alert("Vui lòng chọn đầy đủ thông tin.");
      return;
    }

    try {
      const formattedDate = departureDate.toISOString();
      const trips = await searchTrips({
        origin: departure.value,
        destination: destination.value,
        date: formattedDate,
      });

      navigate("/search-trips", {
        state: {
          trips,
          searchParams: {
            departure,
            destination,
            departureDate: formattedDate,
            tripType,
          },
        },
      });
    } catch (error) {
      alert("Không tìm thấy chuyến hoặc lỗi xảy ra.");
    }
  };
  const [tripType, setTripType] = useState("oneway");
  const location = useLocation();
  const searchParams = location.state?.searchParams;

  useEffect(() => {
    if (searchParams) {
      setDeparture(searchParams.departure);
      setDestination(searchParams.destination);
      setDepartureDate(new Date(searchParams.departureDate));
      setTripType(searchParams.tripType || "oneway");
    }
  }, []);

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
      <div className={styles.searchBox}>
        <div className={styles.tripOptions}>
          <div className={styles.tripSelection}>
            <label>
              <input
                type="radio"
                name="trip"
                value="oneway"
                checked={tripType === "oneway"}
                onChange={() => setTripType("oneway")}
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
              />
              Khứ hồi
            </label>

          </div>
          <a href="#" className={styles.guideLink}>
            Hướng dẫn đặt vé
          </a>
        </div>

        <div className={styles.inputGroupWide}>
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
            />
          </div>

          <button onClick={swapLocations} className={styles.swapBtn}>
            <FaExchangeAlt
              className={`${styles.iconSwap} ${isSwapped ? styles.rotate : ""}`}
            />
          </button>

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
            />
          </div>

          <div className={styles.inputField}>
            <FaRegCalendarAlt className={styles.iconBlue} />
            <DatePicker
              selected={departureDate}
              onChange={(date) => setDepartureDate(date)}
              className={styles.datePicker}
              dateFormat="EEE, dd/MM/yyyy"
              minDate={new Date()}
            />
          </div>
        </div>

        <button className={styles.searchBtn} onClick={handleSearchClick}>
          <FaSearch /> Tìm kiếm
        </button>
      </div>
    </div>
  );
};

export default SearchBox;
