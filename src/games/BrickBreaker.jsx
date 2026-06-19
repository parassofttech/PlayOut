import { useEffect, useState } from "react";

function BrickBreaker() {
  const boardWidth = 400;
  const paddleWidth = 80;

  const [ball, setBall] = useState({ x: 180, y: 300, dx: 3, dy: -3 });
  const [paddleX, setPaddleX] = useState(150);
  const [bricks, setBricks] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);

  // INIT BRICKS
  useEffect(() => {
    const temp = [];
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 6; c++) {
        temp.push({
          x: c * 65,
          y: r * 30,
          alive: true,
        });
      }
    }
    setBricks(temp);
  }, []);

  // MOVE LEFT
  const moveLeft = () => {
    setPaddleX((x) => Math.max(0, x - 30));
  };

  // MOVE RIGHT
  const moveRight = () => {
    setPaddleX((x) =>
      Math.min(boardWidth - paddleWidth, x + 30)
    );
  };

  // KEYBOARD CONTROLS
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") moveLeft();
      if (e.key === "ArrowRight") moveRight();
    };

    window.addEventListener("keydown", handleKey);
    return () =>
      window.removeEventListener("keydown", handleKey);
  }, []);

  // GAME LOOP
  useEffect(() => {
    if (gameOver || win) return;

    const interval = setInterval(() => {
      setBall((b) => {
        let newX = b.x + b.dx;
        let newY = b.y + b.dy;

        // wall bounce
        if (newX <= 0 || newX >= boardWidth) b.dx *= -1;
        if (newY <= 0) b.dy *= -1;

        // paddle collision
        if (
          newY >= 380 &&
          newX >= paddleX &&
          newX <= paddleX + paddleWidth
        ) {
          b.dy *= -1;
        }

        // game over (miss ball)
        if (newY > 420) {
          setGameOver(true);
        }

        return {
          x: newX,
          y: newY,
          dx: b.dx,
          dy: b.dy,
        };
      });

      // brick collision
      setBricks((prev) => {
        let aliveCount = 0;

        const updated = prev.map((brick) => {
          if (!brick.alive) return brick;

          // collision
          if (
            ball.x > brick.x &&
            ball.x < brick.x + 60 &&
            ball.y > brick.y &&
            ball.y < brick.y + 20
          ) {
            setBall((b) => ({ ...b, dy: -b.dy }));
            setScore((s) => s + 1);
            return { ...brick, alive: false };
          }

          aliveCount++;
          return brick;
        });

        // 🏆 WIN CONDITION
        const remaining = updated.filter((b) => b.alive);
        if (remaining.length === 0) {
          setWin(true);
        }

        return updated;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [ball, paddleX, gameOver, win]);

  const restart = () => {
    setBall({ x: 180, y: 300, dx: 3, dy: -3 });
    setPaddleX(150);
    setScore(0);
    setGameOver(false);
    setWin(false);

    setBricks((prev) =>
      prev.map((b) => ({ ...b, alive: true }))
    );
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">

      <h1 className="text-3xl font-bold mb-2">
        🧱 Brick Breaker
      </h1>

      <p className="mb-3">Score: {score}</p>

      {/* GAME AREA */}
      <div className="relative  bg-zinc-900 border"
      style={{
        width:400,
        height:420
      }}>

        {/* BALL */}
        <div
          className="absolute w-4 h-4 rounded-full bg-yellow-400"
          style={{ left: ball.x, top: ball.y }}
        />

        {/* PADDLE */}
        <div
          className="absolute h-3 bg-cyan-500 bottom-0"
          style={{ left: paddleX, width: paddleWidth }}
        />

        {/* BRICKS */}
        {bricks.map(
          (b, i) =>
            b.alive && (
              <div
                key={i}
                className="absolute  bg-pink-500"
                style={{ left: b.x, top: b.y,
                  height:20,
                  width:60
                
                 }}
              />
            )
        )}

        {/* GAME OVER */}
        {gameOver && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center">
            <h2 className="text-3xl text-red-500 font-bold">
              GAME OVER 💀
            </h2>

            <button
              onClick={restart}
              className="mt-4 px-6 py-2 bg-yellow-500 text-black font-bold rounded"
            >
              Restart
            </button>
          </div>
        )}

        {/* WIN SCREEN */}
        {win && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center">
            <h2 className="text-3xl text-green-400 font-bold">
              YOU WIN 🏆
            </h2>

            <button
              onClick={restart}
              className="mt-4 px-6 py-2 bg-green-500 text-black font-bold rounded"
            >
              Play Again
            </button>
          </div>
        )}
      </div>

      {/* CONTROL BUTTONS */}
      <div className="flex gap-6 mt-4">
        <button
          onClick={moveLeft}
          className="px-6 py-3 bg-blue-600 rounded-lg text-white font-bold"
        >
          ⬅ Left
        </button>

        <button
          onClick={moveRight}
          className="px-6 py-3 bg-purple-600 rounded-lg text-white font-bold"
        >
          Right ➡
        </button>
      </div>

      <p className="mt-3 text-sm text-gray-400">
        Keyboard + Buttons + Mobile supported
      </p>
    </div>
  );
}

export default BrickBreaker;