"use client";

// Imports
import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-blue-700 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* LOGO */}

        <Link
          href="/"
          className="text-white text-2xl font-extrabold cursor-pointer hover:text-blue-200 transition-colors duration-200"
        >
          Sckolar Biscuit Suite
        </Link>

        {/* OPCIONES DE NAVEGACIÓN */}
        <div className="felx space-x-6">
          <Link
            href="../login/layout"
            className="text-white hover:bg-blue-600 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
          >
            Inicia sesión
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
