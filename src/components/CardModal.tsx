import React from 'react'
import { ScheduleBox as ScheduleBoxType } from '../types/schedule';

import { X, Tag, Calendar, Clock } from 'lucide-react';
    
    interface CardModalBoxProps {
        open: boolean;
        box: ScheduleBoxType;
        handleClose: () => void;
        stateNotes: {
            box: string,
            large: string,
            compressed: string,
        }
    }

export const CardModal =({ 
    open, 
    handleClose, 
    box, 
    stateNotes
}: CardModalBoxProps )=> {
    if (!open) return null;

    function isValidURL(str: string | undefined): boolean {
        if (!str) return false; // Si es undefined o null, no es válido
      
        try {
          new URL(str); // Intenta crear una URL con el valor dado
          return true; // Si no lanza un error, es una URL válida
        } catch (_) {
          return false; // Si lanza un error, no es una URL válida
        }
      }
      
    return (
        <>            
            <div
                onDoubleClick={handleClose}
                className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
            >
                <div 
                    className={`relative max-w-2xl w-full bg-gradient-to-b rounded-xl overflow-hidden shadow-2xl`}
                    style={{
                        background: box.image,
                    }}
                >
                    {/* Header image: Solo se renderiza si es una URL válida */}
                    {isValidURL(box.image) && (
                        <div className="h-48 relative flex ">
                            <img 
                                src={box.image} 
                                alt={box.title || "Image"}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-transparent" />
                            
                            <button
                                onClick={handleClose}
                                className="absolute p-2 right-2 top-2 bg-black/20 hover:bg-black/40 hover:border-transparent transition-colors backdrop-blur-sm rounded-full"
                            >
                                <X size={20} className="text-white" />
                            </button>
                        </div>
                    )}
                    {/* Content */}
                    <div className="p-6 space-y-6">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold text-pink-400">
                            {box.title}
                            </h2>
                            <div className="flex flex-wrap gap-4">
                            <div className="flex items-center text-pink-300/80">
                                <Calendar size={16} className="mr-2" />
                                <span>{box.date}</span>
                            </div>
                            <div className="flex items-center text-pink-300/80">
                                <Clock size={16} className="mr-2" />
                                <span>{box.time}</span>
                            </div>
                            </div>
                                                            
                            {/* <button
                                onClick={handleClose}
                                className="p-2 bg-black/20 hover:bg-black/40 rounded-full transition-colors backdrop-blur-sm"
                            >
                                <X size={20} className="text-white" />
                            </button> */}
                        </div>

                        {/* Description */}
                        {box.description && (
                            <p className="text-white/80 leading-relaxed">
                            {box.description}
                            </p>
                        )}

                        {/* Tags */}
                        {box.tags && box.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                            {box.tags.map((tag, index) => (
                                <div 
                                key={index}
                                className="flex items-center gap-1 bg-pink-500/20 text-pink-300 px-2 py-1 rounded-full text-sm"
                                >
                                <Tag size={12} />
                                {tag}
                                </div>
                            ))}
                            </div>
                        )}
                    </div>
                        
                                 
                </div>
            </div>

            {/* <Modal
                open={open}
                onClose={handleClose}
            >
                <Box 
                    sx={style}
                    key={ box.id } 
                >
                    
                </Box>
            </Modal> */}
        </>
    )
}
