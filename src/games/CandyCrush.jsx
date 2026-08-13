import React, { useState, useEffect } from "react";
import { Sparkles, RotateCcw, Trophy, Flame, Zap, ArrowBigRight } from "lucide-react";

/*
  ============================================================
  ADVANCED CANDY CRUSH SAGA (Levels, Targets & Progressive Difficulty)
  ============================================================
*/

const BOARD_SIZE = 8;
const CANDIES = ["🍬", "🍭", "🍫", "🍩", "🧁", "🍪"]; // Custom candy visuals

// Level configuration settings
const LEVELS = {
  1: { targetScore: 600, maxMoves: 20 },
  2: { targetScore: 1000, maxMoves: 18 },
  3: { targetScore: 1500, maxMoves: 16 },
  4: { targetScore: 2000, maxMoves: 15 },
  5: { targetScore: 2500, maxMoves: 13 },
  6: { targetScore: 3000, maxMoves: 11 },
  7: { targetScore: 3500, maxMoves: 10 },
  8: { targetScore: 4000, maxMoves: 10 },
  9: { targetScore: 4500, maxMoves: 10 },
  10: { targetScore: 5000, maxMoves: 10 },
};

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
      if (c + 2 < BOARD_SIZE && board[r][c + 1] === candy && board[r][c + 2] === candy) return true;
      if (r + 2 < BOARD_SIZE && board[r + 1][c] === candy && board[r + 2][c] === candy) return true;
    }
  }
  return false;
};

