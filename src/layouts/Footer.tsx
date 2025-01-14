import React from 'react';

export function Footer() {
  return (
    <footer className="bg-[#2c0032] text-white py-8 transition-all duration-500">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
        {/* Links */}
        <div className="flex flex-wrap justify-center space-x-4">
          <a
            href="/"
            className="text-white hover:text-gray-300 transition duration-300 transform hover:scale-110"
          >
            Privacy Policy
          </a>
          <a
            href="/"
            className="text-white hover:text-gray-300 transition duration-300 transform hover:scale-110"
          >
            Terms of Service
          </a>
          <a
            href="/"
            className="text-white hover:text-gray-300 transition duration-300 transform hover:scale-110"
          >
            Support
          </a>
        </div>

        {/* Copyright */}
        <div className="text-sm text-center md:text-right opacity-75 transition-opacity duration-300 hover:opacity-100">
          © {new Date().getFullYear()} NoteHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
