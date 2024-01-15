import React from 'react'
import { listNotes } from '../Scripts/listNotes'

export const Notes = ({ id, date, title, time, boxStyle}) => {

  const handleSeeMore = (e)=> {
    e.preventDefault();

    const idOrigen = listNotes.find((it) => it.id === id)

    const TODO_CURRENT = "[add]".toLocaleLowerCase()
    
    if ( id === idOrigen.id && idOrigen.title.toLocaleLowerCase().includes(TODO_CURRENT) ) {
      console.log(idOrigen.title.toLocaleLowerCase());

    } else if (id === idOrigen.id) {
      console.log(idOrigen.id);

    }
  }

  return (
    <div className={`note grid-item ${boxStyle}`} key={ id } onClick={handleSeeMore}>
        <span className={`note__date ${boxStyle}`}><h3>{ date }</h3></span>
        <span className={`note__title ${boxStyle}`}><h2>{ title }</h2></span>
        <span className={`note__datetime ${boxStyle}`}><h3>{ time }</h3></span>

        <div className={`plus icon ${boxStyle}`}></div>
    </div>
  )
}
