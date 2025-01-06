import React from 'react';
import { Settings } from 'lucide-react';

interface ConfigButtonProps {
  onClick: () => void;
}

export function ConfigButton({ onClick }: ConfigButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-pink-500 hover:bg-pink-600 text-white p-3 rounded-full shadow-lg transition-transform hover:scale-110"
    >
      <Settings size={24} />
    </button>
  );
}