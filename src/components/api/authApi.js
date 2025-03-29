const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5120/api/users";
// const API_BASE_URL = "http://localhost:5120/api/users";
const DEFAULT_HEADERS = {
    "Content-Type": "application/json",
};

// Xử lý phản hồi API
const handleResponse = async (response) => {
    if (!response.ok) {
        let errorMessage = "Lỗi không xác định!";
        try {
            const errorText = await response.text();
            console.error("🔴 Phản hồi lỗi từ API:", errorText); // Log ra lỗi từ server
            if (errorText) {
                const errorData = JSON.parse(errorText);
                errorMessage = errorData.message || errorMessage;
            }
        } catch (err) {
            console.error("🚨 Không thể parse JSON từ lỗi API:", err);
        }
        throw new Error(errorMessage);
    }
    
    const text = await response.text();
    return text ? JSON.parse(text) : {}; 
};


// 🟢 API Đăng nhập
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

// 🟢 API Đăng ký (MỚI)
export const register = async (userData) => {
    // console.log("🔍 API gọi đến:", `${API_BASE_URL}/register`);
    // console.log("📨 Dữ liệu gửi lên API:", userData);
    try {
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: "POST",
            headers: DEFAULT_HEADERS,
            body: JSON.stringify(userData),
        });
        return await handleResponse(response);
    } catch (error) {
        console.error("Lỗi khi đăng ký:", error);
        throw error;
    }
};


// 🟢 API Lấy thông tin người dùng
export const fetchUserProfile = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/me`, {
            method: "GET",
            credentials: "include",
        });

        if (!response.ok) {
            if (response.status === 401) {
                // console.log("🚨 Không có token, user đã đăng xuất.");
                return null; // ✅ Trả về null nếu không có token
            }
            throw new Error("Không thể lấy thông tin người dùng.");
        }

        return await response.json();
    } catch (error) {
        // console.error("Lỗi khi lấy thông tin người dùng:", error);
        return null;
    }
};

export const updateUserProfile = async (userData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/me`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error("Không thể cập nhật thông tin người dùng.");
        }

        return await response.json(); // Trả về dữ liệu cập nhật
    } catch (error) {
        console.error("Lỗi khi cập nhật thông tin người dùng:", error);
        return null;
    }
};

// 🟢 API Đăng xuất
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

// 📌 Gửi OTP
export const sendOtp = async (email) => {
    try {
        const response = await fetch(`${API_BASE_URL}/forgot-password`, {
            method: "POST",
            headers: DEFAULT_HEADERS,
            body: JSON.stringify({ email }),
        });
        if (!response.ok) throw new Error("Lỗi khi gửi OTP!");
        return await response.json();
    } catch (error) {
        throw new Error(error.message);
    }
};

// 📌 Xác nhận OTP
export const verifyOtp = async (email, otpCode) => {
    try {
        // console.log("🔍 Gửi dữ liệu:", { email, otpCode }); // Kiểm tra log
        const response = await fetch(`${API_BASE_URL}/verify-otp`, {
            method: "POST",
            headers: DEFAULT_HEADERS,
            body: JSON.stringify({ email, otpCode }),  // Kiểm tra lại biến này
        });
        return await handleResponse(response);
    } catch (error) {
        console.error("❌ Lỗi khi xác nhận OTP:", error);
        throw error;
    }
};


// 📌 Đặt lại mật khẩu
export const resetPassword = async (email, newPassword) => {
    try {
        const response = await fetch(`${API_BASE_URL}/reset-password`, {
            method: "POST",
            headers: DEFAULT_HEADERS,
            body: JSON.stringify({ email, newPassword }),
        });
        if (!response.ok) throw new Error("Không thể cập nhật mật khẩu!");
        return await response.json();
    } catch (error) {
        throw new Error(error.message);
    }
};