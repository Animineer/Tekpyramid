import React,{createContext} from 'react'
export let myContext= createContext({data : "value from default"}) //named export 
  //have to use carlibraces while importing
function ContextFile() {


  return (
    <div>
        
        <h1>creating component</h1>

    </div>
  )
}

export default ContextFile