// sckolar-biscuit-nextjs/src/app/layout.js
"use client";

import React from "react";

// Fonts
import { Geist, Geist_Mono } from "next/font/google";

// Styles
import "./globals.css";

// Components
import AppContent_ from "@/components/AppContent";

// AuthProvider
import { AuthProvider_ } from "@/contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Sckolar Biscuit Suite</title>
        <meta name="description" content="Academic Management like a biscuit" />

        <script src="https://cdn.tailwindcss.com"></script>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <style>
          {`
            body {
              font-family: 'Inter', sans-serif;
              margin: 0;
              padding 0;
              box-sizing: border-box;
              background-color: #f3f4ff6;
            }
          `}
        </style>
      </head>
      {/* --- */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider_>
          <AppContent_ children={children} />
        </AuthProvider_>
      </body>
    </html>
  );
}
