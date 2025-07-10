// skolar-biscuit-nextjs/src/contexts/AuthContext.jsx
"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";

// 1. Crear el contexto
export const AuthContext_ = createContext();

const INACTIVITY_TIMEOUTS_BY_ROLE_ = {
  // milisegundos
  ADMIN: 30 * 60 * 1000,
  DOCEN: 20 * 60 * 1000,
  ALUMN: 15 * 60 * 1000,
  TUTOR: 15 * 60 * 1000,
  ASPIR: 10 * 60 * 1000,
  DEFAULT: 10 * 60 * 1000,
};

// 2. Crear el Proveedor de Autenticación (AuthContext_.Provider)
export const AuthProvider_ = ({ children }) => {
  const [user, setUser] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const router = useRouter();

  // Usuario Loggeado
  const login_ = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  // Usuario desloggeado
  const logout_ = async (redirect = true) => {
    // Manda a llamar a la API Route de logout para eliminar la cookie HttpOnly
    try {
      const response_ = await fetch("/api/auth/logout", { method: "POST" });
      if (response_.ok) {
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
    const verifySession_ = async () => {
      try {
        const response_ = await fetch("/api/auth/session");
        const data_ = await response_.json();

        if (response_.ok && data_.isAuthenticated) {
          // Si se confirma la Auth, entonces se actualiza el estado
          setUser(data_.user);
          setIsAuthenticated(true);
          router.push("/dashboard");
        } else {
          // Si no, se limpia el estado
          setUser(null);
          setIsAuthenticated(false);
          // Si la API devuelve 401 o una sesión no válida, redirecciona al login
          if (router.pathname !== "/login") {
            router.push("/");
          }
        }
      } catch (error) {
        console.error("Error al verificar la sesión:", error);
        setUser(null);
        setIsAuthenticated(false);

        if (router.pathname !== "/login") {
          router.push("/login"); // Redirige al login en caso de error de red
        }
      } finally {
        setLoadingAuth(false); // La carga se finaliza sin importar el resultado
      }
    };

    verifySession_();
  }, [router]);

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
      {children}
      {/* Renderiza los componentes hijos envueltos por el proveedor. */}
    </AuthContext_.Provider>
  );
};

// 3. Hook Personalizado para Consumir el Contexto (useAuth)
export const useAuth_ = () => {
  const context_ = useContext(AuthContext_);

  if (context_ === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context_;
};
