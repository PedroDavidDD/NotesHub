import React from 'react'
import { listNotes } from '../Scripts/listNotes'

export const Notes = ({ id, date, title, time, boxStyle, handleOpen }) => {

  return (
    <div 
      className={`note grid-item ${boxStyle}`} 
      key={ id } 
      onClick={ (e) => handleOpen( id ) }
    >
        <span className={`note__date ${boxStyle}`}><h3>{ date }</h3></span>
        <span className={`note__title ${boxStyle}`}><h2>{ title }</h2></span>
        <span className={`note__datetime ${boxStyle}`}><h3>{ time }</h3></span>

        <div className={`plus icon ${boxStyle}`}></div>
    </div>
  )
}
