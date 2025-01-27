import React from 'react'
import { theme } from '../css/theme'
import { X } from 'lucide-react'

export const ButtonClose = ({ onClose }) => {
  return (
    <button
        onClick={onClose}
        className={`absolute top-6 right-6 p-2 rounded-full transition-colors text-[${theme.colors.common.white}] hover:border-white`}
        style={{
        backgroundColor: theme.navbar.background
        }}
    >
        <X size={20} />
    </button>
  )
}
