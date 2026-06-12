import { useEffect, useRef, useState } from "react";

function Football() {
  const WIDTH = 360;
  const HEIGHT = 600;

  const PLAYER_SIZE = 40;
  const BALL_SIZE = 18;

  const [playerX, setPlayerX] = useState(160);
  const [aiX, setAiX] = useState(160);

  const [ball, setBall] = useState({
    x: 180,
    y: 300,
    dx: 3,
    dy: 4,
  });

  const [score, setScore] = useState({
    player: 0,
    ai: 0,
  });

  const [gameOver, setGameOver] = useState(false);

  const moveRef = useRef(null);

  const restart = () => {
    setPlayerX(160);
    setAiX(160);
    setScore({ player: 0, ai: 0 });
    setGameOver(false);

    setBall({
      x: 180,
      y: 300,
      dx: 3,
      dy: 4,
    });
  };

  // Keyboard controls
  useEffect(() => {
    const handleKey = (e) => {
      if (gameOver) return;

      if (e.key === "ArrowLeft") {
        setPlayerX((p) => Math.max(0, p - 25));
      }

      if (e.key === "ArrowRight") {
        setPlayerX((p) => Math.min(WIDTH - PLAYER_SIZE, p + 25));
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [gameOver]);

  // Mobile controls
  const moveLeft = () => {
    clearInterval(moveRef.current);
    moveRef.current = setInterval(() => {
      setPlayerX((p) => Math.max(0, p - 6));
    }, 16);
  };

  const moveRight = () => {
    clearInterval(moveRef.current);
    moveRef.current = setInterval(() => {
      setPlayerX((p) => Math.min(WIDTH - PLAYER_SIZE, p + 6));
    }, 16);
  };

  const stopMove = () => clearInterval(moveRef.current);

  // Game loop
  useEffect(() => {
    if (gameOver) return;

    const loop = setInterval(() => {
      setBall((prev) => {
        let x = prev.x + prev.dx;
        let y = prev.y + prev.dy;
        let dx = prev.dx;
        let dy = prev.dy;

        // walls
        if (x <= 0 || x >= WIDTH - BALL_SIZE) dx *= -1;

        // AI goal (top)
        if (y <= 10) {
          setScore((s) => {
            const newScore = { ...s, ai: s.ai + 1 };
            if (newScore.ai >= 5) setGameOver(true);
            return newScore;
          });

          return {
            x: 180,
            y: 300,
            dx: 3,
            dy: 4,
          };
        }

        // player goal (bottom)
        if (y >= HEIGHT - BALL_SIZE) {
          setScore((s) => {
            const newScore = { ...s, player: s.player + 1 };
            if (newScore.player >= 5) setGameOver(true);
            return newScore;
          });

          return {
            x: 180,
            y: 300,
            dx: -3,
            dy: -4,
          };
        }

        // player hit
        if (
          y >= HEIGHT - 80 &&
          x >= playerX &&
          x <= playerX + PLAYER_SIZE
        ) {
          dy = -Math.abs(dy);
        }

        // AI hit
        if (
          y <= 80 &&
          x >= aiX &&
          x <= aiX + PLAYER_SIZE
        ) {
          dy = Math.abs(dy);
        }

        return { x, y, dx, dy };
      });

      // AI movement
      setAiX((p) => {
        if (ball.x > p + 10) return Math.min(WIDTH - PLAYER_SIZE, p + 3);
        if (ball.x < p - 10) return Math.max(0, p - 3);
        return p;
      });
    }, 16);

    return () => clearInterval(loop);
  }, [ball.x, gameOver, playerX, aiX]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-950 via-black to-green-950 p-4">

      {/* Score */}
      <div className="flex gap-6 mb-4 text-white font-bold">
        <div>🧑 You: {score.player}</div>
        <button
          onClick={restart}
          className="px-4 py-2 bg-cyan-500 rounded-xl"
        >
          Restart
        </button>
        <div>🤖 AI: {score.ai}</div>
      </div>

      {/* Game Board */}
      <div className="relative w-[360px] h-[600px] bg-green-900 border-4 border-white/20 overflow-hidden rounded-2xl">

        {/* Ball */}
        <div
          className="absolute bg-white rounded-full"
          style={{
            width: BALL_SIZE,
            height: BALL_SIZE,
            left: ball.x,
            top: ball.y,
          }}
        />

        {/* Player */}
        <div
          className="absolute bottom-2 bg-blue-500 rounded-md"
          style={{
            width: PLAYER_SIZE,
            height: PLAYER_SIZE,
            left: playerX,
          }}
        />

        {/* AI */}
        <div
          className="absolute top-2 bg-red-500 rounded-md"
          style={{
            width: PLAYER_SIZE,
            height: PLAYER_SIZE,
            left: aiX,
          }}
        />

        {/* Game Over */}
        {gameOver && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-white">
            <h1 className="text-3xl font-bold">Game Over</h1>
            <button
              onClick={restart}
              className="mt-4 px-6 py-2 bg-yellow-500 rounded-xl"
            >
              Play Again
            </button>
          </div>
        )}
      </div>

      {/* Mobile Controls */}
      <div className="flex gap-6 mt-6 md:hidden">
        <button
          onTouchStart={moveLeft}
          onTouchEnd={stopMove}
          className="w-16 h-16 bg-blue-500 rounded-full text-white text-xl"
        >
          ⬅
        </button>

        <button
          onTouchStart={moveRight}
          onTouchEnd={stopMove}
          className="w-16 h-16 bg-green-500 rounded-full text-white text-xl"
        >
          ➡
        </button>
      </div>

      <p className="text-gray-400 mt-4 text-center">
        Desktop: Arrow Keys | Mobile: Buttons
      </p>
    </div>
  );
}

export default Football;