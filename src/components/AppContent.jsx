// sckolar-biscuit-nextjs/src/components/AppContent.jsx
"use client";

import React, { useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth_ } from "@/contexts/AuthContext";
import Navbar from "./Navbar";
import { throwIfDisallowedDynamic } from "next/dist/server/app-render/dynamic-rendering";

export default function AppContent_({ children }) {
  const router_ = useRouter();
  const pathname_ = usePathname();

  const {
    user,
    isAuthenticated,
    loadingAuth,
    logout_,
    INACTIVITY_TIMEOUTS_BY_ROLE_,
  } = useAuth_();

  const privateRoutes_ = ["/dashboard", "/alumnos"];
  const isPrivateRoute_ = privateRoutes_.includes(pathname_);

  const activityTimeoutRef_ = useRef(null);

  const currentInactivityTimeout_ =
    user && user.rol_codigo && INACTIVITY_TIMEOUTS_BY_ROLE_[user.rol_codigo]
      ? INACTIVITY_TIMEOUTS_BY_ROLE_[user.rol_codigo]
      : INACTIVITY_TIMEOUTS_BY_ROLE_["DEFAULT"];

  const resetInactivityTimer_ = () => {
    if (isAuthenticated) {
      clearTimeout(activityTimeoutRef_.current);
      activityTimeoutRef_.current = setTimeout(
        handleInactivity_,
        currentInactivityTimeout_
      );
    }
  };

  const handleInactivity_ = () => {
    console.log("Inactividad detectada. Cerrando sesión...");
    alert("Sesión cerrada por inactividad.");
    logout_(true);
  };

  useEffect(() => {
    if (isAuthenticated) {
      window.addEventListener("mousemove", resetInactivityTimer_);
      window.addEventListener("keydown", resetInactivityTimer_);
      window.addEventListener("click", resetInactivityTimer_);
      window.addEventListener("scroll", resetInactivityTimer_);

      resetInactivityTimer_();

      return () => {
        clearTimeout(activityTimeoutRef_.current);
        window.removeEventListener("mousemove", resetInactivityTimer_);
        window.removeEventListener("keydown", resetInactivityTimer_);
        window.removeEventListener("click", resetInactivityTimer_);
        window.removeEventListener("scroll", resetInactivityTimer_);
      };
    } else {
      clearTimeout(activityTimeoutRef_.current);
    }
  }, [isAuthenticated, currentInactivityTimeout_]);

  // -- Enrutamiento en Login o Registro --
  useEffect(() => {
    if (!loadingAuth && isAuthenticated) {
      if (pathname_ === "/login") {
        router_.push("/dashboard");
      }
    }
  }, [loadingAuth, isAuthenticated, pathname_, router_]);

  // -- Lógica de renderizado --
  if (loadingAuth) {
    // Cargando
    return (
      <div className="container mx-auto p-6 bg-gray-50 min-h-[calc(100vh-68px)] flex flex-col items-center justify-center">
        <p className="text-5xl text-gray-700">Cargando sesión...</p>
      </div>
    );
  }
  console.log("AppContent_ rendered", { pathname_ });

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
