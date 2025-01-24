import React, { useCallback, useRef, useState } from 'react';
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

  const settingsMain = useSelector( selectBackgroundNotes );

  const [currentUrl, setCurrentUrl] = useState<string>(settingsMain.image || ''); // Para manejar el valor del input
  const [isValidImageUrl, setIsValidImageUrl] = useState<boolean | null>(null); // null -> aún no validado, true/false -> validado

   // Manejar el cambio del input URL
  const handleUrlChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setCurrentUrl(newUrl);
    setIsValidImageUrl(null); // Resetear el estado mientras se escribe
  }, []);

  // Validar la URL
  const validateUrl = useCallback(async () => {
    if (currentUrl.trim() === '') {
      setIsValidImageUrl(null); // No hay URL para validar
      onBgChange('image', '');
      return;
    }

    const isValid = await validateImage(currentUrl);
    setIsValidImageUrl(isValid);

    if (isValid) onBgChange('image', currentUrl);
    
  }, [currentUrl]);

  const validationStates = {
    "true": {
      color: 'green',
      message: 'URL válida.',
    },
    "false": {
      color: 'red',
      message: 'URL no válida.',
    },
    "null": {
      color: 'yellow',
      message: 'Validando URL...',
    },
  };
  
  const validationState = currentUrl.trim() ? validationStates[String(isValidImageUrl)] : null;

  return (
    <div className={`w-full h-full z-10 fixed bottom-0 left-0 right-0 transition-transform duration-300 ease-in-out ${
      isVisible ? 'translate-y-0' : 'translate-y-full'
    } overflow-y-auto max-h-screen`}
    style={{
      background: theme.transparent[90],
      color: theme.colors.common.white,      
    }}
    >
      <div className="max-w-md mx-auto py-6">
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
                value={settingsMain.color || ''}
                onChange={(e) => onBgChange('color', e.target.value)}
                className="w-full h-10 rounded cursor-pointer"
              />
              <input
                type="url"
                value={currentUrl}
                onChange={handleUrlChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') validateUrl();
                }}
                className="w-full rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="https://ejemplo.com/imagen.jpg"
                style={{
                  background: theme.form.input,
                }}
              />
              <button
                onClick={validateUrl}
                className={`
                  px-4 py-2 rounded transition-colors hover:border-transparent
                  ${validationState ? `bg-${validationState.color}-500 hover:bg-${validationState.color}-600` : 'bg-gray-500 hover:bg-gray-600'}
                  text-black
                `}
              >
                Validar
              </button>

              <select
                value={settingsMain.size || ''}
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
                value={settingsMain.nav.backgroundColor || ''}
                onChange={(e) => onBgChange('nav.backgroundColor', e.target.value)}
                className="w-full h-10 rounded cursor-pointer"
              />
              <input
                type="color"
                value={settingsMain.nav.textColor || ''}
                onChange={(e) => onBgChange('nav.textColor', e.target.value)}
                className="w-full h-10 rounded cursor-pointer"
              />
              <input
                type="color"
                value={settingsMain.nav.colorIcons || ''}
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