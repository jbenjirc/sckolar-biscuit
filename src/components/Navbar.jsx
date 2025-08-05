"use client";

// Imports
import React from "react";
import Link from "next/link";
import NavbarDropdownList_ from "@/components/NavbarDropdowList";

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

        {/* USUARIO NO AUNTENTICADO */}
        {!isAuthenticated && (
          <>
            <Link
              href="/"
              className="text-white text-2xl font-extrabold cursor-pointer hover:text-blue-200 transition-colors duration-200"
            >
              Sckolar Biscuit Suite
            </Link>

            <div className="flex space-x-6">
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
                className="bg-blue-900 text-white hover:bg-blue-600 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              >
                Iniciar Sesión
              </Link>
            </div>
          </>
        )}

        {/* USUARIO AUNTENTICADO */}
        {isAuthenticated && (
          <>
            <Link
              href="/dashboard"
              className="text-white text-2xl font-extrabold cursor-pointer hover:text-blue-200 transition-colors duration-200"
            >
              Bienvenido {user ? `${user.nombre}` : ""}
            </Link>

            {user && user.rol_codigo === "CTLES" && (
              <>
                <div className="flex space-x-6">
                  <NavbarDropdownList_
                    title_="Inscripciones"
                    links_={[
                      {
                        label_: "Inscripciones",
                        href_: "/inscripciones",
                      },
                      {
                        label_: "Reinscripciones",
                        href_: "/reinscripciones",
                      },
                    ]}
                  />
                  <NavbarDropdownList_
                    title_="Alumnos"
                    links_={[
                      {
                        label_: "Ver Alumnos",
                        href_: "/alumnos",
                      },
                      {
                        label_: "Calificaciones",
                        href_: "/calificaciones",
                      },
                      {
                        label_: "Reportes",
                        href_: "/reportes",
                      },
                    ]}
                  />
                  <NavbarDropdownList_
                    title_="Académico"
                    links_={[
                      {
                        label_: "Horarios",
                        href_: "/horarios",
                      },
                      {
                        label_: "Materias",
                        href_: "/materias",
                      },
                      {
                        label_: "Grupos",
                        href_: "/grupos",
                      },
                      {
                        label_: "Justificantes",
                        href_: "/justificantes",
                      },
                      {
                        label_: "Expedir Certificados",
                        href_: "/certificados",
                      },
                    ]}
                  />
                </div>
              </>
            )}
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
    </nav>
  );
};

export default Navbar;
