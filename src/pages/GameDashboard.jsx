import React from "react";
import { useNavigate } from "react-router-dom";

function GameDashboard() {
    const navigate = useNavigate();

    const games = [
        {
            name: "❌⭕ Tic Tac Toe",
            path: "/tic-tac-toe",
            color: "from-green-500 to-emerald-400",
        },
        {
            name: "🚗 Car Racing",
            path: "/car-racing",
            color: "from-blue-600 to-cyan-400",
        },
        {
            name: "🧠 Memory Game",
            path: "/memory-game",
            color: "from-purple-500 to-pink-500",
        },
        {
            name: "🧟 Zombie Attack",
            path: "/zombie-attack",
            color: "from-green-600 to-lime-500",
        },
        {
            name: "🎯 Aim Trainer",
            path: "/aim-trainer",
            color: "from-red-500 to-orange-500",
        },
        {
            name: "🧩 Puzzle Slider",
            path: "/puzzle-slider",
            color: "from-blue-500 to-cyan-500",
        },
        {
            name: "🔢 Guess Number",
            path: "/guess-number",
            color: "from-yellow-500 to-orange-400",
        },
        {
            name: "🎲 Dice Game",
            path: "/dice-game",
            color: "from-indigo-500 to-purple-500",
        },
        {
            name: "✊📄✂️ RPS Game",
            path: "/rock-paper-scissors",
            color: "from-pink-500 to-red-500",
        },
        {
            name: "🧠 Quiz Game",
            path: "/quiz-game",
            color: "from-teal-500 to-green-400",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-6">

            {/* HEADER */}
            <h1 className="text-4xl font-bold text-center mb-8">
                🎮 Game Portal Dashboard
            </h1>

            {/* GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

                {games.map((game, index) => (
                    <div
                        key={index}
                        onClick={() => navigate(game.path)}
                        className={`cursor-pointer p-6 rounded-2xl bg-gradient-to-r ${game.color} hover:scale-105 transition-all duration-300 shadow-xl`}
                    >
                        <h2 className="text-xl font-bold">{game.name}</h2>
                        <p className="text-sm mt-2 opacity-80">
                            Click to Play 🚀
                        </p>
                    </div>
                ))}

            </div>
        </div>
    );
}

export default GameDashboard;