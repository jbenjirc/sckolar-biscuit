export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-68px)] p-8 bg-indigo-100">
      <h1 className="text-5xl font-extrabold text-blue-700 mb-6 text-center leading-tight">
        Bienvenido a Sckolar Biscuit Suite
      </h1>
      <p className="text-xl text-gray-700 mb-1 text-center max-w-3xl">
        Esta es una versión de demostración de la aplicación Sckolar Biscuit
        Suite, diseñada para mostrar las capacidades de la plataforma.
      </p>
      <div className="bg-white rounded-lg shadow-lg mt-6 w-full max-w-4xl">
        <p className="text-lg text-gray-600 mt-2 max-w-4xl text-center">
          Puedes explorar la aplicación utilizando los diferentes roles de
          usuario disponibles.
          <span className="text-blue-700 font-semibold">
            <br />
            Cada rol tiene acceso a diferentes funcionalidades y vistas:
          </span>
        </p>
        <div className="p-6">
          <ul className="list-disc list-inside text-gray-600 mt-4 space-y-2">
            <li>
              <strong>CTLES:</strong> Acceso al proceso de inscripción y gestión
              de estudiantes.
              <div className="mt-2 rounded-md bg-gray-100 p-4">
                <strong>Correo:</strong> esco@example.com
                <br />
                <strong>Contraseña:</strong> esco123
              </div>
            </li>

            <li>
              <strong>ADMIN:</strong> Acceso a la administración general del
              sistema.
              <div className="mt-2 rounded-md bg-gray-100 p-4">
                <strong>Correo:</strong> admin@example.com
                <br />
                <strong>Contraseña:</strong> admin123
              </div>
            </li>

            <li>
              <strong>ASPIR:</strong> Acceso al proceso de inscripción y gestión
              de su propia cuenta.
              <div className="mt-2 rounded-md bg-gray-100 p-4">
                <p className="text-red-500 text-sm mb-2">
                  * Seleccione la opción <i>Aspirante</i> en la página de inicio
                  de sesión.
                </p>
                <strong>CURP:</strong> ABCD123456HDFGHI01
                <br />
                <strong>Contraseña:</strong> aspir123
              </div>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
