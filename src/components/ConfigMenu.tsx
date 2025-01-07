import React, { useRef } from 'react';
import { Save, Download, Upload, X, Settings } from 'lucide-react';
import type { ScheduleBox } from '../types/schedule';
import { storage } from '../utils/storage';

interface ConfigMenuProps {
  boxes: ScheduleBox[];
  onImport: (boxes: ScheduleBox[]) => void;
  isVisible: boolean;
  onClose: () => void;
  onShowForm: () => void;
}

export function ConfigMenu({ boxes, onImport, isVisible, onClose, onShowForm }: ConfigMenuProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    storage.save(boxes);
    alert('Horario guardado exitosamente');
  };

  const handleExport = () => {
    storage.exportToFile(boxes);
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const importedBoxes = await storage.importFromFile(file);
      onImport(importedBoxes);
      alert('Horario importado exitosamente');
    } catch (error) {
      alert('Error al importar el archivo');
    }
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`z-10 fixed bottom-0 left-0 right-0 bg-[#2a0136] transition-transform duration-300 ease-in-out ${
      isVisible ? 'translate-y-0' : 'translate-y-full'
    }`}>
      <div className="max-w-md mx-auto p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-[#3a0146] rounded-full transition-colors"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-pink-400">Gestión de Datos</h2>

        <div className="space-y-4">
          <button
            onClick={onShowForm}
            className="w-full flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 text-white p-3 rounded transition-colors"
          >
            <Settings size={20} />
            Agregar/Editar Horario
          </button>

          <button
            onClick={handleSave}
            className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded transition-colors"
          >
            <Save size={20} />
            Guardar en Almacenamiento Local
          </button>

          <button
            onClick={handleExport}
            className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white p-3 rounded transition-colors"
          >
            <Download size={20} />
            Descargar Horario
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
              className="w-full flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 text-white p-3 rounded transition-colors"
            >
              <Upload size={20} />
              Importar Horario
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}