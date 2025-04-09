const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5120/api";

export const getActivePromotions = async () => {
  const response = await fetch(`${BASE_URL}/promotions/active`, {
    method: "GET",
    headers: {
      "Accept": "application/json", // Đảm bảo rằng header phù hợp với yêu cầu của API
    },
  });

  if (!response.ok) {
    throw new Error("Không thể lấy thông tin khuyến mãi");
  }

  return response.json(); // Trả về danh sách khuyến mãi dưới dạng JSON
};
