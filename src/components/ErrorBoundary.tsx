import React from 'react';
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

export function ErrorBoundary() {
  const error = useRouteError();
  
  if (isRouteErrorResponse(error)) {
    return (
      <div className="min-h-screen bg-[#1a0122] text-white flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-pink-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-pink-400 mb-2">Error {error.status}</h1>
          <p className="text-xl text-pink-300">{error.statusText}</p>
          {error.data?.message && (
            <p className="mt-2 text-pink-200">{error.data.message}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a0122] text-white flex items-center justify-center">
      <div className="text-center">
        <AlertTriangle className="w-16 h-16 text-pink-500 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-pink-400 mb-2">Oops!</h1>
        <p className="text-xl text-pink-300">Something went wrong</p>
      </div>
    </div>
  );
}