export default function CandyCrush() {
  const [level, setLevel] = useState(1);
  const currentLevelConfig = LEVELS[level] || LEVELS[10];

  const [board, setBoard] = useState(createBoard);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(currentLevelConfig.maxMoves);
  const [selected, setSelected] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState(`Level ${level}: Match candies to reach ${currentLevelConfig.targetScore} points!`);
  const [combo, setCombo] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [levelCleared, setLevelCleared] = useState(false);

  // Initialize/Reset game for current or selected level
  const startLevel = (targetLevel) => {
    const config = LEVELS[targetLevel];
    setLevel(targetLevel);
    setBoard(createBoard());
    setScore(0);
    setMoves(config.maxMoves);
    setSelected(null);
    setIsProcessing(false);
    setCombo(0);
    setGameOver(false);
    setLevelCleared(false);
    setMessage(`Level ${targetLevel}: Reach ${config.targetScore} points within ${config.maxMoves} moves.`);
  };

  const resetCurrentLevel = () => {
    startLevel(level);
  };

  const nextLevel = () => {
    if (level < Object.keys(LEVELS).length) {
      startLevel(level + 1);
    } else {
      setMessage("🏆 Incredible! You have beaten all available levels!");
    }
  };

  const handleCandyClick = (r, c) => {
    if (isProcessing || gameOver || levelCleared) return;

    if (!selected) {
      setSelected({ r, c });
      setMessage(`Selected candy at [${r + 1}, ${c + 1}]. Pick an adjacent one to swap.`);
      return;
    }

    const prevR = selected.r;
    const prevC = selected.c;

    if (prevR === r && prevC === c) {
      setSelected(null);
      setMessage("Selection cleared.");
      return;
    }

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

    if (hasMatches(newBoard)) {
      setBoard(newBoard);
      setSelected(null);
      setMoves((m) => m - 1);
      setIsProcessing(true);
      setCombo(1);
    } else {
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

  // Cascade effect and match evaluation
  useEffect(() => {
    if (!isProcessing) return;

    const timer = setTimeout(() => {
      let currentBoard = board.map((row) => [...row]);
      let matchedCoords = new Set();

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
        const points = matchedCoords.size * 25 * combo;
        const newTotalScore = score + points;
        setScore(newTotalScore);
        setCombo((c) => c + 1);
        setMessage(`Matched! +${points} points (Combo x${combo})`);

        matchedCoords.forEach((coord) => {
          const [r, c] = coord.split(",").map(Number);
          currentBoard[r][c] = null;
        });

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
          for (let r = writeRow; r >= 0; r--) {
            currentBoard[r][c] = CANDIES[Math.floor(Math.random() * CANDIES.length)];
          }
        }

        setBoard(currentBoard);

        // Check if target score is reached mid-cascade
        if (newTotalScore >= currentLevelConfig.targetScore) {
          setLevelCleared(true);
          setIsProcessing(false);
          setMessage(`🎉 Level ${level} Cleared! Ready for next challenge.`);
          return;
        }
      } else {
        setIsProcessing(false);
        setCombo(0);

        if (score >= currentLevelConfig.targetScore) {
          setLevelCleared(true);
          setMessage(`🎉 Level ${level} Cleared! Ready for next challenge.`);
        } else if (moves <= 0) {
          setGameOver(true);
          setMessage("❌ Out of moves! Try again.");
        } else {
          setMessage("Your turn! Pick a candy.");
        }
      }
    }, 450);

    return () => clearTimeout(timer);
  }, [isProcessing, board, combo, moves, score, level, currentLevelConfig]);

  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 py-8 font-sans flex flex-col items-center justify-center">
      <div className="max-w-md w-full mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="flex items-center justify-between bg-slate-900/80 border border-white/10 p-4 rounded-3xl backdrop-blur-xl shadow-xl">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-bold tracking-wider uppercase">
              <Sparkles size={12} /> Level {level} / 10
            </div>
            <h1 className="mt-1 text-2xl font-black bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Candy Smash Saga
            </h1>
          </div>
          <button
            onClick={resetCurrentLevel}
            className="p-3 rounded-2xl bg-pink-600 hover:bg-pink-500 transition text-white shadow-lg cursor-pointer flex items-center gap-1.5 text-xs font-bold"
          >
            <RotateCcw size={16} /> Reset
          </button>
        </div>

        {/* Dashboard Metrics */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-slate-900/60 border border-white/10 p-3 rounded-2xl backdrop-blur-xl shadow-md">
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold flex items-center justify-center gap-1">
              <Trophy size={12} className="text-yellow-400" /> Score
            </p>
            <p className="text-xl font-black mt-1 text-yellow-400">{score} <span className="text-[10px] text-slate-500">/ {currentLevelConfig.targetScore}</span></p>
          </div>
          <div className="bg-slate-900/60 border border-white/10 p-3 rounded-2xl backdrop-blur-xl shadow-md">
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold flex items-center justify-center gap-1">
              <Zap size={12} className="text-cyan-400" /> Moves
            </p>
            <p className={`text-xl font-black mt-1 ${moves <= 4 ? "text-red-500 animate-pulse" : "text-cyan-400"}`}>{moves}</p>
          </div>
          <div className="bg-slate-900/60 border border-white/10 p-3 rounded-2xl backdrop-blur-xl shadow-md">
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold flex items-center justify-center gap-1">
              <Flame size={12} className="text-orange-400" /> Target
            </p>
            <p className="text-xl font-black mt-1 text-orange-400">{currentLevelConfig.targetScore}</p>
          </div>
        </div>

        {/* Status Notification Message */}
        <div className="bg-slate-900/40 border border-white/10 px-4 py-2.5 rounded-2xl text-center text-xs font-medium text-slate-300 shadow-inner">
          {message}
        </div>

        {/* Board Container */}
        <div className="bg-slate-900/80 border-4 border-pink-500/30 p-3 rounded-3xl backdrop-blur-xl shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-8 gap-1.5 aspect-square">
            {board.map((row, r) =>
              row.map((candy, c) => {
                const isSelected = selected && selected.r === r && selected.c === c;
                return (
                  <button
                    key={`${r}-${c}`}
                    disabled={gameOver || levelCleared || isProcessing}
                    onClick={() => handleCandyClick(r, c)}
                    className={`aspect-square rounded-xl flex items-center justify-center text-2xl sm:text-3xl transition-all transform active:scale-90 select-none ${
                      candy ? "bg-white/5 hover:bg-white/15 cursor-pointer shadow-sm" : "bg-transparent"
                    } ${
                      isSelected
                        ? "ring-4 ring-pink-400 bg-pink-500/25 scale-105 shadow-[0_0_15px_rgba(236,72,153,0.6)]"
                        : ""
                    }`}
                  >
                    {candy}
                  </button>
                );
              })
            )}
          </div>

          {/* Level Cleared Overlay */}
          {levelCleared && (
            <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-30 animate-fadeIn">
              <h2 className="text-3xl font-black mb-1 bg-gradient-to-r from-pink-400 to-yellow-400 bg-clip-text text-transparent">
                LEVEL {level} CLEARED!
              </h2>
              <p className="text-sm text-slate-300 mb-6 font-medium">
                Fantastic job! Ready to tackle higher difficulty?
              </p>
              {level < Object.keys(LEVELS).length ? (
                <button
                  onClick={nextLevel}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold shadow-lg hover:opacity-90 transition cursor-pointer flex items-center gap-2"
                >
                  Next Level <ArrowBigRight size={18} />
                </button>
              ) : (
                <button
                  onClick={() => startLevel(1)}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold shadow-lg hover:opacity-90 transition cursor-pointer"
                >
                  Play From Level 1
                </button>
              )}
            </div>
          )}

          {/* Game Over Overlay */}
          {gameOver && (
            <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-30 animate-fadeIn">
              <h2 className="text-3xl font-black mb-2 text-red-500">
                GAME OVER
              </h2>
              <p className="text-sm text-slate-300 mb-6 font-medium">
                You ran out of moves on Level {level}. Give it another shot!
              </p>
              <button
                onClick={resetCurrentLevel}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold shadow-lg hover:opacity-90 transition cursor-pointer"
              >
                Try Again
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}