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
import MemoryGame from './games/MemoryGame'
import ZombieAttack from './games/ZombieAttack'
import AimTrainer from './games/AimTrainer'
import PuzzleSlider from './games/PuzzleSlider'
import QuizGame from './games/QuizGame'
import DiceGame from './games/DiceGame'
import RockPaperScissors from './games/RockPaperScissors'
import GuessNumber from './games/GuessNumber'

function App() {
  

  return (
   
   <Router>
    <Navbar/>
    <Routes>
      
      <Route path='/' element={<Home/>}/>
      <Route path='/games' element={<Games/>}/>
      <Route path='/categories' element={<Categories/>}/>
      <Route path='/leaderboard' element={<Leaderboard/>}/>
      <Route path='/tic-tac-toe' element={<TicTacToe/>}/>
      <Route path="/car-racing" element={<CarRacing />} />
      <Route path="/memory-game" element={<MemoryGame />} />
      <Route path="/zombie-attack" element={<ZombieAttack />} />
      <Route path="/aim-trainer" element={<AimTrainer />} />
      <Route path="/puzzle-slider" element={<PuzzleSlider />} />
      <Route path="/guess-number" element={<GuessNumber />} />
      <Route path="/dice-game" element={<DiceGame />} />
      <Route path="/rock-paper-scissors" element={<RockPaperScissors />} />
      <Route path="/quiz-game" element={<QuizGame/>} />


    </Routes>
    <Footer/>
   </Router>
   
   
  )
}

export default App
