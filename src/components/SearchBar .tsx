import React, { useState } from "react";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    console.log("Buscando:", searchTerm);
    // Aquí puedes manejar la lógica de búsqueda
  };

  return (
    <>
        {/* Icono de búsqueda */}
        <button
            onClick={handleSearch}
            className="text-gray-400 hover:border-red-500 hover:text-red-500 focus:outline-none rounded-none transition duration-300"
        >
            <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M16.65 10.85A5.5 5.5 0 1110.85 5.5 5.5 5.5 0 0116.65 10.85z"
            />
            </svg>
        </button>
        {/* Input de búsqueda */}
        <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 transition duration-300 text-gray-700"
        />
    </>
  );
};

export default SearchBar;
