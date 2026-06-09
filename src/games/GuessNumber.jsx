import React, { useState } from "react";

 function GuessNumber() {
  const [target] = useState(Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("Guess a number between 1 - 100");
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(100);

  const handleGuess = () => {
    if (!guess) return;

    const num = Number(guess);
    setAttempts((a) => a + 1);
    setScore((s) => Math.max(0, s - 5));

    if (num === target) {
      setMessage("🏆 Correct! You Win!");
      setGameOver(true);
    } else if (num > target) {
      setMessage("📉 Too High!");
    } else {
      setMessage("📈 Too Low!");
    }

    setGuess("");
  };

  const restart = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col items-center justify-center p-6">

      <h1 className="text-4xl font-bold mb-3">🔢 Guess The Number</h1>

      <div className="bg-white/10 px-6 py-4 rounded-xl mb-4 text-center">
        <p className="text-lg">{message}</p>
      </div>

      <div className="flex gap-3 mb-4">
        <input
          type="number"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          className="px-4 py-2 rounded-lg text-black outline-none w-40"
          placeholder="Enter number"
          disabled={gameOver}
        />

        <button
          onClick={handleGuess}
          className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold"
          disabled={gameOver}
        >
          Guess
        </button>
      </div>

      <div className="flex gap-6 mb-4">
        <div className="bg-white/10 px-4 py-2 rounded-xl">
          🎯 Attempts: {attempts}
        </div>
        <div className="bg-white/10 px-4 py-2 rounded-xl">
          ⭐ Score: {score}
        </div>
      </div>

      {gameOver && (
        <button
          onClick={restart}
          className="px-5 py-2 bg-green-500 rounded-xl font-bold"
        >
          Play Again 🔄
        </button>
      )}
    </div>
  );
}

export default GuessNumber