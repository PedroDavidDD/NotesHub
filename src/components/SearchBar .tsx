import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchTerm } from "../redux/notesSlice";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [localSearchTerm, setLocalSearchTerm] = useState(""); 

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length == 0){
      dispatch(setSearchTerm(localSearchTerm)); 
    }
    setLocalSearchTerm(e.target.value);  
  };

  const handleSearchSubmit = () => {
    dispatch(setSearchTerm(localSearchTerm)); 
  };

  return (
    <>
      <button
        onClick={handleSearchSubmit}
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

      <input
        type="text"
        value={localSearchTerm}  
        onChange={handleSearchChange} 
        placeholder="Buscar..."
        className="w-full pl-10 pr-4 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 transition duration-300 text-gray-700"
      />
    </>
  );
};

export default SearchBar;
