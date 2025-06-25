"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";

// 1. Crear el contexto
export const AuthContext_ = createContext(null);

const INACTIVITY_TIMEOUTS_BY_ROLE_ = {
  // milisegundos
  ADMIN: 30 * 60 * 1000,
  DOCEN: 20 * 60 * 1000,
  ALUMN: 15 * 60 * 1000,
  TUTOR: 15 * 60 * 1000,
  ASPIR: 10 * 60 * 1000,
  DEFAULT: 10 * 60 * 1000,
};

// 2. Crear el Proveedor de Autenticación (AuthContext.Provider)
export const AuthProvider_ = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const router = useRouter();

  // F para manejar el login
  const login_ = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  // Func para manejar el logout
  const logout_ = async (redirect = true) => {
    // Manda a llamar a la API Route de logout para eliminar la cokie  HttpOnly
    try {
      const response = await fetch("/api/auth/logout", { method: "POST" });
      if (response.ok) {
        setUser(null);
        setIsAuthenticated(false);
        if (redirect) {
          router.push("/login");
        }
      } else {
        console.error("Error al cerrar sesión en el servidor.");
        alert("Error al cerrar sesión. Inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("Error de red al intentar cerrar sesión en el servidor.");
      alert("Error de red al intentar cerrar sesión.");
    }
  };

  useEffect(() => {
    // Verificación aquí
    setLoadingAuth(false);
  }, []);

  const AuthContextValue_ = {
    user,
    isAuthenticated,
    loadingAuth,
    login_,
    logout_,
    INACTIVITY_TIMEOUTS_BY_ROLE_,
  };

  return (
    <AuthContext_.Provider value={AuthContextValue_}>
      {children}{" "}
      {/* Renderiza los componentes hijos envueltos por el proveedor. */}
    </AuthContext_.Provider>
  );
};

// 3. Hook Personalizado para Consumir el Contexto (useAuth)
export const useAuth_ = () => {
  const context = useContext(AuthContext_);

  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};
