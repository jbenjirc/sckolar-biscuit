import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-68px)] bg-gradient-to-br from-red-50 to-orange-100 p-8 text-center">
      <h1 className="text-8xl font-extrabold text-gray-800 mb-4 animate-bounce">
        404
      </h1>
      <h2 className="text-4xl font-bold text-gray-700 mb-6">
        Págia no encontrada
      </h2>
      <p className="text-lg text-gray-600 mb-8 max-w-lg">
        ¡No hay galletas por aquí! Esta página aún no existe o puede que el
        enlace se haya roto.
      </p>
      <Link
        href="/"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
