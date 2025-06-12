"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  // Estados para los campos del formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Estados para mensajes de retroalimentación al usuario
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  // Estado para controlar el estado de carga del formulario (deshabilitar botón, mostrar spinner)
  const [loading, setLoading] = useState(false);

  //Instancia del router para redirección
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setIsError(false);
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // Parsea la respuesta del servidor
      const data = await response.json();

      if (!response.ok) {
        setIsError(true);
        setMessage(data.error || "Error al iniciar sesión.");
        return;
      }

      // LOGIN: Success
      setMessage("Inicio de sesión exitoso. Redirigiendo...");
      setIsError(false);

      // JSON Web Token (JWT)
      // --

      setTimeout(() => {
        router.push("/"); // Redirige a la página de inicio
      }, 1500);
    } catch (error) {
      console.error("Error al iniciar sesión", error);
      setIsError(true);
      setMessage("Error de red o interno al intentar iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-[calc(100vh-68px)] flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Iniciar sesión
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campo de email */}
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="correo@example.mx"
              required
            />
          </div>

          {/* Campo de contraseña */}
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Contraseña:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="øøøøøøøø"
              required
            />
          </div>
          {/* Botón de envío del formulario */}
          <button
            type="submit"
            disabled={loading}
            className={`font-bold py-3 px-6 rounded-lg w-full shadow-md transform transition-all duration-300 focus:outline-none focus:ring
            ${loading} ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text text-white hover:scale-105 focus:blue-300'}`}
          >
            {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </button>
        </form>
        {/* Mensaje de retroalimentación (éxito o error) */}
        {message && (
          <p
            className={`mt-6 text-center text-base font-semibold ${
              isError ? "text-red-600" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
