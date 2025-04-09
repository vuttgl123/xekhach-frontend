import { createContext, useState, useEffect } from "react";
import { fetchUserProfile } from "../components/api/authApi"; // ✅ Gọi API hiện có

// Tạo context
export const UserContext = createContext();

// Provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Hàm kiểm tra trạng thái đăng nhập
  const checkLoginStatus = async () => {
    try {
      const data = await fetchUserProfile();
      setUser(data || null);
    } catch {
      setUser(null);
    }
  };

  // Gọi khi component được mount
  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, checkLoginStatus }}>
      {children}
    </UserContext.Provider>
  );
};
