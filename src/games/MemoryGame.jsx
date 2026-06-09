import React, { useEffect, useState } from "react";

const GAME_DATA = {
  emoji: ["😀", "😎", "😍", "🤩", "😴", "🤖", "👻", "💀"],
  cars: ["🚗", "🚕", "🏎️", "🚓", "🚑", "🚒", "🚌", "🚙"],
  animals: ["🐶", "🐱", "🐵", "🦁", "🐸", "🐼", "🐷", "🐯"],
};

const DIFFICULTY = {
  easy: 60,
  medium: 40,
  hard: 25,
};

const shuffleCards = (items) => {
  return [...items, ...items]
    .sort(() => Math.random() - 0.5)
    .map((item, index) => ({
      id: index,
      value: item,
      flipped: false,
      matched: false,
    }));
};

export default function MemoryGame() {
  const [mode, setMode] = useState("emoji");
  const [level, setLevel] = useState("easy");

  const [cards, setCards] = useState(shuffleCards(GAME_DATA["emoji"]));
  const [first, setFirst] = useState(null);
  const [second, setSecond] = useState(null);
  const [lock, setLock] = useState(false);

  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);

  const [time, setTime] = useState(DIFFICULTY[level]);
  const [gameOver, setGameOver] = useState(false);

  const highScoreKey = `${mode}-${level}`;

  // INIT GAME
  const startGame = (newMode = mode, newLevel = level) => {
    setMode(newMode);
    setLevel(newLevel);

    setCards(shuffleCards(GAME_DATA[newMode]));
    setFirst(null);
    setSecond(null);
    setMoves(0);
    setScore(0);
    setTime(DIFFICULTY[newLevel]);
    setGameOver(false);
  };

  // TIMER
  useEffect(() => {
    if (gameOver) return;

    const timer = setInterval(() => {
      setTime((t) => {
        if (t <= 1) {
          clearInterval(timer);
          setGameOver(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameOver]);

  // CLICK LOGIC
  const handleClick = (card) => {
    if (lock || card.flipped || card.matched || gameOver) return;

    setCards((prev) =>
      prev.map((c) =>
        c.id === card.id ? { ...c, flipped: true } : c
      )
    );

    if (!first) setFirst(card);
    else {
      setSecond(card);
      setLock(true);
    }
  };

  // MATCH CHECK
  useEffect(() => {
    if (first && second) {
      setMoves((m) => m + 1);

      if (first.value === second.value) {
        setCards((prev) =>
          prev.map((c) =>
            c.value === first.value ? { ...c, matched: true } : c
          )
        );
        setScore((s) => s + 10);
        resetTurn();
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === first.id || c.id === second.id
                ? { ...c, flipped: false }
                : c
            )
          );
          resetTurn();
        }, 600);
      }
    }
  }, [first, second]);

  const resetTurn = () => {
    setFirst(null);
    setSecond(null);
    setLock(false);
  };

  // WIN CHECK
  useEffect(() => {
    if (cards.length && cards.every((c) => c.matched)) {
      setGameOver(true);

      const prevHigh = localStorage.getItem(highScoreKey) || 0;
      if (score > prevHigh) {
        localStorage.setItem(highScoreKey, score);
      }
    }
  }, [cards, score]);

  const restart = () => {
    startGame(mode, level);
  };

  const isWin = cards.length && cards.every((c) => c.matched);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-gray-950 text-white flex flex-col items-center p-6">

      {/* HEADER */}
      <h1 className="text-4xl font-bold mb-2">🎮 Memory Pro</h1>

      {/* MODE + LEVEL */}
      <div className="flex flex-wrap gap-3 mb-3">
        {["emoji", "cars", "animals"].map((m) => (
          <button
            key={m}
            onClick={() => startGame(m, level)}
            className={`px-3 py-1 rounded-lg ${
              mode === m ? "bg-yellow-400 text-black" : "bg-white/10"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="flex gap-3 mb-3">
        {Object.keys(DIFFICULTY).map((l) => (
          <button
            key={l}
            onClick={() => startGame(mode, l)}
            className={`px-3 py-1 rounded-lg ${
              level === l ? "bg-green-400 text-black" : "bg-white/10"
            }`}
          >
            {l}
          </button>
        ))}
      </div>

      {/* STATS */}
      <div className="flex gap-6 mb-3">
        <div className="bg-white/10 px-4 py-2 rounded-xl">🎯 {moves}</div>
        <div className="bg-white/10 px-4 py-2 rounded-xl">⭐ {score}</div>
        <div className="bg-red-500 px-4 py-2 rounded-xl">⏱ {time}s</div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-4 gap-3">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleClick(card)}
            className="w-20 h-20 cursor-pointer"
          >
            <div
              className={`relative w-full h-full transition-transform duration-500 ${
                card.flipped || card.matched ? "rotate-y-180" : ""
              }`}
            >
              <div className="absolute w-full h-full bg-slate-700 rounded-xl flex items-center justify-center">
                ❓
              </div>

              <div
                className={`absolute w-full h-full rounded-xl flex items-center justify-center text-2xl rotate-y-180 ${
                  card.matched ? "bg-green-500" : "bg-yellow-400 text-black"
                }`}
              >
                {card.value}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* WIN / GAME OVER MODAL */}
      {(gameOver || isWin) && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
          <div className="bg-white text-black p-6 rounded-xl text-center w-72">
            <h2 className="text-2xl font-bold mb-2">
              {isWin ? "🏆 You Win!" : "⏰ Time Over"}
            </h2>

            <p>Score: {score}</p>
            <p>
              High Score: {localStorage.getItem(highScoreKey) || 0}
            </p>

            <button
              onClick={restart}
              className="mt-4 px-4 py-2 bg-black text-white rounded-lg"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}