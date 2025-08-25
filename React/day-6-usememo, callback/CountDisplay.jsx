import React from 'react'

const CountDisplay = (prop) => {
    console.log("CountDisplay Re-renders")
  return (
    <div>
      <h1>this is in prop:- {prop.count}</h1>
    </div>
  )
}

export default CountDisplay
