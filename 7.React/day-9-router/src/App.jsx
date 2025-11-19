import React from 'react'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import FooterPage from './FooterComponent/FooterPage'


function App() {
  return (
    <div>
      <Navbar />
      <Outlet/>
      <FooterPage/>
    </div>
  );
}

export default App