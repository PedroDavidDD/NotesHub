import React from 'react';
import { theme } from '../css/theme';

export function Footer() {
  return (
    <footer className="text-white py-8 transition-all duration-500" style={{background: theme.colors.common.black}}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
        {/* Links */}
        <div className="flex flex-wrap justify-center space-x-4">
          <a
            href="/"
            className="text-white hover:text-gray-300 transition duration-300 transform hover:scale-110"
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = theme.navbar.background)}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = theme.colors.common.white)}
            
          >
            Privacy Policy
          </a>
          <a
            href="/"
            className="text-white hover:text-gray-300 transition duration-300 transform hover:scale-110"
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = theme.navbar.background)}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = theme.colors.common.white)}

          >
            Terms of Service
          </a>
          <a
            href="/"
            className="text-white hover:text-gray-300 transition duration-300 transform hover:scale-110"
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = theme.navbar.background)}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = theme.colors.common.white)}

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
