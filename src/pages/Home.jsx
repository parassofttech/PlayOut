import {
  Gamepad2,
  Trophy,
  Zap,
  Star,
  Play,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import GameDashboard from "./GameDashboard";
import HeroSection from "../home/HeroSection";
import TrendingGames from "../home/TrendingGames";
import CategoriesSection from "../home/CategoriesSection";
import Testimonials from "../home/Testimonials";
import Newsletter from "../home/Newsletter";
import PopularGame from "../home/PopularGame";
import Footer from '../components/Footer'

const popularGames = [
  {
    id: 1,
    title: "Car Racing",
    name: "car-racing",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341",
  },
  {
    id: 2,
    title: "Battle Arena",
    name: "battle-arena",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420",
  },
  {
    id: 3,
    title: "Zombie Attack",
    name: "zombie-attack",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
  },
  {
    id: 4,
    title: "Football Pro",
    name: "football",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018",
  },
  {
    id: 5,
    title: "Tic Tac Toe",
    name: "tictactoe",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018",
  },
  {
    id: 6,
    title: "Memory Game",
    name: "memory-game",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018",
  },
  {
    id: 5,
    title: "Tic Tac Toe",
    name: "tictactoe",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018",
  },
  {
    id: 5,
    title: "Tic Tac Toe",
    name: "tictactoe",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018",
  },
];

 function Home() {
  const navigate = useNavigate()

  const handleplay =()=>{
    navigate('/tictactoe')
  }
  return (
    <div className="bg-[#050816] text-white min-h-screen">

      {/* HERO */}
     
      <HeroSection/>
      <TrendingGames/>
      <CategoriesSection/>
      <PopularGame/>
      <Testimonials/>
      <Newsletter/>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 ">
        <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 ">

          <div className="bg-white/5 p-2 sm:p-4 md:p-6  rounded-2xl">
            <Zap className="text-yellow-400 mb-4" size={40} />
            <h3 className="font-bold text-xs sm:text-sm md:text-lg mb-2">
              Fast Performance
            </h3>
            <p className="text-gray-400  mt-1 md:mt-2 text-[10px] sm:text-xs md:text-sm leading-relaxed">
              Lightning-fast gaming experience without downloads.
            </p>
          </div>

          <div className="bg-white/5 p-[8%] h-65   rounded-2xl">
            <Trophy className="text-purple-400 mb-4" size={40} />
            <h3 className="font-bold text-xs sm:text-sm md:text-lg mb-2">
              Leaderboards
            </h3>
            <p className="text-gray-400 p-2 mt-1 md:mt-2 text-[10px] sm:text-xs md:text-sm leading-relaxed ">
              Compete with players around the world.
            </p>
          </div>

          <div className="bg-white/5 p-[8%] h-65  rounded-2xl">
            <Star className="text-cyan-400 mb-4" size={40} />
            <h3 className="font-bold  text-xs sm:text-sm md:text-lg mb-2">
              Top Rated Games
            </h3>
            <p className="text-gray-400  mt-1 md:mt-2 text-[10px] sm:text-xs md:text-sm leading-relaxed">
              Discover the highest-rated games instantly.
            </p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <h2 className="text-5xl font-black">
          Ready To Play?
        </h2>

        <p className="text-gray-400 mt-4">
          Join thousands of gamers and start your adventure today.
        </p>

        <button onClick={()=>navigate('/games')} className="mt-8 px-10 py-4 rounded-xl bg-linear-to-r from-cyan-500 to-purple-600 font-bold text-lg hover:scale-105 transition">
          Start Playing
        </button>
      </section>
      <Footer/>
      
    </div>
  );
}

export default Home