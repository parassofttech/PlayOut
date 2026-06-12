import { useState } from "react";

// Simple valid puzzle (0 = empty)
const initialPuzzle = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],

  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],

  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

function Sudoku() {
  const [board, setBoard] = useState(initialPuzzle);
  const [message, setMessage] = useState("🧠 Solve the puzzle!");

  // Check if move is valid
  const isValid = (grid, row, col, val) => {
    // row check
    for (let i = 0; i < 9; i++) {
      if (grid[row][i] === val) return false;
    }

    // col check
    for (let i = 0; i < 9; i++) {
      if (grid[i][col] === val) return false;
    }

    // box check
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[boxRow + i][boxCol + j] === val) return false;
      }
    }

    return true;
  };

  const handleChange = (row, col, value) => {
    if (initialPuzzle[row][col] !== 0) return;

    const num = value === "" ? 0 : Number(value);

    if (num < 0 || num > 9) return;

    const newBoard = board.map((r) => [...r]);

    if (num !== 0 && !isValid(newBoard, row, col, num)) {
      setMessage("❌ Wrong Move!");
      return;
    }

    newBoard[row][col] = num;
    setBoard(newBoard);
    setMessage("✅ Good Move!");
  };

  const resetGame = () => {
    setBoard(initialPuzzle);
    setMessage("🧠 Game Reset!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black flex items-center justify-center p-4">

      <div className="w-full max-w-md text-center">

        <h1 className="text-3xl font-black text-white mb-2">
          🧠 Sudoku Game
        </h1>

        <p className="text-gray-300 mb-4">
          {message}
        </p>

        {/* BOARD */}
        <div className="grid grid-cols-9 bg-white/10 p-2 rounded-2xl gap-[2px]">

          {board.map((row, r) =>
            row.map((cell, c) => (
              <input
                key={`${r}-${c}`}
                value={cell === 0 ? "" : cell}
                onChange={(e) =>
                  handleChange(r, c, e.target.value)
                }
                maxLength={1}
                className={`w-8 h-8 sm:w-10 sm:h-10 text-center text-white font-bold rounded
                  ${
                    initialPuzzle[r][c] !== 0
                      ? "bg-yellow-500/30 text-yellow-300"
                      : "bg-white/5"
                  }`}
              />
            ))
          )}

        </div>

        {/* CONTROLS */}
        <div className="flex gap-4 mt-5 justify-center">

          <button
            onClick={resetGame}
            className="px-6 py-3 rounded-xl bg-purple-500 text-white font-bold hover:scale-105 transition"
          >
            🔄 Reset
          </button>

        </div>

      </div>
    </div>
  );
}

export default Sudoku;