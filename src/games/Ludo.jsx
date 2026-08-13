import { useEffect, useMemo, useState } from "react";
import {
  CircleDot,
  Dice5,
  RotateCcw,
  Trophy,
  Users,
  Sparkles,
} from "lucide-react";

/*
  ============================================================
  LUDO GAME
  ============================================================

  4 Players:
  RED    = Human
  GREEN  = Computer
  YELLOW = Computer
  BLUE   = Computer

  Board:
  52 main-track cells + 6 home cells per player.

  Each token:
  position = -1  -> Yard / Home
  position = 0..51 -> Main track
  position = 52..57 -> Home lane
  position = 58 -> Finished
*/

const COLORS = {
  red: {
    name: "Red",
    bg: "bg-red-500",
    light: "bg-red-100",
    text: "text-red-600",
    border: "border-red-500",
    hex: "#ef4444",
    start: 0,
  },

  green: {
    name: "Green",
    bg: "bg-green-500",
    light: "bg-green-100",
    text: "text-green-600",
    border: "border-green-500",
    hex: "#22c55e",
    start: 13,
  },

  yellow: {
    name: "Yellow",
    bg: "bg-yellow-400",
    light: "bg-yellow-100",
    text: "text-yellow-600",
    border: "border-yellow-400",
    hex: "#facc15",
    start: 26,
  },

  blue: {
    name: "Blue",
    bg: "bg-blue-500",
    light: "bg-blue-100",
    text: "text-blue-600",
    border: "border-blue-500",
    hex: "#3b82f6",
    start: 39,
  },
};

const PLAYER_ORDER = [
  "red",
  "green",
  "yellow",
  "blue",
];

const SAFE_CELLS = [
  0,
  8,
  13,
  21,
  26,
  34,
  39,
  47,
];

/*
  Main track coordinates.
  Board is 15 x 15.
*/
const TRACK = [
  [6, 0],
  [7, 0],
  [8, 0],
  [9, 0],
  [10, 0],
  [11, 0],
  [12, 0],

  [12, 1],
  [12, 2],
  [12, 3],
  [12, 4],
  [12, 5],

  [13, 6],
  [14, 6],

  [14, 7],
  [14, 8],

  [13, 8],
  [12, 8],

  [12, 9],
  [12, 10],
  [12, 11],
  [12, 12],

  [11, 12],
  [10, 12],
  [9, 12],
  [8, 12],
  [7, 12],
  [6, 12],

  [6, 13],
  [6, 14],

  [5, 14],
  [4, 14],

  [4, 13],
  [4, 12],

  [3, 12],
  [2, 12],
  [1, 12],
  [0, 12],

  [0, 11],
  [0, 10],
  [0, 9],
  [0, 8],

  [1, 8],
  [2, 8],

  [2, 7],
  [2, 6],

  [1, 6],
  [0, 6],

  [0, 5],
  [0, 4],
  [0, 3],
  [0, 2],
  [0, 1],

  [1, 0],
  [2, 0],
  [3, 0],
  [4, 0],
  [5, 0],
];

/*
  Home lanes.
*/
const HOME_LANES = {
  red: [
    [7, 1],
    [7, 2],
    [7, 3],
    [7, 4],
    [7, 5],
  ],

  green: [
    [13, 7],
    [12, 7],
    [11, 7],
    [10, 7],
    [9, 7],
  ],

  yellow: [
    [7, 13],
    [7, 12],
    [7, 11],
    [7, 10],
    [7, 9],
  ],

  blue: [
    [1, 7],
    [2, 7],
    [3, 7],
    [4, 7],
    [5, 7],
  ],
};

/*
  Yard positions.
*/
const YARD_POSITIONS = {
  red: [
    [2, 2],
    [4, 2],
    [2, 4],
    [4, 4],
  ],

  green: [
    [10, 2],
    [12, 2],
    [10, 4],
    [12, 4],
  ],

  yellow: [
    [10, 10],
    [12, 10],
    [10, 12],
    [12, 12],
  ],

  blue: [
    [2, 10],
    [4, 10],
    [2, 12],
    [4, 12],
  ],
};

/*
  Each player starts from this point
  on the common track.
*/
const START_INDEX = {
  red: 0,
  green: 13,
  yellow: 26,
  blue: 39,
};

