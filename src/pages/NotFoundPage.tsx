import React from 'react'
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center">
      <h1 className={`text-8xl font-bold text-[#ffc800] mb-4`}>404</h1>
      <p className={`text-2xl text-[#ffc800] mb-8`}>Página no encontrada</p>
      
      <Link
        to="/"
        className={`inline-flex items-center gap-2 px-6 py-3 bg-[#ffc800] hover:bg-[#ffc800] rounded-lg transition-colors`}
      >
        <Home size={20} />
        Volver al Inicio
      </Link>
    </div>
  );
}