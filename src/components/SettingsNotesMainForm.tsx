import React from 'react';
import { X } from 'lucide-react';
import { theme } from '../css/theme';
import { useSelector } from 'react-redux';
import { selectBackgroundNotes } from '../redux/notesSlice';
import { validateImage } from '../utils/minificador';

interface SettingsNotesMainForm {
  onBgChange: (field: string, value: string) => void;
  isVisible: boolean;
  onClose: () => void;
}

export function SettingsNotesMainForm({ onBgChange, isVisible, onClose }: SettingsNotesMainForm) {

  const bgData = useSelector( selectBackgroundNotes );

  return (
    <div className={`w-full h-full z-10 fixed bottom-0 left-0 right-0 transition-transform duration-300 ease-in-out ${
      isVisible ? 'translate-y-0' : 'translate-y-full'
    } overflow-y-auto max-h-screen`}
    style={{
      background: theme.transparent[90],
      color: theme.colors.common.white,      
    }}
    >
      <div className="max-w-md mx-auto p-6">
        <button
          onClick={onClose}
          className={`absolute top-6 right-6 p-2 rounded-full transition-colors text-[${theme.colors.common.white}] hover:border-white`}
          style={{
            backgroundColor: theme.navbar.background
          }}
        >
          <X size={20} />
        </button>
        
        <div className='flex justify-between'>
          <h2 className="text-2xl font-bold mb-4"
            style={{
              color: theme.navbar.background,
            }}
          >
            Configuraciones
          </h2>
        </div>
        
        <div className="space-y-4"> 

          <div className='text-white'>
            <label className="block mb-1"
            style={{
              color: theme.navbar.background
            }}
            >Fondo de pantalla</label>
            <label className="block text-sm mb-1">Background color - Imagen de Fondo (URL) - Tamaño</label>
            <div className='flex gap-5'>
              <input
                type="color"
                value={bgData.color || ''}
                onChange={(e) => onBgChange('color', e.target.value)}
                className="w-full h-10 rounded cursor-pointer"
              />
              <input
                type="url"
                value={bgData.image || ''}
                onChange={async (e) => {
                  const url = e.target.value;
                  const isValid = await validateImage(url);
                  if (isValid) {
                    onBgChange('image', url);
                  }
                }}
                className="w-full rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="https://ejemplo.com/imagen.jpg"
                style={{
                  background: theme.form.input,
                }}
              />                
              <select
                value={bgData.size || ''}
                onChange={(e) => onBgChange('size', e.target.value)}
                className="w-full rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white"
                style={{
                  background: theme.form.input,
                }}
              >
                <option value="contain">Contain</option>
                <option value="cover">Cover</option>
              </select>
            </div>
          </div>
          
          <div className='text-white'>
            <label className="block mb-1"
            style={{
              color: theme.navbar.background
            }}
            >Navegador</label>
            <label className="block text-sm mb-1">Background color - Color de texto - Color de iconos</label>
            <div className='flex gap-5'>
              <input
                type="color"
                value={bgData.nav.backgroundColor || ''}
                onChange={(e) => onBgChange('nav.backgroundColor', e.target.value)}
                className="w-full h-10 rounded cursor-pointer"
              />
              <input
                type="color"
                value={bgData.nav.textColor || ''}
                onChange={(e) => onBgChange('nav.textColor', e.target.value)}
                className="w-full h-10 rounded cursor-pointer"
              />
              <input
                type="color"
                value={bgData.nav.colorIcons || ''}
                onChange={(e) => onBgChange('nav.colorIcons', e.target.value)}
                className="w-full h-10 rounded cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}