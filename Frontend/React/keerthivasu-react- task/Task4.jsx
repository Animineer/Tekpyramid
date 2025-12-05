// Build the counter app using useState and also by using useReducer

import React, { useReducer } from 'react'

function Task4() {
       const [val,disp]=useReducer(red,0);
    function red(val,act) {
    return ([act.pl])
    }

  return (
    <div>
        <button onClick={()=>disp({type:'add',pl:Number(val)+1})}>add</button>
        <h3>{val}</h3>
        <button onClick={()=>disp({type:'sub',pl:val-1})}>sub</button>
    </div>
  )
}

export default Task4