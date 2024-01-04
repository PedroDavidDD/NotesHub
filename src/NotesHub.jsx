import React from "react";
import {DndContext, closestCenter} from '@dnd-kit/core'
import { listNotes } from './Scripts/listNotes'

import './NotesHub.css'
import './Scripts/listNotes'

function NotesHub() {

  return (
    <>
      <div className="background">


        <div className="box">

          <div className="box__calendar"> 

            <span className="calendar__title">
              <h2>horarios de stream</h2>
              <span>//</span>
              <h2>Semana del 17/12/2023 al 23/12/2023</h2>
            </span>

            <div className="calendar__notes">
              {
                listNotes.map( ({ id, date, title, time }) => {
                  
                  return (
                    <div className="note grid-item" key={ id }>
                      <span className="note__date"><h3>{ date }</h3></span>
                      <span className="note__title"><h2>{ title }</h2></span>
                      <span className="note__datetime"><h3>{ time }</h3></span>
                    </div>
                    )
                })
              }
            </div>
            
          </div>

        </div>

      </div>
    </>
  )
}

export default NotesHub