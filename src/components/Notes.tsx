import React from 'react'
import { listNotes } from '../Scripts/listNotes'
import { Clock, Edit, Trash2 } from 'lucide-react';
import type { ScheduleBox as ScheduleBoxType } from '../types/schedule';



interface ScheduleBoxProps {
  box: ScheduleBoxType;
  boxStyle: string;
  // handleOpen: any;
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
  // handleOpen,

  onEdit, 
  onDelete, 

  onDragStart, 
  onDragOver, 
  onDrop,
  isDragging 
 }: ScheduleBoxProps) => {

  return (
    <div 
      key={ box.id } 
      // onClick={ (e) => handleOpen( box.id ) }
      
      draggable
      onDragStart={(e) => onDragStart(e, box)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, box)}      

      className={`note grid-item ${boxStyle} relative group rounded-lg p-6 cursor-move transition-all duration-300 ease-in-out
        ${isDragging ? 'scale-105 opacity-50 rotate-2' : 'scale-100 opacity-100 rotate-0'}
        hover:scale-102 hover:shadow-lg`}
      style={{ 
        backgroundColor: box.color + '33',
        backgroundImage: box.image ? `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${box.image})` : 'none',
        backgroundRepeat: 'no-repeat', /* No repetir la imagen */
        backgroundPosition: 'center', /* Centrar la imagen */
        backgroundSize: 'cover', /* Ajustar la imagen para cubrir todo el contenedor */
        filter: 'saturate(120%)',
      }}
    >
      <div className="z-10 absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity space-x-2">
        <button
          onClick={() => onEdit(box)}
          className="p-2 hover:bg-white rounded-full transition-colors border-black hover:border-black"
        >
          <Edit size={16} />
        </button>
        <button
          onClick={() => onDelete(box.id)}
          className="p-2 hover:bg-white rounded-full transition-colors border-black hover:border-black"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className={`note__date ${boxStyle}`}><span>{ box.date }</span></div>
      <div className={`note__title ${boxStyle}`}><span>{ box.title }</span></div>
      <div className={`note__datetime ${boxStyle}`}>
        <Clock size={14} className="mr-1" />
        { box.time }
      </div>

      {/* <div className={`plus icon ${boxStyle}`}></div> */}
    </div>
  )
}
