import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // ✅ FIXED LOGIN
  const login = (userData) => {
    const cleanUser = {
      name: userData.name,
      email: userData.email,
      role: userData.role || "user",
    };

    setUser(cleanUser);
    localStorage.setItem("user", JSON.stringify(cleanUser));
  };

  // ✅ FIXED LOGOUT
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
