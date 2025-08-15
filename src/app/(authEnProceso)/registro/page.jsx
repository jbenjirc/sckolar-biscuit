// sckolar-biscuit-nextjs/src/app/(authEnProceso)/registro/page.jsx
"use client";

import { useState } from "react";
import { useAuth_ } from "@/contexts/AuthContext";

export default function RegistroPage() {
  const [emailForm, setEmail] = useState("");
  const [passwordForm, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { session_ } = useAuth_();

  const handleSubmit_ = async (e) => {
    e.preventDefault();

    setMessage("");
    setIsError(false);
    setLoading(true);

    try {
      const response_ = await fetch("/api/auth/registro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emailForm, passwordForm }),
      });

      const data_ = await response_.json();

      if (!response_.ok) {
        setIsError(true);
        setMessage(data_.error || "Error al registrar usuario nuevo.");
        return;
      }

      setMessage("Registro exitoso. Redirigiendo...");
      setIsError(false);

      session_(data_.user);

      router.push("/completar-datos"); // Redirigir a completar datos
      setTimeout(() => {
        window.location.href = "/completar-datos"; // Redirigir a completar datos
      }, 2000); // Esperar 2 segundos antes de redirigir
    } catch (error) {
      console.error("Error al registrar usuario", error);
      setIsError(true);
      setMessage("Error de red o interno al intentar iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto p-6 min-h-[calc(100vh-68px)] flex flex-col items-center justify-center bg-red-200">
      <div className="bg-blue-100 p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Registro
        </h1>
        <p>
          Aquí comienza tu proceso de inscripción. Por favor, crea una cuenta
          para comenzar.
        </p>
        <br></br>
        <p>Los datos deben de ser del aspirante a inscribir.</p>
        <br></br>

        <form onSubmit={handleSubmit_} className="space-y-6">
          <div>
            <label
              htmlFor="emailForm"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Correo electrónico:
              <span className="text-red-500"> *</span>
            </label>
            <input
              id="emailForm"
              type="email"
              value={emailForm}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow-sm appearance-none border border-gray-300 rounded-md py-2 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="example@correo.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="passwordForm"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Contraseña:
              <span className="text-red-500"> *</span>
            </label>
            <input
              id="passwordForm"
              type="password"
              value={passwordForm}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow-sm appearance-none border border-gray-300 rounded-md py-2 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Contraseña"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`font-bold py-3 px-6 rounded-lg w-full shadow-md transform transition-all duration-300 focus:outline-none focus:ring
            ${loading} ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text text-white hover:scale-105 focus:blue-300'}`}
          >
            {loading ? "Cargando..." : "CREAR CUENTA"}
          </button>
        </form>

        {message && (
          <p
            className={`mt-6 text-center text-base font-semibold ${
              isError ? "text-red-600" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}
        <p className="mt-4 text-sm text-gray-600">
          ¿Ya tienes una cuenta?{" "}
          <a
            href="/login"
            className="text-blue-600 hover:underline font-semibold"
          >
            Iniciar sesión
          </a>
        </p>
        <p className="mt-2 text-sm text-gray-600">
          ¿Necesitas ayuda?{" "}
          <a
            href="/contacto"
            className="text-blue-600 hover:underline font-semibold"
          >
            Contáctanos
          </a>
        </p>
      </div>
    </div>
  );
}
