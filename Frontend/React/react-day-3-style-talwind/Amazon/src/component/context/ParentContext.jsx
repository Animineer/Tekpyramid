import React from 'react'
import ChildContext from "./ChildContext"
function ParentContext() {
  return (
    <div>
        <p>parent context</p>

    {/* <ChildContext></ChildContext> */}
    <ChildContext/>
    </div>
  )
}

export default ParentContext