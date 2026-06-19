import { useEffect, useState } from "react";

const SIZE = 3;

// Generate solved state
const getSolved = () => {
  let arr = [];
  for (let i = 1; i <= SIZE * SIZE - 1; i++) {
    arr.push(i);
  }
  arr.push(null);
  return arr;
};

// Shuffle array
const shuffle = (arr) => {
  let a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

function SlidingPuzzle() {
  const [tiles, setTiles] = useState([]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);

  // init game
  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    let newBoard = shuffle(getSolved());

    // avoid instant win
    while (isSolved(newBoard)) {
      newBoard = shuffle(getSolved());
    }

    setTiles(newBoard);
    setMoves(0);
    setWon(false);
  };

  const indexToRowCol = (index) => ({
    row: Math.floor(index / SIZE),
    col: index % SIZE,
  });

  const canMove = (index) => {
    const emptyIndex = tiles.indexOf(null);

    const { row: r1, col: c1 } = indexToRowCol(index);
    const { row: r2, col: c2 } = indexToRowCol(emptyIndex);

    return (
      (Math.abs(r1 - r2) === 1 && c1 === c2) ||
      (Math.abs(c1 - c2) === 1 && r1 === r2)
    );
  };

  const moveTile = (index) => {
    if (won) return;

    const emptyIndex = tiles.indexOf(null);

    if (!canMove(index)) return;

    const newTiles = [...tiles];
    [newTiles[index], newTiles[emptyIndex]] = [
      newTiles[emptyIndex],
      newTiles[index],
    ];

    setTiles(newTiles);
    setMoves((m) => m + 1);

    if (isSolved(newTiles)) {
      setWon(true);
    }
  };

  const isSolved = (arr) => {
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] !== i + 1) return false;
    }
    return arr[arr.length - 1] === null;
  };

  // keyboard controls
  useEffect(() => {
    const handleKey = (e) => {
      const empty = tiles.indexOf(null);
      const { row, col } = indexToRowCol(empty);

      let target = null;

      if (e.key === "ArrowUp") target = (row + 1) * SIZE + col;
      if (e.key === "ArrowDown") target = (row - 1) * SIZE + col;
      if (e.key === "ArrowLeft") target = row * SIZE + (col + 1);
      if (e.key === "ArrowRight") target = row * SIZE + (col - 1);

      if (target !== null && target >= 0 && target < tiles.length) {
        moveTile(target);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () =>
      window.removeEventListener("keydown", handleKey);
  });

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-900 via-black to-indigo-900 flex items-center justify-center p-4">

      <div className="text-center w-full max-w-sm">

        <h1 className="text-4xl font-black text-white mb-2">
          🧩 Sliding Puzzle
        </h1>

        <p className="text-gray-300 mb-4">
          Moves:{" "}
          <span className="text-cyan-400 font-bold">
            {moves}
          </span>
        </p>

        {/* GRID */}
        <div className="grid grid-cols-3 gap-2 bg-white/10 p-3 rounded-2xl">

          {tiles.map((tile, index) => (
            <div
              key={index}
              onClick={() => moveTile(index)}
              className={`h-24 flex items-center justify-center rounded-xl text-2xl font-black cursor-pointer transition
                ${
                  tile === null
                    ? "bg-transparent"
                    : "bg-linear-to-br from-cyan-500 to-purple-600 text-white hover:scale-105"
                }`}
            >
              {tile}
            </div>
          ))}

        </div>

        {/* CONTROLS */}
        <button
          onClick={resetGame}
          className="mt-5 px-8 py-3 bg-linear-to-r from-pink-500 to-purple-600 text-white font-bold rounded-xl"
        >
          🔄 Restart
        </button>

        {/* WIN */}
        {won && (
          <div className="mt-4 text-green-400 text-2xl font-black">
            🎉 You Solved It!
          </div>
        )}

        <p className="text-gray-400 mt-3 text-sm">
          👆 Click tiles or use arrow keys
        </p>

      </div>
    </div>
  );
}

export default SlidingPuzzle;