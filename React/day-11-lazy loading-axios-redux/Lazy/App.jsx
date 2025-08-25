

import { lazy, Suspense } from 'react'
import MyApp from './Components/MyApp/MyApp'
import NavBar from './Components/NavBar/NavBar'
let Lazy=lazy(()=>import ('./Components/Lazy/Lazy'))
console.log(Suspense)
console.log(lazy)

function App() {

  return (
    <>
   {/* <MyApp />    */}
   <NavBar/>
   <Suspense fallback={<div>LOADING...</div>}>
   <Lazy/>

   </Suspense>
    </>
  )
}

export default App
