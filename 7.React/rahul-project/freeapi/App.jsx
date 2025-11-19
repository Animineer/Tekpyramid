import { useState } from 'react'
import './App.css'
import Login from './tasks/Login'
import Shop from './tasks/Shop'
import Timer from './tasks/Timer'

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      {/* <Login/> */}
      {/* <Timer/> */}
      <Shop/>
    </>
  )
}
export default App
