import React from "react";

const Navbar = ({ setCurrentPage }) => {
  return (
    <nav className="bg-blue-700 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* LOGO */}
        <a
          href="#" // en Next.js real: <Link href="/">
          onClick={() => setCurrentPage("home")}
          className="text-white text-2xl font-extrabold cursor-pointer hover:text-blue-200 transition-colors duration-200"
        >
          AdminEscuela
        </a>

        <div className="flex space-x-6">
          <a
            href="#"
            onClick={() => setCurrentPage("home")}
            className="text-white hover:bg-blue-600 px-6 py-2 rounded-md text-base font-medium transition-colors duration-200"
          >
            Inicio
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