const FINISH_POSITION = 58;

const createInitialTokens = () => ({
  red: [-1, -1, -1, -1],
  green: [-1, -1, -1, -1],
  yellow: [-1, -1, -1, -1],
  blue: [-1, -1, -1, -1],
});

const getGlobalTrackPosition = (player, position) => {
  if (position < 0 || position >= 52) {
    return null;
  }

  return (
    (START_INDEX[player] + position) % 52
  );
};

const isSafeCell = (globalPosition) => {
  return SAFE_CELLS.includes(globalPosition);
};

const getValidMoves = (
  player,
  dice,
  tokens
) => {
  const result = [];

  tokens[player].forEach(
    (position, index) => {
      /*
        Token in yard.
        Must roll 6.
      */
      if (position === -1) {
        if (dice === 6) {
          result.push(index);
        }

        return;
      }

      /*
        Already finished.
      */
      if (position >= FINISH_POSITION) {
        return;
      }

      /*
        Cannot move beyond finish.
      */
      if (
        position + dice >
        FINISH_POSITION
      ) {
        return;
      }

      result.push(index);
    }
  );

  return result;
};

const Ludo = () => {
  const [tokens, setTokens] = useState(
    createInitialTokens()
  );

  const [currentPlayer, setCurrentPlayer] =
    useState("red");

  const [dice, setDice] = useState(1);

  const [rolling, setRolling] =
    useState(false);

  const [hasRolled, setHasRolled] =
    useState(false);

  const [winner, setWinner] =
    useState(null);

  const [message, setMessage] =
    useState("Red's turn — roll the dice!");

  const [scores, setScores] = useState({
    red: 0,
    green: 0,
    yellow: 0,
    blue: 0,
  });

  const [lastMove, setLastMove] =
    useState(null);

  const [turnNumber, setTurnNumber] =
    useState(1);

  const isComputer =
    currentPlayer !== "red";

  const validMoves = useMemo(() => {
    if (!hasRolled || rolling) {
      return [];
    }

    return getValidMoves(
      currentPlayer,
      dice,
      tokens
    );
  }, [
    currentPlayer,
    dice,
    hasRolled,
    rolling,
    tokens,
  ]);

  const resetGame = () => {
    setTokens(createInitialTokens());
    setCurrentPlayer("red");
    setDice(1);
    setRolling(false);
    setHasRolled(false);
    setWinner(null);
    setMessage(
      "Red's turn — roll the dice!"
    );
    setScores({
      red: 0,
      green: 0,
      yellow: 0,
      blue: 0,
    });
    setLastMove(null);
    setTurnNumber(1);
  };

  const nextPlayer = () => {
    const currentIndex =
      PLAYER_ORDER.indexOf(currentPlayer);

    const nextIndex =
      (currentIndex + 1) %
      PLAYER_ORDER.length;

    const next =
      PLAYER_ORDER[nextIndex];

    setCurrentPlayer(next);
    setHasRolled(false);
    setDice(1);
    setTurnNumber(
      (prev) => prev + 1
    );

    setMessage(
      `${COLORS[next].name}'s turn`
    );
  };

  const checkWinner = (
    updatedTokens,
    player
  ) => {
    const allFinished =
      updatedTokens[player].every(
        (position) =>
          position === FINISH_POSITION
      );

    if (allFinished) {
      setWinner(player);

      setMessage(
        `${COLORS[player].name} wins the game!`
      );

      return true;
    }

    return false;
  };

  const captureOpponents = (
    updatedTokens,
    player,
    movedTokenIndex
  ) => {
    const movedPosition =
      updatedTokens[player][
        movedTokenIndex
      ];

    /*
      Home lane / finish cannot capture.
    */
    if (
      movedPosition < 0 ||
      movedPosition >= 52
    ) {
      return updatedTokens;
    }

    const globalPosition =
      getGlobalTrackPosition(
        player,
        movedPosition
      );

    /*
      Safe cells cannot capture.
    */
    if (isSafeCell(globalPosition)) {
      return updatedTokens;
    }

    const copy = {
      ...updatedTokens,
    };

    PLAYER_ORDER.forEach(
      (otherPlayer) => {
        if (otherPlayer === player) {
          return;
        }

        copy[otherPlayer] = [
          ...copy[otherPlayer],
        ];

        copy[otherPlayer] =
          copy[otherPlayer].map(
            (position) => {
              if (
                position >= 0 &&
                position < 52
              ) {
                const otherGlobal =
                  getGlobalTrackPosition(
                    otherPlayer,
                    position
                  );

                if (
                  otherGlobal ===
                  globalPosition
                ) {
                  return -1;
                }
              }

              return position;
            }
          );
      }
    );

    return copy;
  };

  const moveToken = (
    tokenIndex
  ) => {
    if (
      winner ||
      !hasRolled ||
      rolling ||
      !validMoves.includes(
        tokenIndex
      )
    ) {
      return;
    }

    const oldPosition =
      tokens[currentPlayer][
        tokenIndex
      ];

    let newPosition;

    if (oldPosition === -1) {
      newPosition = 0;
    } else {
      newPosition =
        oldPosition + dice;
    }

    let updatedTokens = {
      ...tokens,
      [currentPlayer]: [
        ...tokens[currentPlayer],
      ],
    };

    updatedTokens[currentPlayer][
      tokenIndex
    ] = newPosition;

    /*
      Capture.
    */
    updatedTokens =
      captureOpponents(
        updatedTokens,
        currentPlayer,
        tokenIndex
      );

    setTokens(updatedTokens);

    /*
      Score.
    */
    setScores((prev) => ({
      ...prev,
      [currentPlayer]:
        prev[currentPlayer] +
        (newPosition ===
        FINISH_POSITION
          ? 100
          : oldPosition === -1
          ? 10
          : 5),
    }));

    setLastMove({
      player: currentPlayer,
      tokenIndex,
    });

    setHasRolled(false);

    /*
      Winner.
    */
    if (
      checkWinner(
        updatedTokens,
        currentPlayer
      )
    ) {
      return;
    }

    /*
      Six gives another turn.
    */
    if (dice === 6) {
      setMessage(
        `${COLORS[currentPlayer].name} rolled 6 — roll again!`
      );

      setDice(1);
      setHasRolled(false);

      return;
    }

    nextPlayer();
  };

  const rollDice = () => {
    if (
      rolling ||
      hasRolled ||
      winner
    ) {
      return;
    }

    setRolling(true);

    let counter = 0;

    const interval = setInterval(() => {
      const random =
        Math.floor(
          Math.random() * 6
        ) + 1;

      setDice(random);

      counter++;

      if (counter >= 10) {
        clearInterval(interval);

        const finalDice =
          Math.floor(
            Math.random() * 6
          ) + 1;

        setDice(finalDice);
        setRolling(false);
        setHasRolled(true);

        const possibleMoves =
          getValidMoves(
            currentPlayer,
            finalDice,
            tokens
          );

        if (
          possibleMoves.length === 0
        ) {
          setMessage(
            `${COLORS[currentPlayer].name} has no possible move.`
          );

          setTimeout(() => {
            if (
              finalDice === 6
            ) {
              setHasRolled(false);

              setMessage(
                `${COLORS[currentPlayer].name} rolled 6 — roll again!`
              );
            } else {
              nextPlayer();
            }
          }, 800);
        } else {
          setMessage(
            `${COLORS[currentPlayer].name} rolled ${finalDice}. Choose a token.`
          );
        }
      }
    }, 80);
  };

  /*
    Computer AI.
  */
  useEffect(() => {
    if (
      !isComputer ||
      winner ||
      rolling ||
      hasRolled
    ) {
      return;
    }

    const timer = setTimeout(() => {
      rollDice();
    }, 900);

    return () =>
      clearTimeout(timer);
  }, [
    currentPlayer,
    isComputer,
    winner,
    rolling,
    hasRolled,
  ]);

  /*
    Computer chooses a token.
  */
  useEffect(() => {
    if (
      !isComputer ||
      winner ||
      rolling ||
      !hasRolled
    ) {
      return;
    }

    if (validMoves.length === 0) {
      return;
    }

    const timer = setTimeout(() => {
      let selected =
        validMoves[0];

      /*
        Prefer finishing token.
      */
      const finishMove =
        validMoves.find(
          (index) =>
            tokens[currentPlayer][
              index
            ] >= 0 &&
            tokens[currentPlayer][
              index
            ] +
              dice ===
              FINISH_POSITION
        );

      if (finishMove !== undefined) {
        selected = finishMove;
      } else {
        /*
          Prefer token already on board.
        */
        const boardMove =
          validMoves.find(
            (index) =>
              tokens[currentPlayer][
                index
              ] >= 0
          );

        if (
          boardMove !== undefined
        ) {
          selected = boardMove;
        }
      }

      moveToken(selected);
    }, 800);

    return () =>
      clearTimeout(timer);
  }, [
    isComputer,
    winner,
    rolling,
    hasRolled,
    validMoves,
    dice,
    currentPlayer,
    tokens,
  ]);

  /*
    Get tokens displayed on track.
  */
  const getTokensAtCell = (
    cellIndex
  ) => {
    const result = [];

    PLAYER_ORDER.forEach(
      (player) => {
        tokens[player].forEach(
          (position, tokenIndex) => {
            if (
              position >= 0 &&
              position < 52
            ) {
              const global =
                getGlobalTrackPosition(
                  player,
                  position
                );

              if (
                global === cellIndex
              ) {
                result.push({
                  player,
                  tokenIndex,
                });
              }
            }
          }
        );
      }
    );

    return result;
  };

  const renderTrackCell = (
    cellIndex
  ) => {
    const tokensHere =
      getTokensAtCell(cellIndex);

    const safe =
      isSafeCell(cellIndex);

    return (
      <div
        key={cellIndex}
        className={`
          relative
          w-full
          h-full
          bg-white
          border
          border-slate-200
          flex
          items-center
          justify-center
          ${safe ? "bg-yellow-50" : ""}
        `}
      >
        {safe && (
          <Sparkles
            size={12}
            className="absolute text-yellow-400"
          />
        )}

        <div className="flex flex-wrap justify-center gap-0.5 relative z-10">
          {tokensHere.map(
            ({
              player,
              tokenIndex,
            }) => (
              <button
                key={`${player}-${tokenIndex}`}
                onClick={() =>
                  player ===
                    currentPlayer &&
                  validMoves.includes(
                    tokenIndex
                  ) &&
                  moveToken(tokenIndex)
                }
                className={`
                  rounded-full
                  w-5
                  h-5
                  sm:w-6
                  sm:h-6
                  border-2
                  border-white
                  shadow-md
                  transition
                  ${
                    COLORS[player].bg
                  }
                  ${
                    player ===
                      currentPlayer &&
                    validMoves.includes(
                      tokenIndex
                    )
                      ? "animate-bounce cursor-pointer ring-2 ring-white"
                      : ""
                  }
                `}
                title={`${COLORS[player].name} token`}
              >
                <span className="text-[8px] font-black text-white">
                  {tokenIndex + 1}
                </span>
              </button>
            )
          )}
        </div>
      </div>
    );
  };

  /*
    Yard.
  */
  const renderYard = (
    player
  ) => {
    const color =
      COLORS[player];

    return (
      <div
        className={`
          relative
          w-full
          h-full
          ${color.light}
          border-4
          ${color.border}
          rounded-2xl
          p-2
          sm:p-4
        `}
      >
        <div className="absolute top-2 left-2 flex items-center gap-1">
          <div
            className={`w-3 h-3 rounded-full ${color.bg}`}
          />

          <span
            className={`text-xs sm:text-sm font-black ${color.text}`}
          >
            {color.name}
          </span>
        </div>

        <div className="absolute inset-0 grid grid-cols-2 gap-2 p-7 sm:p-10">
          {[0, 1, 2, 3].map(
            (tokenIndex) => {
              const position =
                tokens[player][
                  tokenIndex
                ];

              const canExit =
                player ===
                  currentPlayer &&
                dice === 6 &&
                hasRolled &&
                position === -1 &&
                validMoves.includes(
                  tokenIndex
                );

              return (
                <button
                  key={tokenIndex}
                  disabled={!canExit}
                  onClick={() =>
                    moveToken(
                      tokenIndex
                    )
                  }
                  className={`
                    rounded-full
                    border-4
                    border-white
                    shadow-lg
                    flex
                    items-center
                    justify-center
                    transition-all
                    ${
                      color.bg
                    }
                    ${
                      canExit
                        ? "animate-bounce scale-110 ring-4 ring-white/70 cursor-pointer"
                        : ""
                    }
                  `}
                >
                  <CircleDot
                    size={22}
                    className="text-white/80"
                  />
                </button>
              );
            }
          )}
        </div>
      </div>
    );
  };

  /*
    Center home.
  */
  const renderCenter = () => {
    return (
      <div className="relative w-full h-full overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
          <div className="bg-red-500" />
          <div className="bg-green-500" />
          <div className="bg-blue-500" />
          <div className="bg-yellow-400" />
        </div>

        <div
          className="
            absolute
            inset-[22%]
            bg-white
            rounded-full
            border-4
            border-slate-200
            shadow-xl
            flex
            items-center
            justify-center
          "
        >
          <div className="text-center">
            <Trophy
              size={28}
              className="mx-auto text-yellow-500"
            />

            <span className="block text-[10px] sm:text-xs font-black text-slate-700 mt-1">
              HOME
            </span>
          </div>
        </div>
      </div>
    );
  };

  /*
    Render complete board.
  */
  const renderBoard = () => {
    const cells = [];

    for (let row = 0; row < 15; row++) {
      for (
        let col = 0;
        col < 15;
        col++
      ) {
        const trackIndex =
          TRACK.findIndex(
            ([x, y]) =>
              x === col &&
              y === row
          );

        /*
          Center.
        */
        if (
          col >= 6 &&
          col <= 8 &&
          row >= 6 &&
          row <= 8
        ) {
          if (
            col === 6 &&
            row === 6
          ) {
            cells.push(
              <div
                key={`${row}-${col}`}
                className="bg-white"
              >
                {renderCenter()}
              </div>
            );
          } else {
            cells.push(
              <div
                key={`${row}-${col}`}
                className="bg-white"
              />
            );
          }

          continue;
        }

        /*
          Home yards.
        */
        if (
          col <= 5 &&
          row <= 5
        ) {
          if (
            col === 0 &&
            row === 0
          ) {
            cells.push(
              <div
                key={`${row}-${col}`}
                className="col-span-6 row-span-6"
              >
                {renderYard("red")}
              </div>
            );
          }

          continue;
        }

        if (
          col >= 9 &&
          row <= 5
        ) {
          if (
            col === 9 &&
            row === 0
          ) {
            cells.push(
              <div
                key={`${row}-${col}`}
                className="col-span-6 row-span-6"
              >
                {renderYard("green")}
              </div>
            );
          }

          continue;
        }

        if (
          col >= 9 &&
          row >= 9
        ) {
          if (
            col === 9 &&
            row === 9
          ) {
            cells.push(
              <div
                key={`${row}-${col}`}
                className="col-span-6 row-span-6"
              >
                {renderYard("yellow")}
              </div>
            );
          }

          continue;
        }

        if (
          col <= 5 &&
          row >= 9
        ) {
          if (
            col === 0 &&
            row === 9
          ) {
            cells.push(
              <div
                key={`${row}-${col}`}
                className="col-span-6 row-span-6"
              >
                {renderYard("blue")}
              </div>
            );
          }

          continue;
        }

        /*
          Home lanes.
        */
        let homePlayer = null;

        Object.entries(
          HOME_LANES
        ).forEach(
          ([player, positions]) => {
            positions.forEach(
              ([x, y]) => {
                if (
                  x === col &&
                  y === row
                ) {
                  homePlayer =
                    player;
                }
              }
            );
          }
        );

        if (homePlayer) {
          const playerIndex =
            HOME_LANES[
              homePlayer
            ].findIndex(
              ([x, y]) =>
                x === col &&
                y === row
            );

          cells.push(
            <div
              key={`${row}-${col}`}
              className={`
                ${
                  COLORS[
                    homePlayer
                  ].light
                }
                border
                border-white
                flex
                items-center
                justify-center
              `}
            >
              <div
                className={`
                  w-5
                  h-5
                  sm:w-6
                  sm:h-6
                  rounded-full
                  ${
                    COLORS[
                      homePlayer
                    ].bg
                  }
                  ${
                    playerIndex ===
                    4
                      ? "ring-2 ring-white"
                      : ""
                  }
                `}
              />
            </div>
          );

          continue;
        }

        /*
          Track.
        */
        if (trackIndex !== -1) {
          cells.push(
            renderTrackCell(
              trackIndex
            )
          );

          continue;
        }

        /*
          Empty board cells.
        */
        cells.push(
          <div
            key={`${row}-${col}`}
            className="bg-slate-50"
          />
        );
      }
    }

    return (
      <div
        className="
          grid
          grid-cols-[repeat(15,minmax(0,1fr))]
          grid-rows-[repeat(15,minmax(0,1fr))]
          aspect-square
          w-full
          max-w-[680px]
          rounded-2xl
          overflow-hidden
          border-4
          border-slate-800
          bg-white
          shadow-[0_0_60px_rgba(6,182,212,0.18)]
        "
      >
        {cells}
      </div>
    );
  };

  const diceFaces = {
    1: "⚀",
    2: "⚁",
    3: "⚂",
    4: "⚃",
    5: "⚄",
    6: "⚅",
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white px-3 sm:px-5 py-8 overflow-x-hidden">

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/10 blur-3xl rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-5 mb-8">

          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-bold">
              <Sparkles size={16} />
              Classic Multiplayer
            </div>

            <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-black">
              <span className="text-white">
                Ludo
              </span>{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                Arena
              </span>
            </h1>

            <p className="mt-2 text-gray-400">
              Roll the dice. Move your tokens.
              Reach HOME first!
            </p>
          </div>

          <button
            onClick={resetGame}
            className="
              px-6
              py-3
              rounded-2xl
              bg-gradient-to-r
              from-cyan-500
              to-purple-600
              font-bold
              flex
              items-center
              gap-2
              hover:scale-105
              transition
              shadow-lg
            "
          >
            <RotateCcw size={18} />
            New Game
          </button>
        </div>

        {/* Main */}
        <div className="grid lg:grid-cols-[1fr_330px] gap-8 items-start">

          {/* Board */}
          <div className="flex justify-center">
            {renderBoard()}
          </div>

          {/* Right Panel */}
          <div className="space-y-5">

            {/* Turn Card */}
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">

              <div className="flex items-center gap-3">
                <div
                  className={`
                    w-12
                    h-12
                    rounded-2xl
                    ${
                      COLORS[
                        currentPlayer
                      ].bg
                    }
                    flex
                    items-center
                    justify-center
                    shadow-lg
                  `}
                >
                  <Users
                    size={24}
                    className="text-white"
                  />
                </div>

                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">
                    Current Turn
                  </p>

                  <h2
                    className={`
                      text-xl
                      font-black
                      ${
                        COLORS[
                          currentPlayer
                        ].text
                      }
                    `}
                  >
                    {
                      COLORS[
                        currentPlayer
                      ].name
                    }
                  </h2>
                </div>
              </div>

              <p className="mt-5 text-gray-300 text-sm">
                {message}
              </p>

              {/* Dice */}
              <button
                onClick={rollDice}
                disabled={
                  rolling ||
                  hasRolled ||
                  isComputer ||
                  !!winner
                }
                className={`
                  mt-6
                  w-full
                  h-36
                  rounded-3xl
                  border-2
                  border-white/10
                  bg-slate-950
                  flex
                  flex-col
                  items-center
                  justify-center
                  transition
                  ${
                    !hasRolled &&
                    !rolling &&
                    !isComputer &&
                    !winner
                      ? "hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,.25)] cursor-pointer"
                      : "opacity-90"
                  }
                `}
              >
                <span
                  className={`
                    text-7xl
                    leading-none
                    ${
                      rolling
                        ? "animate-spin"
                        : ""
                    }
                  `}
                >
                  {diceFaces[dice]}
                </span>

                <span className="mt-2 text-xs text-gray-500">
                  {rolling
                    ? "ROLLING..."
                    : hasRolled
                    ? "SELECT TOKEN"
                    : isComputer
                    ? "COMPUTER TURN"
                    : "ROLL DICE"}
                </span>
              </button>

              {hasRolled &&
                validMoves.length >
                  0 &&
                !isComputer && (
                  <p className="mt-3 text-center text-cyan-400 text-xs font-bold animate-pulse">
                    Choose a glowing token
                  </p>
                )}
            </div>

            {/* Players */}
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">

              <h3 className="font-black text-lg mb-4">
                Players
              </h3>

              <div className="space-y-3">
                {PLAYER_ORDER.map(
                  (player) => (
                    <div
                      key={player}
                      className={`
                        flex
                        items-center
                        justify-between
                        p-3
                        rounded-2xl
                        border
                        transition
                        ${
                          player ===
                          currentPlayer
                            ? "bg-white/10 border-white/20"
                            : "border-transparent"
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`
                            w-9
                            h-9
                            rounded-full
                            ${
                              COLORS[
                                player
                              ].bg
                            }
                            border-2
                            border-white
                          `}
                        />

                        <div>
                          <p className="font-bold text-sm">
                            {
                              COLORS[
                                player
                              ].name
                            }
                          </p>

                          <p className="text-xs text-gray-500">
                            {player ===
                            "red"
                              ? "You"
                              : "Computer"}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="font-black text-sm">
                          {
                            scores[
                              player
                            ]
                          }
                        </p>

                        <p className="text-[10px] text-gray-500">
                          POINTS
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Rules */}
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">

              <h3 className="font-black mb-3">
                Quick Rules
              </h3>

              <ul className="space-y-2 text-xs text-gray-400">
                <li>
                  🎲 Roll a 6 to bring a
                  token out.
                </li>

                <li>
                  🎯 Click a valid token
                  to move it.
                </li>

                <li>
                  🛡️ Star cells are safe
                  zones.
                </li>

                <li>
                  💥 Land on opponents to
                  send them home.
                </li>

                <li>
                  🏁 Reach the center with
                  all 4 tokens to win.
                </li>

                <li>
                  🔄 Rolling 6 gives you
                  another turn.
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Info */}
        <div className="mt-8 grid sm:grid-cols-3 gap-4">

          <div className="rounded-2xl bg-white/5 border border-white/10 p-4 text-center">
            <p className="text-2xl font-black text-cyan-400">
              {turnNumber}
            </p>
            <p className="text-xs text-gray-500">
              TURN
            </p>
          </div>

          <div className="rounded-2xl bg-white/5 border border-white/10 p-4 text-center">
            <p className="text-2xl font-black text-purple-400">
              4
            </p>
            <p className="text-xs text-gray-500">
              PLAYERS
            </p>
          </div>

          <div className="rounded-2xl bg-white/5 border border-white/10 p-4 text-center">
            <p className="text-2xl font-black text-yellow-400">
              {SAFE_CELLS.length}
            </p>
            <p className="text-xs text-gray-500">
              SAFE CELLS
            </p>
          </div>

        </div>
      </div>

      {/* Winner Modal */}
      {winner && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-5">

          <div className="w-full max-w-md rounded-[32px] border border-white/10 bg-[#0b1120] p-8 text-center shadow-2xl">

            <div
              className={`
                mx-auto
                w-24
                h-24
                rounded-full
                ${
                  COLORS[
                    winner
                  ].bg
                }
                flex
                items-center
                justify-center
                shadow-[0_0_50px_rgba(255,255,255,.15)]
              `}
            >
              <Trophy
                size={48}
                className="text-white"
              />
            </div>

            <p className="mt-6 text-sm text-gray-500 uppercase tracking-[0.3em]">
              Winner
            </p>

            <h2
              className={`
                mt-2
                text-5xl
                font-black
                ${
                  COLORS[
                    winner
                  ].text
                }
              `}
            >
              {
                COLORS[
                  winner
                ].name
              }
            </h2>

            <p className="mt-4 text-gray-400">
              Congratulations! All four
              tokens reached HOME.
            </p>

            <button
              onClick={resetGame}
              className="
                mt-7
                w-full
                py-4
                rounded-2xl
                bg-gradient-to-r
                from-cyan-500
                to-purple-600
                font-black
                hover:scale-[1.02]
                transition
              "
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ludo;