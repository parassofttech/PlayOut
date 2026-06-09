import { useState } from 'react'
import Navbar from './components/Navbar'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './pages/Home'

function App() {
  

  return (
   
   <Router>
    <Navbar/>
    <Routes>
      
      <Route path='/' element={<Home/>}/>

    </Routes>
   </Router>
   
   
  )
}

export default App
