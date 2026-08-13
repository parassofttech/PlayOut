import { useEffect, useMemo, useState } from "react";
import {
  CircleDot,
  RotateCcw,
  Trophy,
  Sparkles,
  Bot,
  User,
  Users,
} from "lucide-react";

/*
  ============================================================
  CLASSIC LUDO ARENA (Full Control: Human/CPU & 2/4 Players)
  ============================================================
*/

const COLORS = {
  red: {
    name: "Red",
    bg: "bg-red-600",
    light: "bg-red-950/50",
    text: "text-red-500",
    border: "border-red-600",
  },
  blue: {
    name: "Blue",
    bg: "bg-blue-600",
    light: "bg-blue-950/50",
    text: "text-blue-500",
    border: "border-blue-600",
  },
  yellow: {
    name: "Yellow",
    bg: "bg-yellow-400",
    light: "bg-yellow-950/50",
    text: "text-yellow-400",
    border: "border-yellow-400",
  },
  green: {
    name: "Green",
    bg: "bg-green-600",
    light: "bg-green-950/50",
    text: "text-green-500",
    border: "border-green-600",
  },
};

const SAFE_CELLS = [0, 8, 13, 21, 26, 34, 39, 47];

const TRACK = [
  [1, 6], [2, 6], [3, 6], [4, 6], [5, 6],
  [6, 5], [6, 4], [6, 3], [6, 2], [6, 1], [6, 0],
  [7, 0],
  [8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5],
  [9, 6], [10, 6], [11, 6], [12, 6], [13, 6], [14, 6],
  [14, 7],
  [14, 8], [13, 8], [12, 8], [11, 8], [10, 8], [9, 8],
  [8, 9], [8, 10], [8, 11], [8, 12], [8, 13], [8, 14],
  [7, 14],
  [6, 14], [6, 13], [6, 12], [6, 11], [6, 10], [6, 9],
  [5, 8], [4, 8], [3, 8], [2, 8], [1, 8], [0, 8],
  [0, 7],
  [0, 6],
];

const START_INDEX = {
  red: 0,
  blue: 13,
  yellow: 26,
  green: 39,
};

const HOME_LANES = {
  red: [[1, 7], [2, 7], [3, 7], [4, 7], [5, 7]],
  blue: [[7, 1], [7, 2], [7, 3], [7, 4], [7, 5]],
  yellow: [[13, 7], [12, 7], [11, 7], [10, 7], [9, 7]],
  green: [[7, 13], [7, 12], [7, 11], [7, 10], [7, 9]],
};

const FINISH_POSITION = 56;

const createInitialTokens = () => ({
  red: [-1, -1, -1, -1],
  blue: [-1, -1, -1, -1],
  yellow: [-1, -1, -1, -1],
  green: [-1, -1, -1, -1],
});

const getGlobalTrackPosition = (player, position) => {
  if (position < 0 || position > 50) return null;
  return (START_INDEX[player] + position) % 52;
};

const isSafeCell = (globalPosition) => {
  if (globalPosition === null) return false;
  return SAFE_CELLS.includes(globalPosition);
};

const getValidMoves = (player, dice, tokens) => {
  const result = [];
  tokens[player].forEach((position, index) => {
    if (position === -1) {
      if (dice === 6) result.push(index);
      return;
    }
    if (position >= FINISH_POSITION) return;

    const newPos = position + dice;
    if (newPos <= FINISH_POSITION) {
      result.push(index);
    }
  });
  return result;
};

