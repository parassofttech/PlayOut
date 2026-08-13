import React, { useState, useEffect } from "react";
import { Sparkles, RotateCcw, Trophy, Flame, Zap } from "lucide-react";

/*
  ============================================================
  ADVANCED CANDY CRUSH SAGA (Fully Functional React Component)
  ============================================================
*/

const BOARD_SIZE = 8;
const CANDIES = ["🔴", "🔵", "🟢", "🟡", "🟣", "🟠"];
const TARGET_SCORE = 1000;
const MAX_MOVES = 20;

// Helper to create a random board without initial matches
const createBoard = () => {
  let board;
  do {
    board = Array(BOARD_SIZE)
      .fill(null)
      .map(() =>
        Array(BOARD_SIZE)
          .fill(null)
          .map(() => CANDIES[Math.floor(Math.random() * CANDIES.length)])
      );
  } while (checkInitialMatches(board));
  return board;
};

const checkInitialMatches = (board) => {
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      const candy = board[r][c];
      if (!candy) continue;
      // Horizontal
      if (c + 2 < BOARD_SIZE && board[r][c + 1] === candy && board[r][c + 2] === candy) return true;
      // Vertical
      if (r + 2 < BOARD_SIZE && board[r + 1][c] === candy && board[r + 2][c] === candy) return true;
    }
  }
  return false;
};

