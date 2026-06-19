import React, { useState } from "react";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [isXTurn, setIsXTurn] = useState(true);

  const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinner = () => {
    for (let pattern of winningPatterns) {
      const [a, b, c] = pattern;

      if (
        board[a] &&
        board[a] === board[b] &&
        board[a] === board[c]
      ) {
        return board[a];
      }
    }
    return null;
  };

  const winner = checkWinner();

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";

    setBoard(newBoard);
    setIsXTurn(!isXTurn);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setIsXTurn(true);
  };

  const isDraw =
    !winner && board.every((cell) => cell !== "");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-indigo-100 via-blue-100 to-cyan-100 p-4">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">
        Tic Tac Toe
      </h1>

      <div className="mb-5 text-xl font-semibold">
        {winner
          ? `🎉 Winner: ${winner}`
          : isDraw
          ? "🤝 Match Draw"
          : `Turn: ${isXTurn ? "X" : "O"}`}
      </div>

      <div className="grid grid-cols-3 gap-3">
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className="w-24 h-24 bg-white shadow-lg rounded-xl text-4xl font-bold hover:scale-105 transition"
          >
            {cell}
          </button>
        ))}
      </div>

      <button
        onClick={resetGame}
        className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
      >
        Restart Game
      </button>
    </div>
  );
};

export default TicTacToe;