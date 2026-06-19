import React, { useEffect, useState } from "react";

const SIZE = 3; // 3x3 puzzle

const generateSolved = () => {
  let arr = [];
  for (let i = 0; i < SIZE * SIZE; i++) {
    arr.push(i);
  }
  return arr;
};

const shuffle = (arr) => {
  let newArr = [...arr].sort(() => Math.random() - 0.5);
  return newArr;
};

 function PuzzleSlider() {
  const [tiles, setTiles] = useState(shuffle(generateSolved()));
  const [moves, setMoves] = useState(0);

  const emptyIndex = tiles.indexOf(0);

  // CHECK WIN
  const checkWin = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== i) return false;
    }
    return true;
  };

  const moveTile = (index) => {
    const empty = tiles.indexOf(0);

    const validMoves = [
      empty - 1,
      empty + 1,
      empty - SIZE,
      empty + SIZE,
    ];

    if (!validMoves.includes(index)) return;

    const newTiles = [...tiles];
    [newTiles[index], newTiles[empty]] = [
      newTiles[empty],
      newTiles[index],
    ];

    setTiles(newTiles);
    setMoves((m) => m + 1);

    if (checkWin(newTiles)) {
      setTimeout(() => {
        alert("🏆 You Solved the Puzzle!");
      }, 200);
    }
  };

  const restart = () => {
    setTiles(shuffle(generateSolved()));
    setMoves(0);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-black via-gray-900 to-black text-white flex flex-col items-center p-6">

      {/* TITLE */}
      <h1 className="text-4xl font-bold mb-2">🧩 Puzzle Slider</h1>

      {/* STATS */}
      <div className="flex gap-6 mb-4">
        <div className="bg-white/10 px-4 py-2 rounded-xl">
          🎯 Moves: {moves}
        </div>

        <button
          onClick={restart}
          className="bg-yellow-400 text-black px-4 py-2 rounded-xl font-bold"
        >
          Restart 🔄
        </button>
      </div>

      {/* GRID */}
      <div
        className="grid gap-2"
        style={{
          gridTemplateColumns: `repeat(${SIZE}, 90px)`,
        }}
      >
        {tiles.map((tile, index) => (
          <div
            key={index}
            onClick={() => moveTile(index)}
            className={`w-22.5 h-22.5 flex items-center justify-center text-xl font-bold rounded-lg cursor-pointer transition-all duration-200 ${
              tile === 0
                ? "bg-transparent"
                : "bg-blue-500 hover:scale-105 shadow-lg"
            }`}
          >
            {tile !== 0 ? tile : ""}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PuzzleSlider