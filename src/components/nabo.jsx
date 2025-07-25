"use client";

// Imports
import React from "react";
import Link from "next/link";

import { useAuth_ } from "@/contexts/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout_, user } = useAuth_();

  const handleLogout_ = async () => {
    await logout_(true); // <-- Llamada a logout_
  };
  console.log("Inicio navbAr");
  return (
    <nav className="bg-blue-700 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* LOGO */}

        {!isAuthenticated && (
          <>
            <Link
              href="/"
              className="text-white text-2xl font-extrabold cursor-pointer hover:text-blue-200 transition-colors duration-200"
            >
              Sckolar Biscuit Suite
            </Link>

            <div className="flex space-x-6">
              {!isAuthenticated && (
                <>
                  <Link
                    href="/contacto"
                    className="text-white hover:bg-blue-600 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                  >
                    Contacto
                  </Link>
                  <Link
                    href="/registro"
                    className="text-white hover:bg-blue-600 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                  >
                    Registro
                  </Link>
                  <Link
                    href="/login"
                    className="text-white hover:bg-blue-600 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                  >
                    Iniciar Sesión
                  </Link>
                </>
              )}

              {isAuthenticated && (
                <>
                  {user && user.rol_codigo === "CTLES" && (
                    <>
                      <Link
                        href="/solicitudes"
                        className="text-white hover:bg-blue-600 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                      >
                        Solicitudes
                      </Link>
                      <Link
                        href="/alumnos"
                        className="text-white hover:bg-blue-600 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                      >
                        Alumnos
                      </Link>
                    </>
                  )}
                  <Link
                    href="/dashboard"
                    className="text-white hover:bg-blue-600 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout_}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-3 rounded-md text-base transition-colors duration-200 ml-4"
                  >
                    Cerrar Sesión
                    {/* Cerrar Sesión {user ? `${user.nombre}` : ""} */}
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
