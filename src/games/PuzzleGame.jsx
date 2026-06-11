import { useEffect, useState } from "react";
import {
  Trophy,
  RotateCcw,
  Timer,
  Move,
} from "lucide-react";

import puzzleImage from "../assets/puzzle-image.png";

const GRID_SIZE = 3;
const EMPTY_TILE = 8;

const PuzzleGame = () => {
  const [tiles, setTiles] = useState([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [won, setWon] = useState(false);

  const [bestScore, setBestScore] = useState(
    localStorage.getItem("bestPuzzleMoves") || "-"
  );

  useEffect(() => {
    startGame();
  }, []);

  useEffect(() => {
    if (won) return;

    const timer = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [won]);

  const isSolved = (arr) => {
    return arr.every((tile, index) => tile === index);
  };

  const shuffleTiles = () => {
    const arr = [...Array(9).keys()];

    let shuffled;

    do {
      shuffled = [...arr].sort(() => Math.random() - 0.5);
    } while (isSolved(shuffled));

    return shuffled;
  };

  const startGame = () => {
    setTiles(shuffleTiles());
    setMoves(0);
    setTime(0);
    setWon(false);
  };

  const canMove = (index, emptyIndex) => {
    const row = Math.floor(index / GRID_SIZE);
    const col = index % GRID_SIZE;

    const emptyRow = Math.floor(
      emptyIndex / GRID_SIZE
    );
    const emptyCol = emptyIndex % GRID_SIZE;

    return (
      Math.abs(row - emptyRow) +
        Math.abs(col - emptyCol) ===
      1
    );
  };

  const handleTileClick = (index) => {
    if (won) return;

    const emptyIndex = tiles.indexOf(EMPTY_TILE);

    if (!canMove(index, emptyIndex)) return;

    const newTiles = [...tiles];

    [newTiles[index], newTiles[emptyIndex]] = [
      newTiles[emptyIndex],
      newTiles[index],
    ];

    setTiles(newTiles);
    setMoves((prev) => prev + 1);

    if (isSolved(newTiles)) {
      setWon(true);

      const currentBest =
        localStorage.getItem("bestPuzzleMoves");

      if (
        !currentBest ||
        moves + 1 < Number(currentBest)
      ) {
        localStorage.setItem(
          "bestPuzzleMoves",
          moves + 1
        );

        setBestScore(moves + 1);
      }
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);

    const secs = seconds % 60;

    return `${mins}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-[#050816] flex flex-col items-center justify-center p-5">

      {/* Heading */}
      <h1 className="text-5xl font-black text-white mb-3">
        🧩 Fantasy Puzzle
      </h1>

      <p className="text-gray-400 mb-8">
        Arrange all image pieces correctly
      </p>

      {/* Stats */}
      <div className="flex flex-wrap gap-5 mb-8">
        <div className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-white">
          <Move size={18} />
          Moves: {moves}
        </div>

        <div className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-white">
          <Timer size={18} />
          {formatTime(time)}
        </div>

        <div className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-yellow-400">
          <Trophy size={18} />
          Best: {bestScore}
        </div>
      </div>
      <div className="h-100 w-100 object-cover">
        <img src={puzzleImage} alt="" />
      </div>

      {/* Puzzle Board */}
      <div
        className="grid gap-1 p-2 rounded-3xl bg-white/5 border border-white/10 shadow-2xl"
        style={{
          gridTemplateColumns:
            "repeat(3, 120px)",
        }}
      >
        {tiles.map((tile, index) => {
          if (tile === EMPTY_TILE) {
            return (
              <div
                key={index}
                className="w-[120px] h-[120px] rounded-lg bg-black/50"
              />
            );
          }

          const row = Math.floor(
            tile / GRID_SIZE
          );

          const col = tile % GRID_SIZE;

          return (
            <div
              key={index}
              onClick={() =>
                handleTileClick(index)
              }
              className="w-[120px] h-[120px] cursor-pointer rounded-lg border border-white/10 hover:scale-95 transition"
              style={{
                backgroundImage: `url(${puzzleImage})`,
                backgroundSize: "360px 360px",
                backgroundPosition: `-${
                  col * 120
                }px -${row * 120}px`,
              }}
            />
          );
        })}
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-8">
        <button
          onClick={startGame}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold flex items-center gap-2 hover:scale-105 transition"
        >
          <RotateCcw size={18} />
          Restart
        </button>
      </div>

      {/* Win Popup */}
      {won && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-[#111827] border border-cyan-500/30 rounded-3xl p-10 text-center max-w-md w-full">
            <h2 className="text-5xl mb-4">
              🎉
            </h2>

            <h3 className="text-3xl font-black text-white">
              Puzzle Solved!
            </h3>

            <p className="mt-4 text-gray-300">
              Moves: {moves}
            </p>

            <p className="text-gray-300">
              Time: {formatTime(time)}
            </p>

            <button
              onClick={startGame}
              className="mt-6 px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold hover:scale-105 transition"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PuzzleGame;