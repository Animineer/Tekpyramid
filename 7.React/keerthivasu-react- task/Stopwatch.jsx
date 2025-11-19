import React, { useEffect, useState } from 'react'
// Create a timer that counts seconds and stops when a button is clicked.
function Stopwatch() {
    const [val, setVal] =useState(0);
    const [isOn, setIsOn] =useState(true);
    
    useEffect(()=>{
        let inte;

        if(isOn){
      inte= setInterval(() => {
        setVal(eq=>eq+1);
     }, 1100);}

     return ()=> clearInterval(inte);
     
    },[isOn])
    console.log(val)

  return (
    <div>
        <div>
            
            <p>{val}</p>

            <button onClick={()=>setIsOn(true)} > START</button>
            <button onClick={()=>setIsOn(false)} > STOP</button>
            <button onClick={()=>setVal(0)} >reset</button>
        </div>
    </div>
  )
}

export default Stopwatch