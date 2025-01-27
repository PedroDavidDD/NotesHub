import React from 'react';
import { Settings } from 'lucide-react';
import { selectBackgroundNotes } from '../redux/notesSlice';
import { useSelector } from 'react-redux';

interface ConfigButtonProps {
  onClick: () => void;
}

export function ConfigButton({ onClick }: ConfigButtonProps) {
  
  const settingsMain = useSelector( selectBackgroundNotes );

  return (
    <button
      onClick={onClick}
      className="z-10 fixed bottom-6 right-6 p-3 rounded-full shadow-lg transition-transform hover:scale-110 hover:border-white"
      style={{
        backgroundColor: settingsMain.nav.textColor,
        color: settingsMain.nav.colorIcons,
      }}
    >
      <Settings size={24} />
    </button>
  );
}