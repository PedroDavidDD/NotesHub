import React from 'react'

export const Notes = ({ id, date, title, time }) => {
  return (
    <div className="note grid-item" key={ id }>
        <span className="note__date"><h3>{ date }</h3></span>
        <span className="note__title"><h2>{ title }</h2></span>
        <span className="note__datetime"><h3>{ time }</h3></span>
    </div>
  )
}
