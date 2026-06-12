import { useEffect, useState } from "react";
import { Chess } from "chess.js";

function ChessGame() {
  const [game, setGame] = useState(new Chess());
  const [fen, setFen] = useState(new Chess().fen());
  const [selected, setSelected] = useState(null);

  const updateGame = (g) => {
    setGame(g);
    setFen(g.fen());
  };

  // PIECE VALUE (AI brain)
  const value = {
    p: 10,
    n: 30,
    b: 30,
    r: 50,
    q: 90,
    k: 900,
  };

  const evaluate = (g) => {
    const board = g.board();
    let score = 0;

    board.forEach((row) => {
      row.forEach((p) => {
        if (!p) return;
        score += p.color === "w"
          ? value[p.type]
          : -value[p.type];
      });
    });

    return score;
  };

  // SAFE MINIMAX (FIXED)
  const minimax = (g, depth, isMax) => {
    if (depth === 0 || g.isGameOver()) {
      return evaluate(g);
    }

    const moves = g.moves();

    if (isMax) {
      let best = -Infinity;

      for (let m of moves) {
        const temp = new Chess(g.fen());
        temp.move(m);

        best = Math.max(
          best,
          minimax(temp, depth - 1, false)
        );
      }

      return best;
    } else {
      let best = Infinity;

      for (let m of moves) {
        const temp = new Chess(g.fen());
        temp.move(m);

        best = Math.min(
          best,
          minimax(temp, depth - 1, true)
        );
      }

      return best;
    }
  };

  const bestMove = (g) => {
    const moves = g.moves();
    let best = null;
    let bestScore = -Infinity;

    for (let m of moves) {
      const temp = new Chess(g.fen());
      temp.move(m);

      const score = minimax(temp, 2, false);

      if (score > bestScore) {
        bestScore = score;
        best = m;
      }
    }

    return best;
  };

  const aiPlay = (g) => {
    const move = bestMove(g);
    if (move) g.move(move);
  };

  const handleClick = (r, c) => {
    const square =
      String.fromCharCode(97 + c) + (8 - r);

    const g = new Chess(game.fen());

    // select
    if (!selected) {
      const moves = g.moves({
        square,
        verbose: true,
      });

      if (moves.length === 0) return;

      setSelected(square);
      return;
    }

    // move
    const move = g.move({
      from: selected,
      to: square,
      promotion: "q",
    });

    if (!move) {
      setSelected(null);
      return;
    }

    setSelected(null);
    updateGame(g);

    // AI move
    setTimeout(() => {
      const newGame = new Chess(g.fen());
      aiPlay(newGame);
      updateGame(newGame);
    }, 250);
  };

  const restart = () => {
    const g = new Chess();
    updateGame(g);
    setSelected(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4">

      {/* Header */}
      <div className="flex gap-4 mb-4">
        <div className="px-4 py-2 bg-white/10 rounded-xl">
          ♟ Strong AI Chess
        </div>

        <button
          onClick={restart}
          className="px-4 py-2 bg-cyan-500 rounded-xl"
        >
          Restart
        </button>
      </div>

      {/* Board */}
      <div className="grid grid-cols-8 border-4 border-cyan-500 rounded-xl overflow-hidden">

        {game.board().map((row, r) =>
          row.map((cell, c) => {
            const dark = (r + c) % 2;

            return (
              <div
                key={r + "-" + c}
                onClick={() => handleClick(r, c)}
                className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-2xl cursor-pointer ${
                  dark
                    ? "bg-green-900"
                    : "bg-green-400"
                }`}
              >
                {cell ? renderPiece(cell) : ""}
              </div>
            );
          })
        )}
      </div>

      <p className="text-gray-400 mt-4 text-center">
        ✔ Fixed AI + Stable Gameplay + No Crash
      </p>
    </div>
  );
}

// Unicode pieces
function renderPiece(p) {
  const white = {
    p: "♙",
    r: "♖",
    n: "♘",
    b: "♗",
    q: "♕",
    k: "♔",
  };

  const black = {
    p: "♟",
    r: "♜",
    n: "♞",
    b: "♝",
    q: "♛",
    k: "♚",
  };

  return p.color === "w"
    ? white[p.type]
    : black[p.type];
}

export default ChessGame;