export default function Ludo() {
  const [playerMode, setPlayerMode] = useState(4); // 2 or 4 players
  
  // Independent controller setup for each color (Human vs CPU)
  const [cpuPlayers, setCpuPlayers] = useState({
    red: false,
    blue: true,
    yellow: true,
    green: true,
  });

  const [tokens, setTokens] = useState(createInitialTokens());
  const [currentPlayer, setCurrentPlayer] = useState("red");
  const [dice, setDice] = useState(1);
  const [rolling, setRolling] = useState(false);
  const [hasRolled, setHasRolled] = useState(false);
  const [winner, setWinner] = useState(null);
  const [message, setMessage] = useState("Red's turn — roll the dice!");
  const [scores, setScores] = useState({ red: 0, blue: 0, yellow: 0, green: 0 });

  // 2-player mode utilizes Red and Yellow (opposite sides)
  const activePlayers = useMemo(() => {
    return playerMode === 2 ? ["red", "yellow"] : ["red", "blue", "yellow", "green"];
  }, [playerMode]);

  const isCurrentCpu = cpuPlayers[currentPlayer];

  const validMoves = useMemo(() => {
    if (!hasRolled || rolling) return [];
    return getValidMoves(currentPlayer, dice, tokens);
  }, [currentPlayer, dice, hasRolled, rolling, tokens]);

  const resetGame = () => {
    setTokens(createInitialTokens());
    setCurrentPlayer("red");
    setDice(1);
    setRolling(false);
    setHasRolled(false);
    setWinner(null);
    setMessage("Red's turn — roll the dice!");
    setScores({ red: 0, blue: 0, yellow: 0, green: 0 });
  };

  const handleModeChange = (mode) => {
    setPlayerMode(mode);
    let newCpu = { red: false, blue: true, yellow: true, green: true };
    if (mode === 2) {
      newCpu = { red: false, blue: false, yellow: false, green: false }; // Default 2P to All Human (Pass & Play)
    }
    setCpuPlayers(newCpu);
    resetGame();
  };

  const toggleCpu = (player) => {
    setCpuPlayers((prev) => ({ ...prev, [player]: !prev[player] }));
  };

  const nextPlayer = () => {
    const currentIndex = activePlayers.indexOf(currentPlayer);
    const nextIndex = (currentIndex + 1) % activePlayers.length;
    const next = activePlayers[nextIndex];

    setCurrentPlayer(next);
    setHasRolled(false);
    setDice(1);
    setMessage(`${COLORS[next].name}'s turn — roll the dice!`);
  };

  const checkWinner = (updatedTokens, player) => {
    const allFinished = updatedTokens[player].every((pos) => pos === FINISH_POSITION);
    if (allFinished) {
      setWinner(player);
      setMessage(`${COLORS[player].name} wins the match! 🏆`);
      return true;
    }
    return false;
  };

  const captureOpponents = (updatedTokens, player, movedTokenIndex) => {
    const movedPosition = updatedTokens[player][movedTokenIndex];
    if (movedPosition < 0 || movedPosition > 50) return updatedTokens;

    const globalPosition = getGlobalTrackPosition(player, movedPosition);
    if (isSafeCell(globalPosition)) return updatedTokens;

    const copy = { ...updatedTokens };
    activePlayers.forEach((otherPlayer) => {
      if (otherPlayer === player) return;
      copy[otherPlayer] = copy[otherPlayer].map((position) => {
        if (position >= 0 && position <= 50) {
          const otherGlobal = getGlobalTrackPosition(otherPlayer, position);
          if (otherGlobal === globalPosition) return -1; // Send back to yard
        }
        return position;
      });
    });
    return copy;
  };

  const moveToken = (tokenIndex) => {
    if (winner || !hasRolled || rolling || !validMoves.includes(tokenIndex)) return;

    const oldPosition = tokens[currentPlayer][tokenIndex];
    let newPosition;

    if (oldPosition === -1) {
      newPosition = 0;
    } else {
      let target = oldPosition + dice;
      if (oldPosition <= 50) {
        if (target > 50) {
          const excess = target - 51;
          newPosition = 51 + excess;
          if (newPosition > FINISH_POSITION) return;
        } else {
          newPosition = target;
        }
      } else {
        newPosition = target;
        if (newPosition > FINISH_POSITION) return;
      }
    }

    let updatedTokens = {
      ...tokens,
      [currentPlayer]: [...tokens[currentPlayer]],
    };
    updatedTokens[currentPlayer][tokenIndex] = newPosition;

    updatedTokens = captureOpponents(updatedTokens, currentPlayer, tokenIndex);
    setTokens(updatedTokens);

    setScores((prev) => ({
      ...prev,
      [currentPlayer]:
        prev[currentPlayer] +
        (newPosition === FINISH_POSITION ? 100 : oldPosition === -1 ? 15 : 5),
    }));

    setHasRolled(false);

    if (checkWinner(updatedTokens, currentPlayer)) return;

    if (dice === 6) {
      setMessage(`${COLORS[currentPlayer].name} rolled a 6 — roll again!`);
      setDice(1);
      setHasRolled(false);
      return;
    }

    nextPlayer();
  };

  const rollDice = () => {
    if (rolling || hasRolled || winner) return;

    setRolling(true);
    let counter = 0;

    const interval = setInterval(() => {
      setDice(Math.floor(Math.random() * 6) + 1);
      counter++;
      if (counter >= 9) {
        clearInterval(interval);
        const finalDice = Math.floor(Math.random() * 6) + 1;
        setDice(finalDice);
        setRolling(false);
        setHasRolled(true);

        const possibleMoves = getValidMoves(currentPlayer, finalDice, tokens);
        if (possibleMoves.length === 0) {
          setMessage(`${COLORS[currentPlayer].name} has no valid moves.`);
          setTimeout(() => {
            if (finalDice === 6) {
              setHasRolled(false);
              setMessage(`${COLORS[currentPlayer].name} rolled a 6 — roll again!`);
            } else {
              nextPlayer();
            }
          }, 800);
        } else {
          setMessage(`${COLORS[currentPlayer].name} rolled ${finalDice}. Pick a token.`);
        }
      }
    }, 60);
  };

  // CPU Automated Roll
  useEffect(() => {
    if (!isCurrentCpu || winner || rolling || hasRolled) return;
    const timer = setTimeout(() => {
      rollDice();
    }, 600);
    return () => clearTimeout(timer);
  }, [currentPlayer, isCurrentCpu, winner, rolling, hasRolled]);

  // CPU Automated Move
  useEffect(() => {
    if (!isCurrentCpu || winner || rolling || !hasRolled) return;
    if (validMoves.length === 0) return;

    const timer = setTimeout(() => {
      let selected = validMoves[0];
      const finishMove = validMoves.find(
        (idx) => tokens[currentPlayer][idx] >= 0 && tokens[currentPlayer][idx] + dice === FINISH_POSITION
      );
      if (finishMove !== undefined) {
        selected = finishMove;
      } else {
        const boardMove = validMoves.find((idx) => tokens[currentPlayer][idx] >= 0);
        if (boardMove !== undefined) selected = boardMove;
      }
      moveToken(selected);
    }, 700);

    return () => clearTimeout(timer);
  }, [isCurrentCpu, winner, rolling, hasRolled, validMoves, dice, currentPlayer, tokens]);

  const getTokensAtCell = (cellIndex) => {
    const result = [];
    activePlayers.forEach((player) => {
      tokens[player].forEach((position, tokenIndex) => {
        if (position >= 0 && position <= 50) {
          const global = getGlobalTrackPosition(player, position);
          if (global === cellIndex) {
            result.push({ player, tokenIndex });
          }
        }
      });
    });
    return result;
  };

  const getTokensAtHomeLane = (player, laneIndex) => {
    const result = [];
    tokens[player].forEach((position, tokenIndex) => {
      if (position >= 51 && position <= 55) {
        const currentLaneStep = position - 51;
        if (currentLaneStep === laneIndex) {
          result.push({ player, tokenIndex });
        }
      }
    });
    return result;
  };

  const renderTrackCell = (cellIndex) => {
    const tokensHere = getTokensAtCell(cellIndex);
    const safe = isSafeCell(cellIndex);

    let customBg = "bg-white border border-gray-300";
    if (cellIndex === 0) customBg = "bg-red-600 border border-red-700";
    else if (cellIndex === 13) customBg = "bg-blue-600 border border-blue-700";
    else if (cellIndex === 26) customBg = "bg-yellow-400 border border-yellow-500";
    else if (cellIndex === 39) customBg = "bg-green-600 border border-green-700";
    else if (safe) customBg = "bg-slate-100 border border-gray-300";

    return (
      <div className={`relative w-full h-full flex items-center justify-center ${customBg}`}>
        {safe && cellIndex !== 0 && cellIndex !== 13 && cellIndex !== 26 && cellIndex !== 39 && (
          <Sparkles size={8} className="absolute text-yellow-500/80" />
        )}
        <div className="flex flex-wrap justify-center gap-0.5 relative z-10 p-0.5">
          {tokensHere.map(({ player, tokenIndex }) => {
            const isClickable = player === currentPlayer && !isCurrentCpu && validMoves.includes(tokenIndex);
            return (
              <button
                key={`${player}-${tokenIndex}`}
                onClick={() => isClickable && moveToken(tokenIndex)}
                className={`rounded-full w-3.5 h-3.5 sm:w-4 sm:h-4 border border-white shadow-md transition-all ${
                  COLORS[player].bg
                } ${isClickable ? "animate-bounce cursor-pointer ring-2 ring-cyan-400 scale-125" : ""}`}
              />
            );
          })}
        </div>
      </div>
    );
  };

  const renderHomeLaneCell = (player, laneIndex) => {
    const tokensHere = getTokensAtHomeLane(player, laneIndex);
    const color = COLORS[player];

    return (
      <div
        key={`homelane-${player}-${laneIndex}`}
        className={`${color.bg} border border-white/20 flex items-center justify-center relative shadow-inner`}
      >
        <div className="flex flex-wrap justify-center gap-0.5 relative z-10">
          {tokensHere.map(({ tokenIndex }) => {
            const isClickable = player === currentPlayer && !isCurrentCpu && validMoves.includes(tokenIndex);
            return (
              <button
                key={`hl-${tokenIndex}`}
                onClick={() => isClickable && moveToken(tokenIndex)}
                className={`rounded-full w-3.5 h-3.5 sm:w-4 sm:h-4 border border-white shadow-md transition-all bg-white ${
                  color.text
                } ${isClickable ? "animate-bounce cursor-pointer ring-2 ring-cyan-400 scale-125" : ""}`}
              />
            );
          })}
        </div>
      </div>
    );
  };

  const renderYard = (player) => {
    const color = COLORS[player];
    const isActive = activePlayers.includes(player);

    if (!isActive) {
      return <div className="w-full h-full bg-gray-200 border-4 border-white opacity-40" />;
    }

    return (
      <div className={`w-full h-full ${color.bg} border-4 border-white p-3 sm:p-5 flex flex-col justify-between shadow-md relative`}>
        <div className="flex items-center justify-between">
          <span className="text-[10px] -mt-5 sm:text-xs font-black text-white uppercase tracking-wider">{color.name}</span>
          <button
            onClick={() => toggleCpu(player)}
            className="text-[9px] -mt-4 px-2 py-0.5 rounded-full font-bold bg-white/20 text-white border border-white/30 transition hover:bg-white/30 cursor-pointer"
          >
            {cpuPlayers[player] ? "🤖 CPU" : "👤 Human"}
          </button>
        </div>

        {/* White inner container for tokens */}
        <div className="absolute inset-5 sm:inset-7 bg-white rounded-2xl shadow-inner grid grid-cols-2 gap-2 sm:gap-3 p-4 sm:p-5">
          {[0, 1, 2, 3].map((tokenIndex) => {
            const position = tokens[player][tokenIndex];
            const isHome = position === -1;
            const canExit =
              player === currentPlayer && !isCurrentCpu && dice === 6 && hasRolled && isHome && validMoves.includes(tokenIndex);

            // Hide token from the home box once it starts moving onto the board/track
            if (!isHome) {
              return <div key={tokenIndex} />;
            }

            return (
              <button
                key={tokenIndex}
                disabled={!canExit}
                onClick={() => moveToken(tokenIndex)}
                className={`rounded-full shadow-md flex items-center justify-center transition-all ${
                  color.bg
                } ${canExit ? "animate-bounce scale-110 ring-4 ring-cyan-400 cursor-pointer" : ""}`}
              >
                <CircleDot size={14} className="text-white/90" />
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderCenter = () => (
    <div className="relative w-full h-full bg-white flex items-center justify-center overflow-hidden border border-gray-300">
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
        <div className="bg-red-600" />
        <div className="bg-blue-600" />
        <div className="bg-green-600" />
        <div className="bg-yellow-400" />
      </div>
      <div className="absolute inset-[30%] bg-white rounded-full border-2 border-gray-200 shadow-md flex items-center justify-center z-20">
        <Trophy size={20} className="text-yellow-500 animate-pulse" />
      </div>
    </div>
  );

  const renderBoard = () => {
    const cells = [];
    for (let row = 0; row < 15; row++) {
      for (let col = 0; col < 15; col++) {
        const trackIndex = TRACK.findIndex(([x, y]) => x === col && y === row);

        if (col >= 6 && col <= 8 && row >= 6 && row <= 8) {
          if (col === 6 && row === 6) {
            cells.push(<div key={`center-${row}-${col}`} className="col-span-3 row-span-3">{renderCenter()}</div>);
          }
          continue;
        }

        // Yard Red (Top-Left)
        if (col <= 5 && row <= 5) {
          if (col === 0 && row === 0) {
            cells.push(<div key={`yard-red-${row}-${col}`} className="col-span-6 row-span-6">{renderYard("red")}</div>);
          }
          continue;
        }

        // Yard Blue (Top-Right)
        if (col >= 9 && row <= 5) {
          if (col === 9 && row === 0) {
            cells.push(<div key={`yard-blue-${row}-${col}`} className="col-span-6 row-span-6">{renderYard("blue")}</div>);
          }
          continue;
        }

        // Yard Yellow (Bottom-Right)
        if (col >= 9 && row >= 9) {
          if (col === 9 && row === 9) {
            cells.push(<div key={`yard-yellow-${row}-${col}`} className="col-span-6 row-span-6">{renderYard("yellow")}</div>);
          }
          continue;
        }

        // Yard Green (Bottom-Left)
        if (col <= 5 && row >= 9) {
          if (col === 0 && row === 9) {
            cells.push(<div key={`yard-green-${row}-${col}`} className="col-span-6 row-span-6">{renderYard("green")}</div>);
          }
          continue;
        }

        // Home Lanes handling
        let homeHandled = false;
        Object.entries(HOME_LANES).forEach(([player, positions]) => {
          positions.forEach(([x, y], laneIndex) => {
            if (x === col && y === row) {
              if (playerMode === 2 && (player === "blue" || player === "green")) {
                return;
              }
              cells.push(renderHomeLaneCell(player, laneIndex));
              homeHandled = true;
            }
          });
        });
        if (homeHandled) continue;

        if (trackIndex !== -1) {
          cells.push(renderTrackCell(trackIndex));
          continue;
        }

        cells.push(<div key={`empty-${row}-${col}`} className="bg-gray-100" />);
      }
    }

    return (
      <div className="grid grid-cols-15 grid-rows-15 aspect-square w-full max-w-145 rounded-3xl overflow-hidden border-[6px] border-amber-400 bg-white shadow-2xl">
        {cells}
      </div>
    );
  };

  const diceFaces = { 1: "⚀", 2: "⚁", 3: "⚂", 4: "⚃", 5: "⚄", 6: "⚅" };

  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 sm:px-6 py-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold tracking-wider uppercase">
              <Sparkles size={14} /> Classic Ludo Master
            </div>
            <h1 className="mt-2 text-3xl sm:text-4xl font-black">
              Classic <span className="text-amber-400">Ludo</span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-900 p-1 rounded-2xl border border-white/10 flex items-center">
              <button
                onClick={() => handleModeChange(2)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  playerMode === 2 ? "bg-amber-400 text-slate-950 shadow-lg" : "text-slate-400 hover:text-white"
                }`}
              >
                2 Players
              </button>
              <button
                onClick={() => handleModeChange(4)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  playerMode === 4 ? "bg-amber-400 text-slate-950 shadow-lg" : "text-slate-400 hover:text-white"
                }`}
              >
                4 Players
              </button>
            </div>

            <button
              onClick={() => resetGame()}
              className="px-4 py-2.5 rounded-2xl bg-amber-500 text-slate-950 font-bold flex items-center gap-2 hover:bg-amber-400 transition shadow-lg cursor-pointer text-sm"
            >
              <RotateCcw size={16} /> Reset
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_340px] gap-8 items-start">
          <div className="flex  justify-center">{renderBoard()}</div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl p-6 max-sm:-mt-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex max-sm:-mt-4 items-center gap-3">
                  <div className={`w-10 h-10 rounded-2xl   ${COLORS[currentPlayer].bg} flex items-center justify-center shadow-md`}>
                    {isCurrentCpu ? <Bot size={20} className="text-white" /> : <User size={20} className="text-white" />}
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Current Turn</p>
                    <h2 className={`text-lg font-black ${COLORS[currentPlayer].text}`}>{COLORS[currentPlayer].name}</h2>
                  </div>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 font-bold text-slate-300">
                  {isCurrentCpu ? "🤖 CPU AI" : "👤 Human"}
                </span>
              </div>

              <p className="mt-4 max-sm:mt-0.5 text-slate-300 text-sm font-medium">{message}</p>

              <button
                onClick={rollDice}
                disabled={rolling || hasRolled || isCurrentCpu || !!winner}
                className={`mt-5 max-sm:mt-2 w-full h-32 max-sm:h-25 rounded-2xl border border-white/10 bg-slate-950 flex flex-col items-center justify-center transition ${
                  !hasRolled && !rolling && !isCurrentCpu && !winner
                    ? "hover:border-amber-400 hover:shadow-[0_0_25px_rgba(251,191,36,0.2)] cursor-pointer"
                    : "opacity-80 cursor-not-allowed"
                }`}
              >
                <span className={`text-6xl leading-none text-white ${rolling ? "animate-spin" : ""}`}>
                  {diceFaces[dice]}
                </span>
                <span className="mt-2 text-[10px] tracking-widest text-slate-400 font-bold">
                  {rolling ? "ROLLING..." : hasRolled ? "SELECT TOKEN" : isCurrentCpu ? "CPU THINKING..." : "CLICK TO ROLL"}
                </span>
              </button>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl p-5 shadow-xl">
              <h3 className="font-black text-sm uppercase tracking-wider mb-3 text-slate-300">Players Control Hub</h3>
              <div className="space-y-2.5">
                {activePlayers.map((player) => (
                  <div
                    key={player}
                    className={`flex items-center justify-between p-3 rounded-2xl border transition ${
                      player === currentPlayer ? "bg-white/5 border-white/20" : "border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-full ${COLORS[player].bg} border border-white/60`} />
                      <div>
                        <p className="font-bold text-sm">{COLORS[player].name}</p>
                        <p className="text-[10px] text-slate-400">
                          {cpuPlayers[player] ? "🤖 CPU Bot" : "👤 Human Player"}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleCpu(player)}
                      className={`text-xs px-3 py-1.5 rounded-xl font-bold border transition cursor-pointer ${
                        cpuPlayers[player]
                          ? "bg-purple-500/20 text-purple-300 border-purple-500/40 hover:bg-purple-500/30"
                          : "bg-cyan-500/20 text-cyan-300 border-cyan-500/40 hover:bg-cyan-500/30"
                      }`}
                    >
                      {cpuPlayers[player] ? "Make Human" : "Make CPU"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}