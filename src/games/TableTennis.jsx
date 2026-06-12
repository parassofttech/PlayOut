import { useEffect, useRef, useState } from "react";

function TableTennis() {
  const BOARD_WIDTH = 340;
  const BOARD_HEIGHT = 600;

  const PADDLE_WIDTH = 90;
  const PADDLE_HEIGHT = 14;

  const BALL_SIZE = 16;

  const moveRef = useRef(null);

  const [playerX, setPlayerX] = useState(
    BOARD_WIDTH / 2 - PADDLE_WIDTH / 2
  );

  const [aiX, setAiX] = useState(
    BOARD_WIDTH / 2 - PADDLE_WIDTH / 2
  );

  const [playerScore, setPlayerScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);

  const [ball, setBall] = useState({
    x: BOARD_WIDTH / 2,
    y: BOARD_HEIGHT / 2,
    dx: 4,
    dy: 4,
  });

  const [winner, setWinner] = useState("");

  const resetBall = (direction) => {
    setBall({
      x: BOARD_WIDTH / 2,
      y: BOARD_HEIGHT / 2,
      dx: Math.random() > 0.5 ? 4 : -4,
      dy: direction,
    });
  };

  const restartGame = () => {
    setPlayerScore(0);
    setAiScore(0);
    setWinner("");

    setPlayerX(
      BOARD_WIDTH / 2 - PADDLE_WIDTH / 2
    );

    setAiX(
      BOARD_WIDTH / 2 - PADDLE_WIDTH / 2
    );

    setBall({
      x: BOARD_WIDTH / 2,
      y: BOARD_HEIGHT / 2,
      dx: 4,
      dy: 4,
    });
  };

  // Desktop Controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (winner) return;

      if (e.key === "ArrowLeft") {
        setPlayerX((prev) =>
          Math.max(0, prev - 30)
        );
      }

      if (e.key === "ArrowRight") {
        setPlayerX((prev) =>
          Math.min(
            BOARD_WIDTH - PADDLE_WIDTH,
            prev + 30
          )
        );
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, [winner]);

  // Mobile Hold Controls
  const startMoveLeft = () => {
    clearInterval(moveRef.current);

    moveRef.current = setInterval(() => {
      setPlayerX((prev) =>
        Math.max(0, prev - 8)
      );
    }, 16);
  };

  const startMoveRight = () => {
    clearInterval(moveRef.current);

    moveRef.current = setInterval(() => {
      setPlayerX((prev) =>
        Math.min(
          BOARD_WIDTH - PADDLE_WIDTH,
          prev + 8
        )
      );
    }, 16);
  };

  const stopMove = () => {
    clearInterval(moveRef.current);
  };

  // Game Loop
  useEffect(() => {
    if (winner) return;

    const gameLoop = setInterval(() => {
      setBall((prev) => {
        let x = prev.x + prev.dx;
        let y = prev.y + prev.dy;

        let dx = prev.dx;
        let dy = prev.dy;

        // Side Walls
        if (
          x <= 0 ||
          x >= BOARD_WIDTH - BALL_SIZE
        ) {
          dx *= -1;
        }

        // AI Paddle (Top)
        if (
          y <= 35 &&
          x + BALL_SIZE >= aiX &&
          x <= aiX + PADDLE_WIDTH
        ) {
          dy = Math.abs(dy) + 0.15;
        }

        // Player Paddle (Bottom)
        if (
          y >=
            BOARD_HEIGHT -
              55 -
              BALL_SIZE &&
          x + BALL_SIZE >= playerX &&
          x <= playerX + PADDLE_WIDTH
        ) {
          dy = -Math.abs(dy) - 0.15;
        }

        // AI Scores
        if (y > BOARD_HEIGHT) {
          const newScore = aiScore + 1;

          setAiScore(newScore);

          if (newScore >= 10) {
            setWinner("AI Wins 🤖");
          }

          resetBall(-4);
          return prev;
        }

        // Player Scores
        if (y < 0) {
          const newScore =
            playerScore + 1;

          setPlayerScore(newScore);

          if (newScore >= 10) {
            setWinner("You Win 🏆");
          }

          resetBall(4);
          return prev;
        }

        return {
          x,
          y,
          dx,
          dy,
        };
      });

      // Smart AI
      setAiX((prev) => {
        const center =
          prev + PADDLE_WIDTH / 2;

        if (ball.x > center + 10) {
          return Math.min(
            BOARD_WIDTH - PADDLE_WIDTH,
            prev + 5
          );
        }

        if (ball.x < center - 10) {
          return Math.max(
            0,
            prev - 5
          );
        }

        return prev;
      });
    }, 16);

    return () => clearInterval(gameLoop);
  }, [
    ball.x,
    aiScore,
    playerScore,
    winner,
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-black flex flex-col items-center justify-center p-4">

      {/* Header */}
      <div className="w-full max-w-[340px] mb-4">

        <div className="flex justify-between items-center">

          <div className="px-4 py-2 rounded-xl bg-cyan-500/20 border border-cyan-500 text-white font-bold">
            🏓 {playerScore}
          </div>

          <button
            onClick={restartGame}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold"
          >
            🔄 Restart
          </button>

          <div className="px-4 py-2 rounded-xl bg-red-500/20 border border-red-500 text-white font-bold">
            🤖 {aiScore}
          </div>

        </div>
      </div>

      {/* Game Board */}
      <div
        className="relative rounded-3xl overflow-hidden border-4 border-cyan-500 bg-black shadow-[0_0_40px_rgba(0,255,255,0.25)]"
        style={{
          width: BOARD_WIDTH,
          height: BOARD_HEIGHT,
        }}
      >
        {/* Center Line */}
        <div className="absolute left-0 top-1/2 w-full h-[2px] bg-white/20" />

        {/* AI Paddle */}
        <div
          className="absolute top-5 bg-red-400 rounded-xl shadow-[0_0_15px_red]"
          style={{
            left: aiX,
            width: PADDLE_WIDTH,
            height: PADDLE_HEIGHT,
          }}
        />

        {/* Player Paddle */}
        <div
          className="absolute bottom-5 bg-cyan-400 rounded-xl shadow-[0_0_15px_cyan]"
          style={{
            left: playerX,
            width: PADDLE_WIDTH,
            height: PADDLE_HEIGHT,
          }}
        />

        {/* Ball */}
        <div
          className="absolute rounded-full bg-white shadow-[0_0_20px_white]"
          style={{
            left: ball.x,
            top: ball.y,
            width: BALL_SIZE,
            height: BALL_SIZE,
          }}
        />

        {/* Winner Screen */}
        {winner && (
          <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center">

            <h1 className="text-4xl font-black text-white">
              {winner}
            </h1>

            <button
              onClick={restartGame}
              className="mt-6 px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold"
            >
              Play Again
            </button>

          </div>
        )}
      </div>

      {/* Mobile Controls */}
      <div className="flex gap-6 mt-6">

        <button
          onTouchStart={startMoveLeft}
          onTouchEnd={stopMove}
          onMouseDown={startMoveLeft}
          onMouseUp={stopMove}
          className="w-20 h-20 rounded-full bg-cyan-500 text-white text-3xl font-black active:scale-95"
        >
          ⬅
        </button>

        <button
          onTouchStart={startMoveRight}
          onTouchEnd={stopMove}
          onMouseDown={startMoveRight}
          onMouseUp={stopMove}
          className="w-20 h-20 rounded-full bg-purple-500 text-white text-3xl font-black active:scale-95"
        >
          ➡
        </button>

      </div>

      <p className="text-gray-400 mt-4 text-center">
        Desktop: Arrow Keys ⬅➡
        <br />
        Mobile: Hold Buttons
      </p>
    </div>
  );
}

export default TableTennis;