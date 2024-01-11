import React, { useState } from "react";
import {DndContext, closestCenter} from '@dnd-kit/core'
import { listNotes } from './Scripts/listNotes'

import './NotesHub.css'
import './Scripts/listNotes'
import { Notes } from "./components/Notes";

function NotesHub() {

  const stateNotes = {
    box: 'typeBox',
    large: 'typeDescompressed',
    compressed: 'typeCompressed',
  }

  const [boxStyle, setBoxStyle] = useState(stateNotes.box); 

  return (
    <>
      <div className="background">

        <div className="box">

          <div className="box__calendar"> 

            <div className="calendar__title" >
                <div className="calendar__title__text">
                  <h2>horarios de stream</h2> 
                  <h2>semana del 17/12/2023 al 23/12/2023</h2>
                </div>
                <div className="icons">
                  <span className="icon--first" onClick={() => setBoxStyle(stateNotes.box)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-apps-filled" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <path d="M9 3h-4a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2z" stroke-width="0" fill="currentColor" />
                      <path d="M9 13h-4a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2z" stroke-width="0" fill="currentColor" />
                      <path d="M19 13h-4a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2z" stroke-width="0" fill="currentColor" />
                      <path d="M17 3a1 1 0 0 1 .993 .883l.007 .117v2h2a1 1 0 0 1 .117 1.993l-.117 .007h-2v2a1 1 0 0 1 -1.993 .117l-.007 -.117v-2h-2a1 1 0 0 1 -.117 -1.993l.117 -.007h2v-2a1 1 0 0 1 1 -1z" stroke-width="0" fill="currentColor" />
                    </svg>
                  </span>
                  <span className="icon--second" onClick={() => setBoxStyle(stateNotes.large)}>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-battery-4" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <path d="M6 7h11a2 2 0 0 1 2 2v.5a.5 .5 0 0 0 .5 .5a.5 .5 0 0 1 .5 .5v3a.5 .5 0 0 1 -.5 .5a.5 .5 0 0 0 -.5 .5v.5a2 2 0 0 1 -2 2h-11a2 2 0 0 1 -2 -2v-6a2 2 0 0 1 2 -2" />
                      <path d="M7 10l0 4" />
                      <path d="M10 10l0 4" />
                      <path d="M13 10l0 4" />
                      <path d="M16 10l0 4" />
                    </svg>                  */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-columns-3" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <path d="M3 3m0 1a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v16a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1zm6 -1v18m6 -18v18" />
                    </svg>
                  </span>
                  <span className="icon--third" onClick={() => setBoxStyle(stateNotes.compressed)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-columns" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <path d="M4 6l5.5 0" />
                      <path d="M4 10l5.5 0" />
                      <path d="M4 14l5.5 0" />
                      <path d="M4 18l5.5 0" />
                      <path d="M14.5 6l5.5 0" />
                      <path d="M14.5 10l5.5 0" />
                      <path d="M14.5 14l5.5 0" />
                      <path d="M14.5 18l5.5 0" />
                    </svg>
                  </span>
                </div>
            </div>

            <div className={`calendar__notes ${boxStyle}`}>
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