import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AdminAuthContext = createContext();

const API_URL = "http://localhost:5000";

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  }
  return context;
};

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if admin is logged in on mount
  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const response = await axios.get(`${API_URL}/admins`);
      const admins = response.data;

      const foundAdmin = admins.find(
        (a) => a.email === email && a.password === password
      );

      if (foundAdmin) {
        const adminData = {
          id: foundAdmin.id,
          name: foundAdmin.name,
          email: foundAdmin.email,
        };
        setAdmin(adminData);
        localStorage.setItem("admin", JSON.stringify(adminData));
        return { success: true };
      } else {
        return { success: false, message: "Email atau password salah" };
      }
    } catch (error) {
      return { success: false, message: "Terjadi kesalahan. Coba lagi nanti." };
    }
  };

  // Register function
  const register = async (name, email, password) => {
    try {
      // Check if email already exists
      const response = await axios.get(`${API_URL}/admins`);
      const admins = response.data;

      const existingAdmin = admins.find((a) => a.email === email);
      if (existingAdmin) {
        return { success: false, message: "Email sudah terdaftar" };
      }

      // Create new admin
      const newAdmin = {
        name,
        email,
        password,
      };

      const createResponse = await axios.post(`${API_URL}/admins`, newAdmin);
      const adminData = {
        id: createResponse.data.id,
        name: createResponse.data.name,
        email: createResponse.data.email,
      };

      setAdmin(adminData);
      localStorage.setItem("admin", JSON.stringify(adminData));
      return { success: true };
    } catch (error) {
      return { success: false, message: "Terjadi kesalahan. Coba lagi nanti." };
    }
  };

  // Logout function
  const logout = () => {
    setAdmin(null);
    localStorage.removeItem("admin");
  };

  const value = {
    admin,
    login,
    register,
    logout,
    loading,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};
