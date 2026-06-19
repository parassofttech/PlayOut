import { useEffect, useState } from "react";

function EndlessRunner() {
  const [playerY, setPlayerY] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [isJumping, setIsJumping] = useState(false);

  const [obstacles, setObstacles] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const gravity = 0.7;
  const jumpPower = -12;

  const jump = () => {
    if (gameOver) return;

    if (!isJumping) {
      setVelocity(jumpPower);
      setIsJumping(true);
    }
  };

  // CONTROLS (FIXED)
  useEffect(() => {
    const handleKey = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        jump();
      }
    };

    const handleTouch = () => jump();

    window.addEventListener("keydown", handleKey);
    window.addEventListener("touchstart", handleTouch);

    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("touchstart", handleTouch);
    };
  });

  // GAME LOOP (FIXED)
  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      // PLAYER PHYSICS
      setPlayerY((y) => {
        let newY = y + velocity;

        if (newY <= 0) {
          newY = 0;
          setIsJumping(false);
        }

        return newY;
      });

      setVelocity((v) => v + gravity);

      // OBSTACLES
      setObstacles((prev) => {
        let updated = prev.map((o) => ({
          ...o,
          x: o.x - 6,
        }));

        updated = updated.filter((o) => o.x > -60);

        // spawn
        if (updated.length === 0 || updated[updated.length - 1].x < 220) {
          updated.push({
            x: 400,
            height: 40,
            passed: false,
          });
        }

        // COLLISION (FIXED BOX LOGIC)
        updated.forEach((o) => {
          const playerX = 80;
          const playerWidth = 30;
          const playerHeight = playerY;

          const obstacleTop = o.height;

          if (
            o.x < playerX + playerWidth &&
            o.x + 40 > playerX &&
            playerHeight < obstacleTop
          ) {
            setGameOver(true);
          }

          // SCORE
          if (!o.passed && o.x + 40 < playerX) {
            o.passed = true;
            setScore((s) => s + 1);
          }
        });

        return updated;
      });

      // SCORE fallback
      setScore((s) => s + 1);
    }, 30);

    return () => clearInterval(interval);
  }, [velocity, playerY, gameOver]);

  const restart = () => {
    setPlayerY(0);
    setVelocity(0);
    setIsJumping(false);
    setObstacles([]);
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-sky-500 via-blue-700 to-black">

      <div
        className="relative w-full max-w-105 h-125 bg-black rounded-2xl overflow-hidden border border-white/20"
        onClick={jump}
      >

        {/* SCORE */}
        <div className="absolute top-2 left-2 text-white font-bold z-10">
          🏆 {score}
        </div>

        {/* GROUND */}
        <div className="absolute bottom-0 w-full h-10 bg-green-700" />

        {/* PLAYER */}
        <div
          className="absolute left-20 w-8 h-10 bg-yellow-400 rounded-md"
          style={{ bottom: playerY }}
        />

        {/* OBSTACLES */}
        {obstacles.map((o, i) => (
          <div
            key={i}
            className="absolute bottom-10 w-10 bg-red-500"
            style={{
              left: o.x,
              height: o.height,
            }}
          />
        ))}

        {/* GAME OVER */}
        {gameOver && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-white">
            <h1 className="text-4xl font-black text-red-500">
              GAME OVER 💀
            </h1>

            <p className="mt-2 text-xl">Score: {score}</p>

            <button
              onClick={restart}
              className="mt-5 px-8 py-3 bg-yellow-500 text-black font-bold rounded-xl"
            >
              Restart
            </button>
          </div>
        )}

      </div>

      <div className="absolute bottom-4 text-white text-sm">
        👆 Tap / SPACE to jump
      </div>
    </div>
  );
}

export default EndlessRunner;