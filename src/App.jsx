import { useState } from 'react'
import Navbar from './components/Navbar'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Footer from './components/Footer'
import Games from './pages/Games'
import Categories from './pages/Categories'
import Leaderboard from './pages/Leaderboard'
import TicTacToe from './games/TicTacToe'
import CarRacing from './games/CarRacing'

function App() {
  

  return (
   
   <Router>
    <Navbar/>
    <Routes>
      
      <Route path='/' element={<Home/>}/>
      <Route path='/games' element={<Games/>}/>
      <Route path='/categories' element={<Categories/>}/>
      <Route path='/leaderboard' element={<Leaderboard/>}/>
      <Route path='/tictactoe' element={<TicTacToe/>}/>
      <Route path="/car-racing" element={<CarRacing />} />


    </Routes>
    <Footer/>
   </Router>
   
   
  )
}

export default App
