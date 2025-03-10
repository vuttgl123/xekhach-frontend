import React, { useState } from "react";
import { FaExchangeAlt, FaSearch, FaMapMarkerAlt, FaRegCalendarAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./searchbox.module.css";

const SearchBox = () => {
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState(new Date());
  
  return (
    <div className={styles.container}> {/* Container với màu nền */}
      <div className={styles.searchBox}>
        <div className={styles.tripOptions}>
          <div className={styles.tripSelection}>
            <label>
              <input type="radio" name="trip" defaultChecked /> Một chiều
            </label>
            <label>
              <input type="radio" name="trip" /> Khứ hồi
            </label>
          </div>
          <a href="#" className={styles.guideLink}>Hướng dẫn đặt vé</a>
        </div>
        
        <div className={styles.inputGroupWide}>
          <div className={styles.inputField}>
            <FaMapMarkerAlt className={styles.iconBlue} />
            <input
              type="text"
              placeholder="Nơi xuất phát"
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
              className={styles.largeInput}
            />
          </div>
          <FaExchangeAlt className={styles.iconSwap} />
          <div className={styles.inputField}>
            <FaMapMarkerAlt className={styles.iconRed} />
            <input
              type="text"
              placeholder="Nơi đến"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className={styles.largeInput}
            />
          </div>
          <div className={styles.inputField}>
            <FaRegCalendarAlt className={styles.iconBlue} />
            <DatePicker
              selected={departureDate}
              onChange={(date) => setDepartureDate(date)}
              className={styles.datePicker}
              dateFormat="EEE, dd/MM/yyyy"
            />
          </div>
        </div>
        
        <button className={styles.searchBtn}>
          <FaSearch /> Tìm kiếm
        </button>
      </div>
    </div>
  );
};

export default SearchBox;
