const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5120/api/users";
console.log("🔗 API BASE URL:", import.meta.env.VITE_API_BASE_URL);

export const login = async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
    });

    if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.message || "Đăng nhập thất bại!");
    }

    return response.json();
};

export const fetchUserProfile = async () => {
    const response = await fetch(`${API_BASE_URL}/me`, {
        method: "GET",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Không thể lấy thông tin người dùng.");
    }

    return response.json();
};

export const logout = async () => {
    try {
        await fetch(`${API_BASE_URL}/logout`, {
            method: "POST",
            credentials: "include",
        });
    } catch (error) {
        console.error("Lỗi khi đăng xuất:", error);
    }
};
