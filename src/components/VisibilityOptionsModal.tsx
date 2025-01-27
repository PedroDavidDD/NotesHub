import React from 'react'
import { theme } from '../css/theme'
import { X } from 'lucide-react'

export const VisibilityOptionsModal = ({
    handleVisibleCancel,
    handleConfirmDelete,
    isVisibleHidden,
    hiddenNotes,
    handleSeeNotes,
}) => {

  return (
    <div className="z-10 absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">                
        <div className="relative bg-white p-12 rounded-lg shadow-lg text-center">
            <button
                onClick={handleVisibleCancel}
                className={`absolute top-2 right-2 p-2 rounded-full transition-colors text-[${theme.colors.common.white}] hover:border-white`}
                style={{
                    backgroundColor: theme.navbar.background
                }}
            >
                <X size={20} />
            </button>
            <p className="text-2xl text-black">Opciones de visualización:</p>
            <div className="mt-4 flex flex-col gap-3">
                <div className="w-full flex items-center gap-5">
                    <button
                        onClick={handleConfirmDelete}
                        className="w-10/12 px-4 py-2 text-white rounded-lg border-none"
                        style={{
                            backgroundColor: !isVisibleHidden ? theme.colors.floodlight.on : theme.colors.floodlight.off,
                        }}
                    >
                    { isVisibleHidden ? 'Ver ocultos' : 'Ver visibles' }
                    </button>
                    <span 
                        className="w-2/12 py-[0.20rem] text-xl text-black border-2 border-solid rounded-lg select-none"
                        style={{
                        borderColor: !isVisibleHidden ? theme.colors.floodlight.on : theme.colors.floodlight.off,
                        backgroundColor: !isVisibleHidden ? theme.colors.floodlight.on : theme.colors.floodlight.off,
                        color: theme.colors.common.white,
                        }}
                    >
                        { hiddenNotes.length }
                    </span>
                </div>
                <button
                    onClick={handleSeeNotes}
                    className="w-full px-4 py-2 bg-red-600 text-white rounded-lg border-none"
                >
                    Ocultar todo
                </button>
            </div>
        </div>
    </div>
  )
}
