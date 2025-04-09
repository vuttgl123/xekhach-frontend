const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5120/api";

export const getDriverInfo = async (vehicleDriverId) => {
  const response = await fetch(`${BASE_URL}/driver/fromVehicleDriver/${vehicleDriverId}`, {
    method: "GET",
    headers: {
      "Accept": "application/json", // Cập nhật theo yêu cầu của API
    },
  });

  if (!response.ok) {
    throw new Error("Không thể lấy thông tin tài xế");
  }

  return response.json(); // Trả về thông tin tài xế dưới dạng JSON
};
