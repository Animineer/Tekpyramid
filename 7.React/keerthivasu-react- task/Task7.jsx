import React, { useEffect, useState } from 'react'

function Task7() {
    const [kiruthi,setKiruti]=useState(true)

    useEffect(()=>{

        let a=setTimeout(() => {
            setKiruti(p=>!p)
        }, 2000);
       
        return () => {
        clearInterval(a)
      }
   
    },[])
 
    
  return (
    <>
    <div>Task7</div>
    {kiruthi?<div>Loading</div>:<div>Loaded</div>}
    </>
  )
}

export default Task7;