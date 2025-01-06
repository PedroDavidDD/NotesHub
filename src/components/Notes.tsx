import React from 'react'
import { listNotes } from '../Scripts/listNotes'
import { Clock, Edit, Trash2 } from 'lucide-react';
import type { ScheduleBox as ScheduleBoxType } from '../types/schedule';



interface ScheduleBoxProps {
  box: ScheduleBoxType;
  boxStyle: any;
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
      className={`note grid-item ${boxStyle}`} 
      key={ box.id } 
      // onClick={ (e) => handleOpen( box.id ) }
      
      draggable
      onDragStart={(e) => onDragStart(e, box)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, box)}      
    >
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity space-x-2">
        <button
          onClick={() => onEdit(box)}
          className="p-1 hover:bg-blue-500 rounded-full transition-colors"
        >
          <Edit size={16} />
        </button>
        <button
          onClick={() => onDelete(box.id)}
          className="p-1 hover:bg-red-500 rounded-full transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <span className={`note__date ${boxStyle}`}>{ box.date }</span>
      <span className={`note__title ${boxStyle}`}>{ box.title }</span>
      <span className={`note__datetime ${boxStyle}`}>
        <Clock size={14} className="mr-1" />
        {box.time}
      </span>

      <div className={`plus icon ${boxStyle}`}></div>
    </div>
  )
}
