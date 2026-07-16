import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const useAuth = ({ required = false } = {}) => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { token, login, logout } = context;

  useEffect(() => {
    if (required && !token) {
      navigate("/login", { replace: true });
    }
  }, [required, token, navigate]);

  return { token, login, logout, isAuthenticated: Boolean(token) };
};
