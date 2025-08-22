import './App.css'


//context
import {myContext} from "./component/context/ContextFile"
import ParentContext from './component/context/ParentContext'



function App() {
 return(
    <>
    <myContext.Provider value={{data:"hi i am working fine now "}}>
        <ParentContext/>
    </myContext.Provider>

   </>
    
 )
}

export default App

