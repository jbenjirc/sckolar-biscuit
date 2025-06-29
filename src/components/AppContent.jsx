"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import LoginPage from "../app/(authEnProceso)/login/page";
import { useAuth_ } from "@/contexts/AuthContext";
import Navbar from "./Navbar";

export default function AppContent_() {
  const router_ = useRouter();

  const {
    user,
    isAuthenticated,
    loadingAuth,
    login_,
    logout_,
    INACTIVITY_TIMEOUTS_BY_ROLE_,
  } = useAuth_();
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
        window.addEventListener("mousemove", resetInactivityTimer_);
        window.addEventListener("keydown", resetInactivityTimer_);
        window.addEventListener("click", resetInactivityTimer_);
        window.addEventListener("scroll", resetInactivityTimer_);
      };
    } else {
      clearTimeout(activityTimeoutRef_.current);
    }
  }, [isAuthenticated, currentInactivityTimeout_]);

  let PageContent_;
  if (loadingAuth) {
    PageContent_ = (
      <div className="container mx-auto p-6 bg-gray-50 min-h-[calc(100vh-68px)] flex flex-col items-center justify-center">
        <p className="text-5xl text-gray-700">Cargando sesión...</p>
      </div>
    );
  } else if (!isAuthenticated) {
    PageContent_ = <LoginPage />;
  } else {
    switch (user.rol_codigo) {
      case "ADMIN":
        PageContent_ = (
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-68px)] bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
            <h1 className="text-5xl font-extrabold text-blue-800 mb-6 text-center leading-tight">
              Dashboard de Administrador
            </h1>
            <p className="text-xl text-gray-700 mb-10 text-center max-w-3xl">
              Bienvenido, {user.nombre} {user.ap_pat} ({user.rol_codigo}).
            </p>
            <p className="text-gray-600">
              Tiempo de inactividad asignado:{" "}
              {Math.floor(currentInactivityTimeout_ / 1000 / 60)} minutos.
            </p>
          </div>
        );
        break;
      case "DOCEN":
        PageContent_ = (
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-68px)] bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
            <h1 className="text-5xl font-extrabold text-blue-800 mb-6 text-center leading-tight">
              Dashboard de Docente
            </h1>
            <p className="text-xl text-gray-700 mb-10 text-center max-w-3xl">
              Bienvenido, {user.nombre} {user.ap_pat} ({user.rol_codigo}).
            </p>
            <p className="text-gray-600">
              Tiempo de inactividad asignado:{" "}
              {Math.floor(currentInactivityTimeout_ / 1000 / 60)} minutos.
            </p>
          </div>
        );
        break;
      case "ALUMN":
        PageContent_ = (
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-68px)] bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
            <h1 className="text-5xl font-extrabold text-blue-800 mb-6 text-center leading-tight">
              Dashboard de Alumno
            </h1>
            <p className="text-xl text-gray-700 mb-10 text-center max-w-3xl">
              Bienvenido, {user.nombre} {user.ap_pat} ({user.rol_codigo}).
            </p>
            <p className="text-gray-600">
              Tiempo de inactividad asignado:{" "}
              {Math.floor(currentInactivityTimeout_ / 1000 / 60)} minutos.
            </p>
          </div>
        );
        break;
      default:
        PageContent_ = (
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-68px)] bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
            <h1 className="text-5xl font-extrabold text-blue-800 mb-6 text-center leading-tight">
              Bienvenido, {user.nombre}
            </h1>
            <p className="text-xl text-gray-700 mb-10 text-center max-w-3xl">
              Dashboard general ({user.rol_codigo}).
            </p>
            <p className="text-gray-600">
              Tiempo de inactividad asignado:{" "}
              {Math.floor(currentInactivityTimeout_ / 1000 / 60)} minutos.
            </p>
          </div>
        );
        break;
    }
  }

  return (
    <>
      <Navbar />
      {PageContent_}
    </>
  );
}
