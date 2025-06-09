"use client"; // SIMULATION
import React, { useState } from "react"; // SIMULATION
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Components
import Navbar from "../components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* export const metadata = {
  title: "Sckolar Biscuit Admin",
  description: "Academic Management like a biscuit",
}; */

export default function RootLayout({ children }) {
  const [currentPage, setCurrentPage] = useState("home");

  let PageContent;

  switch (currentPage) {
    case "home":
      PageContent = (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-68px)] bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
          <h1 className="text-5xl font-extrabold text-blue-800 mb-6 text-center leading-tight">
            Bienvenido, esta es la página de inicio
          </h1>
          <p className="text-xl text-gray-700 mb-10 text-center max-w-3xl">
            Esta es la página de inicio
          </p>
          <p className="text-gray-600">
            Puedes usar la opción Inicio en la barra de navegación.
          </p>
        </div>
      );
      break;
    default:
      PageContent = (
        <div className="container mx-auto p-6 bg-gray-50 min-h[calc(100vh-68px)] flex items-center justify-center">
          <p className="text-xl text-gray-700">
            Página no encontrada en simulación :(
          </p>
        </div>
      );
  }

  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar setCurrentPage={setCurrentPage} />
        {PageContent}
      </body>
    </html>
  );
}
