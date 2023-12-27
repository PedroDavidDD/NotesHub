import React from "react";
import './NotesHub.css'

function NotesHub() {

  return (
    <>
      <div className="container">
        <div className="head">
          <span className="title">
            <h2>horarios de stream</h2>
            <h2>Semana del 17/12/2023 al 23/12/2023</h2>
          </span>
        </div>
        <div className="body">
          
          <div className="grid-item">
            <span className="notes">
              <span className="date"><h3>Lunes</h3></span>
              <span className="title"><h2>Detroi: Become Human Primera Vez :0</h2></span>
              <span className="datetime"><h3>Miercoles</h3></span>
            </span>
          </div>

        </div>

      </div>
    </>
  )
}

export default NotesHub