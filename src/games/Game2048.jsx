import { useEffect, useState } from "react";

const SIZE = 4;

const getEmptyGrid = () =>
  Array.from({ length: SIZE }, () =>
    Array(SIZE).fill(0)
  );

function Game2048() {
  const [grid, setGrid] = useState(getEmptyGrid());
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Add random tile
  const addNumber = (newGrid) => {
    let empty = [];

    newGrid.forEach((row, r) => {
      row.forEach((cell, c) => {
        if (cell === 0) empty.push({ r, c });
      });
    });

    if (empty.length === 0) return newGrid;

    const { r, c } =
      empty[Math.floor(Math.random() * empty.length)];

    newGrid[r][c] = Math.random() > 0.9 ? 4 : 2;

    return newGrid;
  };

  // Move logic
  const compress = (row) => {
    let arr = row.filter((val) => val);

    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] === arr[i + 1]) {
        arr[i] *= 2;
        setScore((s) => s + arr[i]);
        arr[i + 1] = 0;
      }
    }

    arr = arr.filter((val) => val);

    while (arr.length < SIZE) {
      arr.push(0);
    }

    return arr;
  };

  const moveLeft = (oldGrid) => {
    let newGrid = oldGrid.map((row) => compress(row));
    return newGrid;
  };

  const moveRight = (oldGrid) => {
    let newGrid = oldGrid.map((row) =>
      compress(row.reverse()).reverse()
    );
    return newGrid;
  };

  const rotate = (matrix) => {
    let res = getEmptyGrid();
    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        res[c][SIZE - 1 - r] = matrix[r][c];
      }
    }
    return res;
  };

  const moveUp = (grid) => rotate(moveLeft(rotate(rotate(rotate(grid)))));
  const moveDown = (grid) => rotate(moveRight(rotate(rotate(rotate(grid)))));

  const handleMove = (dir) => {
    if (gameOver) return;

    let newGrid;

    if (dir === "left") newGrid = moveLeft(grid);
    if (dir === "right") newGrid = moveRight(grid);
    if (dir === "up") newGrid = moveUp(grid);
    if (dir === "down") newGrid = moveDown(grid);

    newGrid = addNumber(newGrid);
    setGrid([...newGrid]);

    checkGameOver(newGrid);
  };

  const checkGameOver = (g) => {
    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        if (g[r][c] === 0) return;
        if (c < SIZE - 1 && g[r][c] === g[r][c + 1]) return;
        if (r < SIZE - 1 && g[r][c] === g[r + 1][c]) return;
      }
    }
    setGameOver(true);
  };

  const restart = () => {
    let g = addNumber(getEmptyGrid());
    g = addNumber(g);
    setGrid(g);
    setScore(0);
    setGameOver(false);
  };

  // Keyboard
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") handleMove("left");
      if (e.key === "ArrowRight") handleMove("right");
      if (e.key === "ArrowUp") handleMove("up");
      if (e.key === "ArrowDown") handleMove("down");
    };

    window.addEventListener("keydown", handleKey);
    return () =>
      window.removeEventListener("keydown", handleKey);
  });

  // init
  useEffect(() => {
    restart();
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">

      <div className="w-full max-w-md text-center">

        <h1 className="text-4xl font-black text-white mb-2">
          🧠 2048 Game
        </h1>

        <p className="text-gray-300 mb-4">
          Score:{" "}
          <span className="text-yellow-400 font-bold">
            {score}
          </span>
        </p>

        {/* GRID */}
        <div className="grid grid-cols-4 gap-2 bg-white/10 p-3 rounded-2xl">

          {grid.map((row, r) =>
            row.map((cell, c) => (
              <div
                key={`${r}-${c}`}
                className="w-16 h-16 flex items-center justify-center rounded-xl font-black text-white text-xl bg-linear-to-br from-purple-500/30 to-cyan-500/30"
              >
                {cell !== 0 ? cell : ""}
              </div>
            ))
          )}

        </div>

        {/* CONTROLS */}
        <div className="grid grid-cols-3 gap-3 mt-5">

          <div />
          <button
            onClick={() => handleMove("up")}
            className="bg-cyan-500 p-3 rounded-xl"
          >
            ⬆️
          </button>
          <div />

          <button
            onClick={() => handleMove("left")}
            className="bg-cyan-500 p-3 rounded-xl"
          >
            ⬅️
          </button>

          <button
            onClick={() => handleMove("down")}
            className="bg-cyan-500 p-3 rounded-xl"
          >
            ⬇️
          </button>

          <button
            onClick={() => handleMove("right")}
            className="bg-cyan-500 p-3 rounded-xl"
          >
            ➡️
          </button>
        </div>

        {/* RESTART */}
        <button
          onClick={restart}
          className="mt-6 px-8 py-3 bg-linear-to-r from-pink-500 to-purple-600 text-white font-bold rounded-xl"
        >
          🔄 Restart
        </button>

        {/* GAME OVER */}
        {gameOver && (
          <div className="mt-4 text-red-500 font-black text-2xl">
            GAME OVER 💀
          </div>
        )}

      </div>
    </div>
  );
}

export default Game2048;