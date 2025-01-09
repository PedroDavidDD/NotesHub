import React from 'react';
import { X } from 'lucide-react';
import type { ScheduleBox } from '../types/schedule';

interface ScheduleFormProps {
  box: Omit<ScheduleBox, 'id' | 'order'>;
  onSubmit: () => void;
  onChange: (field: string, value: string) => void;
  isEditing: boolean;
  isVisible: boolean;
  onClose: () => void;
}

export function ScheduleForm({ box, onSubmit, onChange, isEditing, isVisible, onClose }: ScheduleFormProps) {



  return (
    <div className={`text-white z-10 fixed bottom-0 left-0 right-0 bg-[#2a0136] transition-transform duration-300 ease-in-out ${
      isVisible ? 'translate-y-0' : 'translate-y-full'
    } overflow-y-auto max-h-screen`}>
      <div className="max-w-md mx-auto p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-[#3a0146] rounded-full transition-colors"
        >
          <X size={20} />
        </button>
        
        <h2 className="text-2xl font-bold mb-4 text-pink-400">
          {isEditing ? 'Editar Horario' : 'Agregar Nuevo Horario'}
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1 text-red-500">Fecha</label>
            <input
              type="date"
              value={box.date}
              onChange={(e) => onChange('date', e.target.value)}
              className="w-full bg-[#3a0146] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="LUN"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-red-500">Título</label>
            <input
              type="text"
              value={box.title}
              onChange={(e) => onChange('title', e.target.value)}
              className="w-full bg-[#3a0146] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Nombre del Stream"
            />
          </div>
          
          <div>
            <label className="block text-sm mb-1">Descripción</label>
            <textarea
              value={box.description || ''}
              onChange={(e) => onChange('description', e.target.value)}
              className="w-full bg-[#3a0146] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Descripción del stream..."
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Tags (separados por coma)</label>
            <input
              type="text"
              value={box.tags?.join(', ') || ''}
              onChange={(e) => onChange('tags', e.target.value)}
              className="w-full bg-[#3a0146] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="juegos, terror, aventura"
            />
          </div>
          
          <div>
            <label className="block text-sm mb-1 text-red-500">Hora</label>
            <input
              type="text"
              value={box.time}
              onChange={(e) => onChange('time', e.target.value)}
              className="w-full bg-[#3a0146] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="5PM CDMX"
            />
          </div>
          
          <div>
            <label className="block text-sm mb-1">Background color</label>
            <input
              type="color"
              value={box.backgroundColor}
              onChange={(e) => onChange('backgroundColor', e.target.value)}
              className="w-full h-10 rounded cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Color del borde</label>
            <input
              type="color"
              value={box.borderColor}
              onChange={(e) => onChange('borderColor', e.target.value)}
              className="w-full h-10 rounded cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Color de marcas</label>
            <input
              type="color"
              value={box.accentColor}
              onChange={(e) => onChange('accentColor', e.target.value)}
              className="w-full h-10 rounded cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Color de partículas</label>
            <input
              type="color"
              value={box.particleColor}
              onChange={(e) => onChange('particleColor', e.target.value)}
              className="w-full h-10 rounded cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Imagen de Fondo (URL)</label>
            <input
              type="url"
              value={box.image || ''}
              onChange={(e) => onChange('image', e.target.value)}
              className="w-full bg-[#3a0146] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="https://ejemplo.com/imagen.jpg"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-red-500">Alineación del Texto</label>
            <select
              value={box.textAlign || 'left'}
              onChange={(e) => onChange('textAlign', e.target.value)}
              className="w-full bg-[#3a0146] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <option value="left">Izquierda</option>
              <option value="center">Centro</option>
              <option value="right">Derecha</option>
            </select>
          </div>
          
          <button
            onClick={onSubmit}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            {isEditing ? 'Guardar Cambios' : 'Agregar Horario'}
          </button>
        </div>
      </div>
    </div>
  );
}