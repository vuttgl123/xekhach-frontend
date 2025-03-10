const API_BASE_URL = "https://localhost:7011/api/users"; // 🔥 Đảm bảo URL backend đúng

export const login = async (email, password) => {
    // console.log("📡 Gửi request đến:", `${API_BASE_URL}/login`);

    const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include", // 🔥 Bắt buộc để gửi Cookie
    });

    // console.log("🔄 Response status:", response.status);
    const responseData = await response.json();
    // console.log("📄 API Response:", responseData);

    if (!response.ok) {
        throw new Error(responseData.message || "Đăng nhập thất bại!");
    }

    return responseData;
};

export const fetchUserProfile = async () => {
    const response = await fetch("https://localhost:7011/api/users/me", {
        method: "GET",
        credentials: "include", // 🔥 Bắt buộc để gửi Cookie JWT
    });
    if (!response.ok) {
        throw new Error("Không thể lấy thông tin người dùng.");
    }

    return await response.json();
};

// src/api/authApi.js
export const logout = async () => {
    try {
        // Gửi request đăng xuất đến backend để xoá cookie
        await fetch("https://localhost:7011/api/users/logout", {
            method: "POST",
            credentials: "include", // Quan trọng: Cho phép gửi cookie kèm request
        });
    } catch (error) {
        console.error("Lỗi khi đăng xuất:", error);
    }
};


