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

  const [cards, setCards] = useState(shuffleCards(GAME_DATA.emoji));
  const [first, setFirst] = useState(null);
  const [second, setSecond] = useState(null);
  const [lock, setLock] = useState(false);

  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);

  const [time, setTime] = useState(DIFFICULTY.easy);
  const [gameOver, setGameOver] = useState(false);

  const highScoreKey = `${mode}-${level}`;

  const startGame = (newMode = mode, newLevel = level) => {
    setMode(newMode);
    setLevel(newLevel);

    setCards(shuffleCards(GAME_DATA[newMode]));
    setFirst(null);
    setSecond(null);
    setLock(false);

    setMoves(0);
    setScore(0);

    setTime(DIFFICULTY[newLevel]);
    setGameOver(false);
  };

  useEffect(() => {
    if (gameOver) return;

    const timer = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameOver]);

  const handleClick = (card) => {
    if (
      lock ||
      card.flipped ||
      card.matched ||
      gameOver
    )
      return;

    setCards((prev) =>
      prev.map((c) =>
        c.id === card.id
          ? { ...c, flipped: true }
          : c
      )
    );

    if (!first) {
      setFirst(card);
    } else {
      setSecond(card);
      setLock(true);
    }
  };

  useEffect(() => {
    if (!first || !second) return;

    setMoves((m) => m + 1);

    if (first.value === second.value) {
      setCards((prev) =>
        prev.map((c) =>
          c.value === first.value
            ? { ...c, matched: true }
            : c
        )
      );

      setScore((s) => s + 10);

      setTimeout(() => {
        setFirst(null);
        setSecond(null);
        setLock(false);
      }, 300);
    } else {
      setTimeout(() => {
        setCards((prev) =>
          prev.map((c) =>
            c.id === first.id ||
            c.id === second.id
              ? { ...c, flipped: false }
              : c
          )
        );

        setFirst(null);
        setSecond(null);
        setLock(false);
      }, 800);
    }
  }, [first, second]);

  useEffect(() => {
    if (
      cards.length > 0 &&
      cards.every((c) => c.matched)
    ) {
      setGameOver(true);

      const prevHigh =
        Number(
          localStorage.getItem(highScoreKey)
        ) || 0;

      if (score > prevHigh) {
        localStorage.setItem(
          highScoreKey,
          score
        );
      }
    }
  }, [cards, score, highScoreKey]);

  const restart = () => {
    startGame(mode, level);
  };

  const isWin =
    cards.length > 0 &&
    cards.every((c) => c.matched);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-black to-slate-900 text-white flex flex-col items-center p-4">

      {/* Header */}
      <h1 className="text-3xl md:text-5xl font-black mb-4 text-yellow-400">
        🧠 Memory Pro
      </h1>

      {/* Mode */}
      <div className="flex flex-wrap justify-center gap-2 mb-3">
        {["emoji", "cars", "animals"].map(
          (m) => (
            <button
              key={m}
              onClick={() =>
                startGame(m, level)
              }
              className={`px-4 py-2 rounded-xl font-bold transition ${
                mode === m
                  ? "bg-yellow-400 text-black"
                  : "bg-white/10"
              }`}
            >
              {m}
            </button>
          )
        )}
      </div>

      {/* Difficulty */}
      <div className="flex gap-2 mb-5">
        {Object.keys(DIFFICULTY).map((l) => (
          <button
            key={l}
            onClick={() =>
              startGame(mode, l)
            }
            className={`px-4 py-2 rounded-xl font-bold transition ${
              level === l
                ? "bg-green-500 text-black"
                : "bg-white/10"
            }`}
          >
            {l}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="flex gap-3 md:gap-6 flex-wrap justify-center mb-6">
        <div className="bg-white/10 px-4 py-2 rounded-xl">
          🎯 Moves: {moves}
        </div>

        <div className="bg-white/10 px-4 py-2 rounded-xl">
          ⭐ Score: {score}
        </div>

        <div className="bg-red-500 px-4 py-2 rounded-xl">
          ⏱ {time}s
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-4 gap-2 md:gap-4">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() =>
              handleClick(card)
            }
            className="cursor-pointer"
            style={{
              perspective: "1000px",
            }}
          >
            <div
              className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 duration-500"
              style={{
                transformStyle:
                  "preserve-3d",
                transform:
                  card.flipped ||
                  card.matched
                    ? "rotateY(180deg)"
                    : "rotateY(0deg)",
              }}
            >
              {/* Front */}
              <div
                className="absolute inset-0 bg-slate-700 rounded-2xl flex items-center justify-center text-2xl shadow-lg"
                style={{
                  backfaceVisibility:
                    "hidden",
                }}
              >
                ❓
              </div>

              {/* Back */}
              <div
                className={`absolute inset-0 rounded-2xl flex items-center justify-center text-3xl shadow-lg ${
                  card.matched
                    ? "bg-green-500"
                    : "bg-yellow-400 text-black"
                }`}
                style={{
                  transform:
                    "rotateY(180deg)",
                  backfaceVisibility:
                    "hidden",
                }}
              >
                {card.value}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {(gameOver || isWin) && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded-3xl w-[90%] max-w-sm text-center">

            <h2 className="text-3xl font-black mb-3">
              {isWin
                ? "🏆 You Win!"
                : "⏰ Time Over"}
            </h2>

            <p className="font-semibold">
              Score: {score}
            </p>

            <p className="font-semibold mt-2">
              High Score:{" "}
              {localStorage.getItem(
                highScoreKey
              ) || 0}
            </p>

            <button
              onClick={restart}
              className="mt-5 px-6 py-3 bg-black text-white rounded-xl font-bold hover:scale-105 transition"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}