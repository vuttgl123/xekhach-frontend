// src/api/apiTrip.js
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5120/api";
// const BASE_URL = "http://localhost:5120/api";
export const searchTrips = async ({ origin, destination, date }) => {
  const response = await fetch(`${BASE_URL}/Trip/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      origin,
      destination,
      date,
    }),
  });

  if (!response.ok) {
    throw new Error("Không tìm thấy chuyến hoặc có lỗi xảy ra");
  }

  return response.json(); // trả về array chuyến
};
