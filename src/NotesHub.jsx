import React from "react";
import {DndContext, closestCenter} from '@dnd-kit/core'
import { listNotes } from './Scripts/listNotes'

import './NotesHub.css'
import './Scripts/listNotes'

function NotesHub() {

  return (
    <>
      <div className="container">
        <div className="head">
          <span className="title">
            <h2>horarios de stream</h2>
            <span>//</span>
            <h2>Semana del 17/12/2023 al 23/12/2023</h2>
          </span>
        </div>
        <div className="body">
          {
            listNotes.map( ({ id, date, title, time }) => {
              
              return (
                <div className="notes grid-item" key={ id }>
                  <span className="notes__date"><h3>{ date }</h3></span>
                  <span className="notes__title"><h2>{ title }</h2></span>
                  <span className="notes__datetime"><h3>{ time }</h3></span>
                </div>
                )
            })
          }
        </div>

      </div>
    </>
  )
}

export default NotesHub