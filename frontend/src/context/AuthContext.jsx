import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; //  CORRECTO

const AuthContext = createContext();

const AUTH_SERVICE_URL = "http://3.133.193.135:8083/secure/student"; // Ajusta si cambia

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const validateToken = async (token) => {
    try {
      const res = await fetch(AUTH_SERVICE_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Token inválido");
      const text = await res.text();
      return text === "Access granted: STUDENT";
    } catch {
      return false;
    }
  };

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const valid = await validateToken(token);
        if (valid) {
          const decoded = jwtDecode(token);
          setUser(decoded);
        } else {
          localStorage.removeItem("token");
          setUser(null);
        }
      }
    };
    checkToken();
  }, []);

  const login = async (token) => {
    console.log("Token recibido:", token);
    const valid = await validateToken(token);
    if (valid) {
      localStorage.setItem("token", token);
      const decoded = jwtDecode(token);
      setUser(decoded);
    } else {
      throw new Error("Token inválido");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
