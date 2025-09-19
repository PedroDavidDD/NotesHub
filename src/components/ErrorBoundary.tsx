import React from 'react';
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

export function ErrorBoundary() {
  const error = useRouteError();
  
  if (isRouteErrorResponse(error)) {
    return (
      <div className="min-h-screen bg-[#000000] text-yellow-500 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-yellow-500 mb-2">Error {error.status}</h1>
          <p className="text-xl text-yellow-500">{error.statusText}</p>
          {error.data?.message && (
            <p className="mt-2 text-yellow-500">{error.data.message}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#000000] text-yellow-500 flex items-center justify-center">
      <div className="text-center">
        <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-yellow-500 mb-2">¡Cuidado!</h1>
        <p className="text-xl text-yellow-500">Algo salió mal</p>
      </div>
    </div>
  );
}