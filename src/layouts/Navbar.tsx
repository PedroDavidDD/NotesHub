import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { theme } from '../css/theme';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={`shadow-lg top-0 z-50`}
      style={{
        background: theme.colors.common.black,
      }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <div className={`text-2xl font-bold transition duration-300 mr-5`}>
          <Link to="/"
          style={{
            color: theme.navbar.background,
          }}
          >NoteHub</Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-2xl transition-transform duration-300 hover:scale-105"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
          style={{
            background: theme.colors.common.white,
            color: theme.colors.common.black
          }}
        >
          ☰
        </button>

        {/* Navigation Links */}
        <div
          className={`${
            isOpen ? 'block' : 'hidden'
          } absolute top-16 left-0 w-full md:static md:block transition-all duration-300 z-10`}
          style={{
            background: theme.colors.common.black,
          }}
        >
          <div className={`flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 p-4 md:p-0`}>
            <Link
              to="/"
              className={`transition duration-300 transform hover:scale-110`}              
              style={{
                color: theme.colors.common.white,
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = theme.navbar.background)}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = theme.colors.common.white)}  
            >
              Home
            </Link>
            <Link
              to="https://www.paypal.me/donacionesmaxdiaz"
              className={`transition duration-300 transform hover:scale-110`}
              target='_blank'
              style={{
                color: theme.colors.common.white,
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = theme.navbar.background)}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = theme.colors.common.white)}  
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
