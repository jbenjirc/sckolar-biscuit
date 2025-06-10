// SIMULATION
//import React, { useState } from "react";

//"use client";

// Fonts
import { Geist, Geist_Mono } from "next/font/google";

// Styles
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

// Metadata
export const metadata = {
  title: "Sckolar Biscuit Admin",
  description: "Academic Management like a biscuit",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      {/*       <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale1-0" />
      </head> */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
