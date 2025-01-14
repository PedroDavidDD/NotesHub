import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function Layout() {
  return (
    <div className="min-h-screen bg-[#1a0122]">
      
      <Navbar />
      <main className="background">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
      <Footer />

    </div>
  );
}