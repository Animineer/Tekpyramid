import React from 'react'

export const Student = (props) => {
  return (
    <div>
        <p>{props.name}</p>
        <p>{props.age}</p>
        <p>{props.isStudent}</p>
        </div>
  )
}
