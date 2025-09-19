import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { theme } from '../css/theme';
import { selectBackgroundNotes } from '../redux/notesSlice';
import { useSelector } from 'react-redux';

export function Navbar() {
  const settingsMain = useSelector( selectBackgroundNotes );

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
            // color: theme.navbar.background,
            color: settingsMain.nav.colorIcons,
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
              Paypal
            </Link>
            <a
              href="https://www.linkedin.com/in/pedro-david-de-la-cruz-díaz-0bbaa0249"
              className="transition duration-300 transform hover:scale-110"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: theme.colors.common.white,
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = theme.navbar.background)}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = theme.colors.common.white)}
            >
              Linkedin
            </a>
            <a
              href="CV_PedroDavid_DelacruzDíaz.pdf"
              className="transition duration-300 transform hover:scale-110"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: theme.colors.common.white,
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = theme.navbar.background)}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = theme.colors.common.white)}
            >
              Curriculum Vitae
            </a>

          </div>
        </div>
      </div>
    </nav>
  );
}
