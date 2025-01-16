import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useSelector } from 'react-redux';
import { selectBackgroundNotes } from '../redux/notesSlice';

export function Layout() {
  
  const bgData = useSelector( selectBackgroundNotes );
  
  return (
    <div className="min-h-screen bg-[#1a0122]">
      
      <Navbar />
      <main className="background"
      style={{
        background: `${bgData.color} url(${bgData.image}) no-repeat center/${bgData.size}`
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