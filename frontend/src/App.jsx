import { useState } from 'react'
import  Navbar  from './navbar.jsx'
import './App.css'
import Hero from './hero.jsx'
import './navbar.css'


function App() {


  return (
    <>
     <div className='body'>
     <Navbar style={{ backgroundColor: 'red' }} />
       <Hero/>
    

     </div>

    </>
  )
}

export default App
