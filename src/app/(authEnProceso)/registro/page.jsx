// sckolar-biscuit-nextjs/src/app/(authEnProceso)/registro/page.jsx
"use client";

import { useState } from "react";
import { useAuth_ } from "@/contexts/AuthContext";

export default function RegistroPage() {
  const [curp, setCurp] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { session_ } = useAuth_();

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

        <form className="space-y-6">
          <div>
            <label
              htmlFor="curp"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              CURP:
              <span className="text-red-500"> *</span>
            </label>
            <input
              type="text"
              id="curp"
              value={curp}
              onChange={(e) => setCurp(e.target.value)}
              className="shadow-sm appearance-none border border-gray-300 rounded-md py-2 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="CURP del aspirante"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Contraseña:
              <span className="text-red-500"> *</span>
            </label>
            <input
              type="password"
              id="password"
              value={password}
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
            INICIAR INSCRIPCIÓN
          </button>
        </form>
      </div>
    </div>
  );
}
