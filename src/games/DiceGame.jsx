import React, { useState } from "react";

function DiceGame() {
  const [playerDice, setPlayerDice] = useState(1);
  const [cpuDice, setCpuDice] = useState(1);
  const [playerScore, setPlayerScore] = useState(0);
  const [cpuScore, setCpuScore] = useState(0);
  const [message, setMessage] = useState("Roll the dice!");

  const rollDice = () => {
    const p = Math.floor(Math.random() * 6) + 1;
    const c = Math.floor(Math.random() * 6) + 1;

    setPlayerDice(p);
    setCpuDice(c);

    if (p > c) {
      setPlayerScore((s) => s + 1);
      setMessage("🎉 You Win this round!");
    } else if (c > p) {
      setCpuScore((s) => s + 1);
      setMessage("💀 You lost this round!");
    } else {
      setMessage("🤝 It's a Draw!");
    }
  };

  const restart = () => {
    setPlayerDice(1);
    setCpuDice(1);
    setPlayerScore(0);
    setCpuScore(0);
    setMessage("Roll the dice!");
  };

  const diceFaces = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

  return (
    <div className="min-h-screen bg-linear-to-br from-black via-gray-900 to-black text-white flex flex-col items-center justify-center p-6">

      <h1 className="text-4xl font-bold mb-3">🎲 Dice Battle</h1>

      <div className="bg-white/10 px-6 py-3 rounded-xl mb-4 text-center">
        {message}
      </div>

      {/* DICE */}
      <div className="flex gap-10 text-7xl mb-6">
        <div className="text-center">
          <p className="text-lg mb-2">You</p>
          <div>{diceFaces[playerDice - 1]}</div>
        </div>

        <div className="text-center">
          <p className="text-lg mb-2">CPU</p>
          <div>{diceFaces[cpuDice - 1]}</div>
        </div>
      </div>

      {/* SCORE */}
      <div className="flex gap-6 mb-5">
        <div className="bg-white/10 px-4 py-2 rounded-xl">
          🧑 You: {playerScore}
        </div>
        <div className="bg-white/10 px-4 py-2 rounded-xl">
          🤖 CPU: {cpuScore}
        </div>
      </div>

      {/* BUTTONS */}
      <div className="flex gap-4">
        <button
          onClick={rollDice}
          className="bg-yellow-400 text-black px-5 py-2 rounded-xl font-bold hover:scale-105 transition"
        >
          Roll Dice 🎲
        </button>

        <button
          onClick={restart}
          className="bg-green-500 px-5 py-2 rounded-xl font-bold hover:scale-105 transition"
        >
          Restart 🔄
        </button>
      </div>
    </div>
  );
}

export default DiceGame;
