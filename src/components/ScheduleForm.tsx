import React from 'react';
import { X } from 'lucide-react';
import type { ScheduleBox } from '../types/schedule';
import { theme } from '../css/theme';

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
    <div className={`w-full h-full z-10 fixed bottom-0 left-0 right-0 transition-transform duration-300 ease-in-out ${
      isVisible ? 'translate-y-0' : 'translate-y-full'
    } overflow-y-auto max-h-screen`}
    style={{
      background: theme.transparent[80],
      color: theme.colors.common.white,      
    }}
    >
      <div className="max-w-md mx-auto p-6">
        <button
          onClick={onClose}
          className={`absolute top-6 right-6 p-6 rounded-full transition-colors text-[${theme.colors.common.white}]`}
          style={{
            backgroundColor: theme.form.button
          }}
        >
          <X size={20} />
        </button>
        
        <h2 className="text-2xl font-bold mb-4"
          style={{
            color: theme.form.button,
          }}
        >
          {isEditing ? 'Editar Nota' : 'Agregar Nueva Nota'}
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1"
            style={{color: theme.colors.error }}>Fecha</label>
            <input
              type="date"
              value={box.date}
              onChange={(e) => onChange('date', e.target.value)}
              className="w-full rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="LUN"
              style={{
                background: theme.form.input,
              }}
            />
          </div>

          <div>
            <label className="block text-sm mb-1"
            style={{color: theme.colors.error }}>Título</label>
            <input
              type="text"
              value={box.title}
              onChange={(e) => onChange('title', e.target.value)}
              className="w-full rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Nombre del Stream"
              style={{
                background: theme.form.input,
              }}
            />
          </div>
          
          <div>
            <label className="block text-sm mb-1">Descripción</label>
            <textarea
              value={box.description || ''}
              onChange={(e) => onChange('description', e.target.value)}
              className="w-full rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Descripción del stream..."
              rows={3}
              style={{
                background: theme.form.input,
              }}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Tags (separados por coma)</label>
            <input
              type="text"
              value={box.tags?.join(', ') || ''}
              onChange={(e) => onChange('tags', e.target.value)}
              className="w-full rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="juegos, terror, aventura"
              style={{
                background: theme.form.input,
              }}
            />
          </div>
          
          <div>
            <label className="block text-sm mb-1"
            style={{color: theme.colors.error }}>Hora</label>
            <input
              type="text"
              value={box.time}
              onChange={(e) => onChange('time', e.target.value)}
              className="w-full rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="5PM CDMX"
              style={{
                background: theme.form.input,
              }}
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
            <label className="block text-sm mb-1">Opacidad del Fondo</label>
            <div className='flex gap-5'>
              <input
                type="range"
                min="0"
                max="100"
                value={Math.round((box.backgroundOpacity || 0.5) * 100)}
                onChange={(e) => onChange('backgroundOpacity', (parseInt(e.target.value) / 100).toString())}
                className="w-full"
              />
              <span>{ Math.round((box.backgroundOpacity || 0.5) * 100) }</span>
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Border</label>
            <div className='flex gap-5'>
              <input
                type="color"
                value={box.borderColor}
                onChange={(e) => onChange('borderColor', e.target.value)}
                className="w-full h-10 rounded cursor-pointer"
              />
              <select
                value={box.borderStyle || 'left'}
                onChange={(e) => onChange('borderStyle', e.target.value)}
                className="w-full rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white"
                style={{
                  background: theme.form.input,
                }}
              >
                <option value="solid">solid</option>
                <option value="dotted">dotted</option>
                <option value="dashed">dashed</option>
              </select>
              <input
                type="number"
                value={box.borderWidth}
                min={0}
                max={10}
                onChange={(e) => onChange('borderWidth', e.target.value)}
                className="w-full rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="Tamaño"                
                style={{
                  background: theme.form.input,
                }}
              />
              
            </div>
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
              className="w-full rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="https://ejemplo.com/imagen.jpg"
              style={{
                background: theme.form.input,
              }}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Alineación del Texto</label>
            <select
              value={box.textAlign || 'left'}
              onChange={(e) => onChange('textAlign', e.target.value)}
              className="w-full rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white"
              style={{
                background: theme.form.input,
              }}
            >
              <option value="left">Izquierda</option>
              <option value="center">Centro</option>
              <option value="right">Derecha</option>
            </select>
          </div>
          
          <button
            onClick={onSubmit}
            className="w-full text-white font-bold py-2 px-4 rounded transition-colors hover:border-white"
            style={{
              background: theme.form.button,
            }}
          >
            {isEditing ? 'Guardar Cambios' : 'Agregar Nota'}
          </button>
        </div>
      </div>
    </div>
  );
}