import React, { useState } from "react";

function RockPaperScissors() {
  const choices = [
    { name: "rock", emoji: "✊" },
    { name: "paper", emoji: "📄" },
    { name: "scissors", emoji: "✂️" },
  ];

  const [playerChoice, setPlayerChoice] = useState(null);
  const [cpuChoice, setCpuChoice] = useState(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [cpuScore, setCpuScore] = useState(0);
  const [message, setMessage] = useState("Choose your move!");

  const getResult = (p, c) => {
    if (p === c) return "draw";

    if (
      (p === "rock" && c === "scissors") ||
      (p === "paper" && c === "rock") ||
      (p === "scissors" && c === "paper")
    ) {
      return "win";
    }

    return "lose";
  };

  const play = (choice) => {
    const cpu = choices[Math.floor(Math.random() * 3)].name;

    setPlayerChoice(choice);
    setCpuChoice(cpu);

    const result = getResult(choice, cpu);

    if (result === "win") {
      setPlayerScore((s) => s + 1);
      setMessage("🎉 You Win!");
    } else if (result === "lose") {
      setCpuScore((s) => s + 1);
      setMessage("💀 You Lost!");
    } else {
      setMessage("🤝 Draw!");
    }
  };

  const restart = () => {
    setPlayerChoice(null);
    setCpuChoice(null);
    setPlayerScore(0);
    setCpuScore(0);
    setMessage("Choose your move!");
  };

  const getEmoji = (name) =>
    choices.find((c) => c.name === name)?.emoji;

  return (
    <div className="min-h-screen bg-linear-to-br from-black via-gray-900 to-black text-white flex flex-col items-center justify-center p-6">

      <h1 className="text-4xl font-bold mb-3">✊📄✂️ RPS Battle</h1>

      {/* MESSAGE */}
      <div className="bg-white/10 px-6 py-3 rounded-xl mb-5 text-center">
        {message}
      </div>

      {/* DISPLAY */}
      <div className="flex gap-10 text-6xl mb-6">
        <div className="text-center">
          <p className="text-lg mb-2">You</p>
          <div>{playerChoice ? getEmoji(playerChoice) : "❓"}</div>
        </div>

        <div className="text-center">
          <p className="text-lg mb-2">CPU</p>
          <div>{cpuChoice ? getEmoji(cpuChoice) : "❓"}</div>
        </div>
      </div>

      {/* SCORE */}
      <div className="flex gap-6 mb-6">
        <div className="bg-white/10 px-4 py-2 rounded-xl">
          🧑 You: {playerScore}
        </div>
        <div className="bg-white/10 px-4 py-2 rounded-xl">
          🤖 CPU: {cpuScore}
        </div>
      </div>

      {/* BUTTONS */}
      <div className="flex gap-4 mb-6">
        {choices.map((c) => (
          <button
            key={c.name}
            onClick={() => play(c.name)}
            className="text-4xl bg-white/10 px-4 py-3 rounded-xl hover:scale-110 transition"
          >
            {c.emoji}
          </button>
        ))}
      </div>

      <button
        onClick={restart}
        className="bg-green-500 px-5 py-2 rounded-xl font-bold hover:scale-105 transition"
      >
        Restart 🔄
      </button>
    </div>
  );
}

export default RockPaperScissors;