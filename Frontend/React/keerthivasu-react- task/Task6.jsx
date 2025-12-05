// Create a website with Home, Contact, About pages using React Router.
import React from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'





function Task6() {
  return (
    <div>
        <BrowserRouter>
        <Link to='/contact'><button>Go to Contact</button></Link>
            <Link to='/about'><button>Go to About</button></Link>
            <Link to='/'><button>Home</button></Link>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/contact' element={<Contact/>}/>
                <Route path='/about' element={<About/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default Task6

function Home() {
    return (
        <div>
            <h1>im the home</h1>
        </div>
    )
}

function Contact() {
    return (
        <div>
            <h1>Mail ✉️<i>goapl@ymail.com</i></h1>
            <h1>Ph No 📞<i>9816178478</i></h1>
        </div>
    )
}

function About() {
    return (
        <div>
            <h1>Nothing to say about me 👎</h1>
            <h1>Gopal is the surname of Vigneshwar</h1>
            <h1>Gopal is from manipur🏙️</h1>
            <h1>Gopal owns 50 acre land in Bhopal🌆</h1>
        </div>
    )
}