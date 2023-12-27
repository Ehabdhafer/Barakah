import React, { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(Cookies.get("token") || null);
  const [roleId, setRoleId] = useState(Cookies.get("role_id") || null); // New state for role_id

  const login = (token, role_id) => {
    setAuthToken(token);
    setRoleId(role_id); // Save role_id in state
    Cookies.set("token", token); // Set the cookie to expire in 7 days (adjust as needed)
    Cookies.set("role_id", role_id); // Save role_id in cookie
  };

  const logout = () => {
    setAuthToken(null);
    setRoleId(null); // Clear role_id from state
    Cookies.remove("token");
    Cookies.remove("role_id"); // Clear role_id from cookie
  };

  const isAuthenticated = () => {
    return !!authToken;
  };

  return (
    <AuthContext.Provider
      value={{ authToken, roleId, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
