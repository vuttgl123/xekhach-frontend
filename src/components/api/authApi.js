const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5120/api/users";

const DEFAULT_HEADERS = {
    "Content-Type": "application/json",
};

const handleResponse = async (response) => {
    if (!response.ok) {
        let errorMessage = "Lỗi không xác định!";
        try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
        } catch (err) {
            console.error("Không thể phân tích phản hồi lỗi từ API:", err);
        }
        throw new Error(errorMessage);
    }
    return response.json();
};

export const login = async (email, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: "POST",
            headers: DEFAULT_HEADERS,
            body: JSON.stringify({ email, password }),
            credentials: "include",
        });
        return await handleResponse(response);
    } catch (error) {
        console.error("Lỗi khi đăng nhập:", error);
        throw error;
    }
};

export const fetchUserProfile = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/me`, {
            method: "GET",
            credentials: "include",
        });

        if (!response.ok) {
            if (response.status === 401) {
                console.log("🚨 Không có token, user đã đăng xuất.");
                return null; // ✅ Trả về null nếu không có token
            }
            throw new Error("Không thể lấy thông tin người dùng.");
        }

        return await response.json();
    } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
        return null;
    }
};


export const logout = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/logout`, {
            method: "POST",
            credentials: "include",
        });
        return await handleResponse(response);
    } catch (error) {
        console.error("Lỗi khi đăng xuất:", error);
    }
};