export default function CandyCrush() {
  const [board, setBoard] = useState(createBoard);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(MAX_MOVES);
  const [selected, setSelected] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState("Match 3 or more candies to score!");
  const [combo, setCombo] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Restart Game
  const resetGame = () => {
    setBoard(createBoard());
    setScore(0);
    setMoves(MAX_MOVES);
    setSelected(null);
    setIsProcessing(false);
    setCombo(0);
    setGameOver(false);
    setMessage("New game started. Good luck!");
  };

  // Handle candy selection & swap
  const handleCandyClick = (r, c) => {
    if (isProcessing || gameOver) return;

    if (!selected) {
      setSelected({ r, c });
      setMessage(`Selected candy at [${r + 1}, ${c + 1}]. Pick an adjacent one to swap.`);
      return;
    }

    const prevR = selected.r;
    const prevC = selected.c;

    // Check if clicked same candy
    if (prevR === r && prevC === c) {
      setSelected(null);
      setMessage("Selection cleared.");
      return;
    }

    // Check if adjacent
    const isAdjacent = Math.abs(prevR - r) + Math.abs(prevC - c) === 1;
    if (!isAdjacent) {
      setSelected({ r, c });
      setMessage(`Selected candy at [${r + 1}, ${c + 1}].`);
      return;
    }

    // Perform Swap
    let newBoard = board.map((row) => [...row]);
    const temp = newBoard[prevR][prevC];
    newBoard[prevR][prevC] = newBoard[r][c];
    newBoard[r][c] = temp;

    // Validate if swap creates a match
    if (hasMatches(newBoard)) {
      setBoard(newBoard);
      setSelected(null);
      setMoves((m) => m - 1);
      setIsProcessing(true);
      setCombo(1);
    } else {
      // Invalid swap, revert
      setMessage("Invalid move! No match created.");
      setSelected(null);
    }
  };

  const hasMatches = (currentBoard) => {
    for (let r = 0; r < BOARD_SIZE; r++) {
      for (let c = 0; c < BOARD_SIZE; c++) {
        const candy = currentBoard[r][c];
        if (!candy) continue;
        if (c + 2 < BOARD_SIZE && currentBoard[r][c + 1] === candy && currentBoard[r][c + 2] === candy) return true;
        if (r + 2 < BOARD_SIZE && currentBoard[r + 1][c] === candy && currentBoard[r + 2][c] === candy) return true;
      }
    }
    return false;
  };

  // Match finding and dropping loop (Cascade effect)
  useEffect(() => {
    if (!isProcessing) return;

    const timer = setTimeout(() => {
      let currentBoard = board.map((row) => [...row]);
      let matchedCoords = new Set();

      // Find horizontal matches
      for (let r = 0; r < BOARD_SIZE; r++) {
        for (let c = 0; c < BOARD_SIZE - 2; c++) {
          const candy = currentBoard[r][c];
          if (!candy) continue;
          if (currentBoard[r][c + 1] === candy && currentBoard[r][c + 2] === candy) {
            matchedCoords.add(`${r},${c}`);
            matchedCoords.add(`${r},${c + 1}`);
            matchedCoords.add(`${r},${c + 2}`);
          }
        }
      }

      // Find vertical matches
      for (let c = 0; c < BOARD_SIZE; c++) {
        for (let r = 0; r < BOARD_SIZE - 2; r++) {
          const candy = currentBoard[r][c];
          if (!candy) continue;
          if (currentBoard[r + 1][c] === candy && currentBoard[r + 2][c] === candy) {
            matchedCoords.add(`${r},${c}`);
            matchedCoords.add(`${r + 1},${c}`);
            matchedCoords.add(`${r + 2},${c}`);
          }
        }
      }

      if (matchedCoords.size > 0) {
        // Matches found! Calculate score boost
        const points = matchedCoords.size * 20 * combo;
        setScore((s) => s + points);
        setCombo((c) => c + 1);
        setMessage(`Matched! +${points} points (Combo x${combo})`);

        // Clear matched candies
        matchedCoords.forEach((coord) => {
          const [r, c] = coord.split(",").map(Number);
          currentBoard[r][c] = null;
        });

        // Drop down existing candies
        for (let c = 0; c < BOARD_SIZE; c++) {
          let writeRow = BOARD_SIZE - 1;
          for (let r = BOARD_SIZE - 1; r >= 0; r--) {
            if (currentBoard[r][c] !== null) {
              currentBoard[writeRow][c] = currentBoard[r][c];
              if (writeRow !== r) {
                currentBoard[r][c] = null;
              }
              writeRow--;
            }
          }
          // Fill empty spaces at the top with random candies
          for (let r = writeRow; r >= 0; r--) {
            currentBoard[r][c] = CANDIES[Math.floor(Math.random() * CANDIES.length)];
          }
        }

        setBoard(currentBoard);
      } else {
        // No more matches, processing complete
        setIsProcessing(false);
        setCombo(0);
        setMessage("Your turn! Pick a candy.");

        // Check Win/Loss conditions
        if (score >= TARGET_SCORE) {
          setGameOver(true);
          setMessage("🎉 Congratulations! You won the game!");
        } else if (moves <= 0) {
          setGameOver(true);
          setMessage("❌ Game Over! Out of moves.");
        }
      }
    }, 450);

    return () => clearTimeout(timer);
  }, [isProcessing, board, combo, moves, score]);

  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 py-8 font-sans flex flex-col items-center justify-center">
      <div className="max-w-md w-full mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="flex items-center justify-between bg-slate-900/80 border border-white/10 p-4 rounded-3xl backdrop-blur-xl shadow-xl">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-bold tracking-wider uppercase">
              <Sparkles size={12} /> Candy Crush Saga
            </div>
            <h1 className="mt-1 text-2xl font-black bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Sweet Match
            </h1>
          </div>
          <button
            onClick={resetGame}
            className="p-3 rounded-2xl bg-pink-600 hover:bg-pink-500 transition text-white shadow-lg cursor-pointer flex items-center gap-1.5 text-xs font-bold"
          >
            <RotateCcw size={16} /> Reset
          </button>
        </div>

        {/* Status Dashboard */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-slate-900/60 border border-white/10 p-3 rounded-2xl backdrop-blur-xl shadow-md">
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold flex items-center justify-center gap-1">
              <Trophy size={12} className="text-yellow-400" /> Score
            </p>
            <p className="text-xl font-black mt-1 text-yellow-400">{score} <span className="text-[10px] text-slate-500">/ {TARGET_SCORE}</span></p>
          </div>
          <div className="bg-slate-900/60 border border-white/10 p-3 rounded-2xl backdrop-blur-xl shadow-md">
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold flex items-center justify-center gap-1">
              <Zap size={12} className="text-cyan-400" /> Moves
            </p>
            <p className={`text-xl font-black mt-1 ${moves <= 5 ? "text-red-500 animate-pulse" : "text-cyan-400"}`}>{moves}</p>
          </div>
          <div className="bg-slate-900/60 border border-white/10 p-3 rounded-2xl backdrop-blur-xl shadow-md">
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold flex items-center justify-center gap-1">
              <Flame size={12} className="text-orange-400" /> Target
            </p>
            <p className="text-xl font-black mt-1 text-orange-400">{TARGET_SCORE}</p>
          </div>
        </div>

        {/* Message Banner */}
        <div className="bg-slate-900/40 border border-white/10 px-4 py-2.5 rounded-2xl text-center text-xs font-medium text-slate-300 shadow-inner">
          {message}
        </div>

        {/* Game Board Grid */}
        <div className="bg-slate-900/80 border-4 border-pink-500/30 p-3 rounded-3xl backdrop-blur-xl shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-8 gap-1.5 aspect-square">
            {board.map((row, r) =>
              row.map((candy, c) => {
                const isSelected = selected && selected.r === r && selected.c === c;
                return (
                  <button
                    key={`${r}-${c}`}
                    disabled={gameOver || isProcessing}
                    onClick={() => handleCandyClick(r, c)}
                    className={`aspect-square rounded-xl flex items-center justify-center text-2xl sm:text-3xl transition-all transform active:scale-90 select-none ${
                      candy ? "bg-white/5 hover:bg-white/10 cursor-pointer shadow-sm" : "bg-transparent"
                    } ${
                      isSelected
                        ? "ring-4 ring-pink-400 bg-pink-500/20 scale-105 shadow-[0_0_15px_rgba(236,72,153,0.5)]"
                        : ""
                    }`}
                  >
                    {candy}
                  </button>
                );
              })
            )}
          </div>

          {/* Game Over Overlay */}
          {gameOver && (
            <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-30 animate-fadeIn">
              <h2 className="text-3xl font-black mb-2 bg-gradient-to-r from-pink-400 to-yellow-400 bg-clip-text text-transparent">
                {score >= TARGET_SCORE ? "VICTORY!" : "GAME OVER"}
              </h2>
              <p className="text-sm text-slate-300 mb-6 font-medium">
                {score >= TARGET_SCORE ? `You smashed the target with ${score} points!` : "Better luck next time! Try again."}
              </p>
              <button
                onClick={resetGame}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold shadow-lg hover:opacity-90 transition cursor-pointer"
              >
                Play Again
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}