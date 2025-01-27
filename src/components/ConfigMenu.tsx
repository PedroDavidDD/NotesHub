import React, { useRef } from 'react';
import { Save, Download, Upload, PaintbrushVertical } from 'lucide-react';
import type { ScheduleBox, SettingsNotesMain } from '../types/schedule';
import { storage } from '../utils/storage';
import { theme } from '../css/theme';
import { useSelector } from 'react-redux';
import { selectBackgroundNotes } from '../redux/notesSlice';
import { ButtonClose } from './ButtonClose';

interface ConfigMenuProps {
  boxes: ScheduleBox[];
  onImport: (boxes: ScheduleBox[], background: SettingsNotesMain) => void;
  onBgChange: (key: string, value: string ) => void;
  isVisible: boolean;
  onClose: () => void;
  handleSettingsNotesMain: () => void;
}

export function ConfigMenu({ 
  boxes,
  onImport, 
  onBgChange, 
  isVisible, 
  onClose,
  handleSettingsNotesMain,
  }: ConfigMenuProps) {

  const bgData = useSelector( selectBackgroundNotes );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    storage.save(boxes, bgData);
    alert('Notas guardadas');
  };

  const handleExport = () => {
    storage.exportToFile(boxes, bgData);
    alert('Notas descargadas');
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
  
    try {
      const { listNotes, background } = await storage.importFromFile(file);
      onImport(listNotes, background);
  
      alert('Datos importados exitosamente');
    } catch (error) {
      alert('Error al importar el archivo');
    }
  
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`z-10 fixed bottom-0 left-0 right-0 transition-transform duration-300 ease-in-out ${
      isVisible ? 'translate-y-0' : 'translate-y-full'
    }`}
    style={{
      background: theme.colors.common.black,
    }}
    >
      <div className="max-w-md mx-auto p-6">
        <ButtonClose onClose={ onClose } />

        <h2 className="text-2xl font-bold mb-6"
        style={{
          color: theme.navbar.background,
        }}
        >Gestión de Datos</h2>

        <div className="space-y-4">

          <button
            onClick={handleSettingsNotesMain}
            className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white p-3 rounded transition-colors hover:border-white"
          >
            <PaintbrushVertical size={20} />
            Abrir configuraciones
          </button>

          <button
            onClick={handleSave}
            className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded transition-colors hover:border-white"
          >
            <Save size={20} />
            Guardar en Almacenamiento Local
          </button>

          <button
            onClick={handleExport}
            className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white p-3 rounded transition-colors hover:border-white"
          >
            <Download size={20} />
            Descargar Nota
          </button>

          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".txt"
              onChange={handleImport}
              className="hidden"
              id="file-input"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 text-white p-3 rounded transition-colors hover:border-white"
            >
              <Upload size={20} />
              Importar Nota
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}