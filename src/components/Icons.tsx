import React from 'react'
import { CirclePlus, Columns3, Eye, EyeOff, Grid3x3, Rows3 } from 'lucide-react'
import { useSelector } from 'react-redux';
import { selectBackgroundNotes } from '../redux/notesSlice';

export const Icons = ({ 
    onShowForm, 
    isNotesVisible, 
    handleVisibleOptions, 
    setBoxStyle,
    setIsNotesVisible,
    stateNotes,
  }) => {
  
    const settingsMain = useSelector( selectBackgroundNotes );
  
    return (
    <div className="icons">
        <CirclePlus                 
            onClick={onShowForm}
            size={35} 
            color={settingsMain.nav.colorIcons}
            className={`hover:scale-110 transition-all duration-300`}
        />
        { isNotesVisible ? (
            <Eye 
            onClick={handleVisibleOptions} 
            size={35} 
            color={settingsMain.nav.colorIcons}
            className={`hover:scale-110 transition-all duration-300`}
            />)
            : (
            <EyeOff 
            onClick={() => setIsNotesVisible( true )} 
            size={35} 
            color={settingsMain.nav.colorIcons}
            className={`hover:scale-110 transition-all duration-300`}
            />)
        }
        <span className="text-white select-none font-bold text-2xl">|</span>
        <Grid3x3 
            onClick={() => setBoxStyle(stateNotes.BOX)} 
            size={35} 
            color={settingsMain.nav.colorIcons}
            className={`hover:scale-110 transition-all duration-300`}
        />
        <Columns3 
            onClick={() => setBoxStyle(stateNotes.LARGE)} 
            size={35} 
            color={settingsMain.nav.colorIcons}
            className={`hover:scale-110 transition-all duration-300`}
        />
        <Rows3 
            onClick={() => setBoxStyle(stateNotes.COMPRESSED)} 
            size={35} 
            color={settingsMain.nav.colorIcons}
            className={`hover:scale-110 transition-all duration-300`}
        />
    </div>
  )
}
