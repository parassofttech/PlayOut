import { useState } from 'react'
import Navbar from './components/Navbar'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Footer from './components/Footer'
import Games from './pages/Games'

function App() {
  

  return (
   
   <Router>
    <Navbar/>
    <Routes>
      
      <Route path='/' element={<Home/>}/>
      <Route path='/games' element={<Games/>}/>

    </Routes>
    <Footer/>
   </Router>
   
   
  )
}

export default App
