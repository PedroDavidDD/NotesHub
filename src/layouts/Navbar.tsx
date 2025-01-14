import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#2c0032] shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <div className="text-2xl font-bold text-white transition duration-300 hover:text-gray-300 mr-5">
          <Link to="/">NoteHub</Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-2xl transition-transform duration-300 hover:scale-110"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          ☰
        </button>

        {/* Navigation Links */}
        <div
          className={`${
            isOpen ? 'block' : 'hidden'
          } absolute top-16 left-0 w-full bg-[#2c0032] md:static md:block transition-all duration-300`}
        >
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 p-4 md:p-0">
            <Link
              to="/"
              className="text-white hover:text-gray-300 transition duration-300 transform hover:scale-110"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-white hover:text-gray-300 transition duration-300 transform hover:scale-110"
            >
              About
            </Link>
            <Link
              to="/services"
              className="text-white hover:text-gray-300 transition duration-300 transform hover:scale-110"
            >
              Services
            </Link>
            <Link
              to="/contact"
              className="text-white hover:text-gray-300 transition duration-300 transform hover:scale-110"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
