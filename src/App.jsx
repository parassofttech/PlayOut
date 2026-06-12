import { useState } from 'react'
import Navbar from './components/Navbar'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './pages/Home'
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
import PuzzleGame from './games/PuzzleGame'
import SnakeGame from './games/SnakeGame'
import Profile from './pages/Profile'
import CricketGame from './games/CricketGame'
import DriftKing from './games/DriftKing'
import BikeRacing from './games/BikeRacing'

function App() {
  

  return (
   
   <Router>
    <Navbar/>
    <Routes>
      
      <Route path='/' element={<Home/>}/>
      <Route path='/games' element={<Games/>}/>
      <Route path='/categories' element={<Categories/>}/>
      <Route path='/leaderboard' element={<Leaderboard/>}/>
      <Route path='/profile' element={<Profile/>}/>
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
      <Route path="/puzzle-game" element={<PuzzleGame />} />
      <Route path="/snake-game" element={<SnakeGame />} />
      <Route path="/cricket-game" element={<CricketGame />} />
      <Route path="/drift-king" element={<DriftKing />} />
      <Route path="/bike-racing" element={<BikeRacing />} />


    </Routes>
    
   </Router>
   
   
  )
}

export default App
