import React from "react";
import {DndContext, closestCenter} from '@dnd-kit/core'
import { listNotes } from './Scripts/listNotes'

import './NotesHub.css'
import './Scripts/listNotes'
import { Notes } from "./components/Notes";

function NotesHub() {

  return (
    <>
      <div className="background">

        <div className="box">

          <div className="box__calendar"> 

            <div className="calendar__title">
              <h2>horarios de stream</h2> 
              <h2>semana del 17/12/2023 al 23/12/2023</h2>
            </div>

            <div className="calendar__notes">
              {
                listNotes.map( (data) => {
                  return (
                    <Notes key={data.id}  { ...data } />
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