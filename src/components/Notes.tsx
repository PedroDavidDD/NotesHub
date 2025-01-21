import React, { useEffect, useState } from 'react'
import { BookOpenText, Clock, Edit, Trash2 } from 'lucide-react';
import type { ScheduleBox as ScheduleBoxType } from '../types/schedule';

import { ParticleEffect } from './ParticleEffect';

interface ScheduleBoxProps {
  box: ScheduleBoxType;
  boxStyle: string;
  handleOpen: any;
  onEdit: (box: ScheduleBoxType) => void;
  onDelete: (id: string) => void;
  onDragStart: (e: React.DragEvent, box: ScheduleBoxType) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, box: ScheduleBoxType) => void;
  isDragging: boolean;
}

export const Notes = ({ 
  box, 
  
  boxStyle,   
  handleOpen,

  onEdit, 
  onDelete, 

  onDragStart, 
  onDragOver, 
  onDrop,
  isDragging 
 }: ScheduleBoxProps) => {

  const [isImageLoading, setIsImageLoading] = useState<boolean>(!!box.image);

  const backgroundOpacity = box.backgroundOpacity || 0.5;

  return (
    <div 
      key={ box.id } 
      onClick={ (e) => handleOpen( box.id ) }

      draggable
      onDragStart={(e) => onDragStart(e, box)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, box)}      

      className={`note grid-item ${boxStyle} relative group rounded-lg p-6 cursor-pointer transition-all duration-300 ease-in-out overflow-hidden
        ${isDragging ? 'scale-105 opacity-50 rotate-2' : 'scale-100 opacity-100 rotate-0'}
        hover:scale-[1.02]`}
      style={{ 
        backgroundColor: box.backgroundColor + '33',
        border:`${box.borderColor} ${box.borderStyle} ${box.borderWidth}px`,
      }}
    >      
      
      {/* Contenedor de la imagen y gradiente */}
      {box.image && (
        <div className="absolute inset-0 w-full h-full">
          {/* Imagen de fondo */}
          <img
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              isImageLoading ? 'opacity-0' : 'opacity-100'
            }`}
            src={box.image}
            alt="imagen de nota"
            onLoad={() => setIsImageLoading(false)}
            onError={() => setIsImageLoading(false)}
            style={{
              objectPosition: box.backgroundPosition || 'center',
              objectFit: 'cover', // Ajusta la imagen al contenedor
              filter: 'saturate(120%)',
            }}
          />

          {/* Gradiente sobre la imagen */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,${backgroundOpacity}), rgba(0,0,0,${backgroundOpacity}))`,
              zIndex: 1,
            }}
          ></div>
        </div>
      )}

      {/* Contenedor de texto */}
      <div 
        className="z-20 w-full h-full flex flex-col"
        style={{
          alignItems: box.alignItem || "start",
          justifyContent: box.justifyContent || "center",
        }}
      >
        <div className={`note__date ${boxStyle} text-white`}><span>{ box.date }</span></div>
        <div className={`note__title ${boxStyle} text-white`}><span>{ box.title }</span></div>
        <div className={`note__datetime ${boxStyle} text-white`}>
          <Clock size={14} className="mr-1" />
          { box.time }
        </div>
      </div>

      {/* Spinner de carga */}
      {isImageLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
        </div>
      )}

      <div className="z-20 absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity space-x-2">
        <button
          // onClick={ (e) => handleOpen( box.id ) }
          className="p-2 hover:bg-white rounded-full transition-colors border-black hover:border-black"
        >
          <BookOpenText size={16} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onEdit(box)
          }}
          className="p-2 hover:bg-white rounded-full transition-colors border-black hover:border-black"
        >
          <Edit size={16} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onDelete(box.id)
          }}
          className="p-2 hover:bg-white rounded-full transition-colors border-black hover:border-black"
        >
          <Trash2 size={16} />
        </button>
      </div>

      { box.particleState && (<ParticleEffect color={box.particleColor} />) }

      {/* Decoracion de bordes */}
      <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 rounded-tl-lg opacity-80"
      style={{ borderColor: box.accentColor }} />
      <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 rounded-tr-lg opacity-80"
      style={{ borderColor: box.accentColor }} />
      <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 rounded-bl-lg opacity-80"
      style={{ borderColor: box.accentColor }} />
      <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 rounded-br-lg opacity-80"
      style={{ borderColor: box.accentColor }} />   
    </div>
  )
}
