import React, { useState } from 'react'
import { useContext } from 'react'
import { myContext } from './ContextFile'
const GcContext = () => {
    

    const[color,setcolor]=useState("red")

    let mydata=useContext(myContext)

    console.log(mydata) //check- to check whether we are getting some data or not
    function changeColor()
    {

        setcolor(color=="red"?"blue":"red")
    }
  return (
    <div>
        <h1>GcContext</h1>
        {/* we will use state  */}
        <p style={{color:color}}>{mydata.data}</p> 
        <button onClick={changeColor}>change color</button>

    </div>
  )
}

export default GcContext