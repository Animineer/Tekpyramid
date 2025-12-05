import React from 'react'
import { Link } from 'react-router-dom'


function Navbar() {
  return (
    <div>
        <ul>
            <li><Link to="home">Home</Link></li>
            <li><Link to="about">About</Link></li>
            <li> <Link to="contact">Contact</Link></li>
            <li><Link to="services">Services</Link></li>
            <li><Link to="footer">Footer</Link></li>
        </ul>
    </div>
  )
}

export default Navbar