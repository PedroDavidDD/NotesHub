import React from 'react';
import { X } from 'lucide-react';
import type { ScheduleBox } from '../types/schedule';
import { theme } from '../css/theme';

interface ScheduleFormProps {
  box: Omit<ScheduleBox, 'id' | 'order'>;
  onSubmit: () => void;
  onChange: (field: string, value: string | boolean) => void;
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
            {isEditing ? 'Editar Nota' : 'Agregar Nueva Nota'}
          </h2>
          {/* <input 
            id="001"  
            type="checkbox" 
            name="state" 
            checked={ true }
            className={`w-7`}
          /> */}
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1"
            style={{color: theme.form.button }}>Fecha</label>
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
            style={{color: theme.form.button }}>Título</label>
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
            style={{color: theme.form.button }}>Hora</label>
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
            <div className='flex gap-5'>
              <input
                type="color"
                value={box.backgroundColor}
                onChange={(e) => onChange('backgroundColor', e.target.value)}
                className="w-full h-10 rounded cursor-pointer"
              />
              <select
                  value={box.backgroundPosition || 'center'}
                  onChange={(e) => onChange('backgroundPosition', e.target.value)}
                  className="w-full rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white"
                  style={{
                    background: theme.form.input,
                  }}
                >
                  <option value="top">Superior</option>
                  <option value="center">Centro</option>
                  <option value="bottom">Inferior</option>
                </select>
            </div>
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
            <div className='flex justify-between'>
              <input
                type="color"
                value={box.particleColor}
                onChange={(e) => onChange('particleColor', e.target.value)}
                className="w-full h-10 rounded cursor-pointer"
              />
              <input 
                  id="001"  
                  type="checkbox" 
                  name="particleState" 
                  checked={ box.particleState || false }
                  onChange={(e) => onChange('particleState', e.target.checked)}
                  className={`w-10 ml-5`}
                />
            </div>
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
            <label className="block text-sm mb-1">Alineación del Texto (H-V)</label>
            <div className='flex gap-5'>
              <select
                value={box.alignItem || 'start'}
                onChange={(e) => onChange('alignItem', e.target.value)}
                className="w-full rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white"
                style={{
                  background: theme.form.input,
                }}
              >
                <option value="start">Izquierda</option>
                <option value="center">Centro</option>
                <option value="end">Derecha</option>
              </select>
              <select
                value={box.justifyContent || 'center'}
                onChange={(e) => onChange('justifyContent', e.target.value)}
                className="w-full rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white"
                style={{
                  background: theme.form.input,
                }}
              >
                <option value="start">Superior</option>
                <option value="center">Centro</option>
                <option value="end">Inferior</option>
                <option value="space-around">Space-around</option>
                <option value="space-between">Space-between</option>
                <option value="space-evenly">Space-evenly</option>
              </select>
            </div>
          </div>
          
          <button
            onClick={onSubmit}
            className="w-full text-white font-bold py-2 px-4 rounded transition-colors hover:border-white"
            style={{
              background: theme.navbar.background,
            }}
          >
            {isEditing ? 'Guardar Cambios' : 'Agregar Nota'}
          </button>
        </div>
      </div>
    </div>
  );
}