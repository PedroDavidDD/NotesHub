import React, { useState } from 'react'
import { BookOpenText, Clock, Edit, Trash2, Zap } from 'lucide-react';
import type { ScheduleBox as ScheduleBoxType } from '../types/schedule';

import { ParticleEffect } from './ParticleEffect';
import { theme } from '../css/theme';
import { formatDate } from '../utils/dataUtils';
import { useDispatch } from 'react-redux';
import { setStateNote } from '../redux/notesSlice';

interface ScheduleBoxProps {
  box: ScheduleBoxType;
  boxStyle: string;
  handleOpen: any;

  onEdit: (box: ScheduleBoxType) => void;
  onDelete: (id: string) => void;
  onDragStart: (e: React.DragEvent, box: ScheduleBoxType) => void;
  onDragEnd: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent, box: ScheduleBoxType) => void;
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
  onDragEnd, 
  onDragOver, 
  onDrop,

  isDragging,
 }: ScheduleBoxProps) => {
  const dispatch = useDispatch();

  const [isImageLoading, setIsImageLoading] = useState<boolean>(!!box.image);
  const [isNoteState, setIsNoteState] = useState<boolean>(box.state);
  const [isOpen, setIsOpen] = useState(false);
  
  const backgroundOpacity = box.backgroundOpacity || 0.5;
  
  const handlerStateNote =()=> dispatch(setStateNote(box))
  const handleDelete = () => setIsOpen(true)
  const handleCancel = () => setIsOpen(false)

  const handleConfirmDelete = () => {
    onDelete(box.id);
    setIsOpen(false);
  };

  return (
    <div 
      key={ box.id } 
      onClick={ (e) => handleOpen( box.id ) }

      draggable
      onDragStart={(e) => onDragStart(e, box)}
      onDragEnd={onDragEnd}
      onDragOver={(e) => onDragOver(e, box)}
      onDrop={(e) => onDrop(e, box)}

      className={`note grid-item ${boxStyle} relative group rounded-lg p-6 cursor-pointer transition-all duration-300 ease-in-out overflow-hidden
        ${isDragging ? 'scale-105 opacity-50 rotate-2 dragging' : 'scale-100 opacity-100 rotate-0'}
        hover:scale-[1.02]`}
      style={{ 
        backgroundColor: box.backgroundColor,
        border:`${box.borderColor} ${box.borderStyle} ${box.borderWidth}px`,
      }}
    >      
      
      {/* Contenedor de la imagen y gradiente */}
      {box.image && (
        <div className="absolute inset-0 w-full h-full ">
          {/* Imagen de fondo */}
          <img
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              isImageLoading ? 'opacity-0' : 'opacity-100'
            }`}
            src={box.image}
            alt="imagen de nota"
            loading='lazy'
            onLoad={() => setIsImageLoading(false)}
            onError={() => setIsImageLoading(false)}
            style={{
              objectPosition: box.backgroundPosition || 'center',
              objectFit: 'cover', // Ajusta la imagen al contenedor
              filter: 'saturate(120%)',
            }}
          />
        </div>
      )}

      {/* Gradiente sobre la imagen */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,${backgroundOpacity}), rgba(0,0,0,${backgroundOpacity}))`,
          zIndex: 1,
        }}
      ></div>

      {/* Contenedor de texto */}
      <div 
        className="z-10 w-full h-full flex flex-col"
        style={{
          alignItems: box.alignItem || "start",
          justifyContent: box.justifyContent || "center",
          color: box.textColor || theme.colors.common.white,
        }}
      >
        <div className={`note__date ${boxStyle} `}><span>{ formatDate(box.date).longFormattedDate }</span></div>
        <div className={`note__title ${boxStyle} `}><span>{ box.title }</span></div>
        <div className={`note__datetime ${boxStyle} `}>
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

      <div className="z-20 absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity space-x-2 flex text-black">          
        <button
          onClick={ (e) => {
            e.stopPropagation()
            handlerStateNote()
          }}
          className={`p-2 rounded-full transition-colors border-black`}
          style={{
            backgroundColor: isNoteState ? theme.colors.floodlight.on : theme.colors.floodlight.off,
          }}
        >
          <Zap 
            size={16} 
            color={theme.colors.common.black}
          />
        </button>
        <button
          onClick={ (e) => {            
            e.stopPropagation()
            handleOpen( box.id )
          }}
          className="p-2 bg-white text-black rounded-full transition-colors border-black"
        >
          <BookOpenText size={16} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onEdit(box)
          }}
          className="p-2 bg-white text-black rounded-full transition-colors border-black"
        >
          <Edit size={16} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation()
            handleDelete(); 
          }}
          className="p-2 bg-white text-black rounded-full transition-colors border-black"
        >
          <Trash2 size={16} />
        </button>
        {/* <DeleteBox onDelete={onDelete} boxId={box.id} /> */}
      </div>

      { box.particleState && (<ParticleEffect color={box.particleColor} />) }

      {/* Decoracion de bordes */}
      <div className={`z-10 absolute top-2 left-2 w-8 h-8 rounded-tl-lg opacity-80`}
      style={{ 
        borderColor: box.accentColor,
        borderTopWidth: `${box.accentBorderWidth}px`,
        borderLeftWidth: `${box.accentBorderWidth}px`,
      }} />
      <div className={`z-10 absolute top-2 right-2 w-8 h-8 rounded-tr-lg opacity-80`}
      style={{ 
        borderColor: box.accentColor,        
        borderTopWidth: `${box.accentBorderWidth}px`,
        borderRightWidth: `${box.accentBorderWidth}px`,        
      }} />
      <div className={`z-10 absolute bottom-2 left-2 w-8 h-8 rounded-bl-lg opacity-80`}
      style={{ 
        borderColor: box.accentColor,        
        borderBottomWidth: `${box.accentBorderWidth}px`,
        borderLeftWidth: `${box.accentBorderWidth}px`,        
      }} />
      <div className={`z-10 absolute bottom-2 right-2 w-8 h-8 rounded-br-lg opacity-80`}
      style={{ 
        borderColor: box.accentColor,        
        borderBottomWidth: `${box.accentBorderWidth}px`,
        borderRightWidth: `${box.accentBorderWidth}px`,        
      }} />   
      
      {/* Panel de confirmación */}
      {isOpen && (
          <div className="z-10 absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg shadow-lg text-center text-black">
              <p>¿Estás seguro de eliminar?</p>
              <div className="mt-4 flex">
                <button
                  onClick={ (e) => {
                    e.stopPropagation()
                    handleConfirmDelete()
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 mr-4 border-none"
                >
                  Eliminar
                </button>
                <button
                  onClick={ (e) => {
                    e.stopPropagation()
                    handleCancel()
                  }}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 border-none"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  )
}
