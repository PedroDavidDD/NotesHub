import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useSelector } from 'react-redux';
import { selectBackgroundNotes } from '../redux/notesSlice';

export function Layout() {
  
  const settingsMain = useSelector( selectBackgroundNotes );
  
  return (
    <div className="min-h-screen bg-[#000000]">
      
      <Navbar />
      <main className="background"
      style={{
        background: `${settingsMain.color} url(${settingsMain.image}) no-repeat center/${settingsMain.size}`
      }}
      >
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
      <Footer />

    </div>
  );
}