import { useEffect, useState } from "react";

function FlappyBird() {
  const [birdY, setBirdY] = useState(200);
  const [velocity, setVelocity] = useState(0);
  const [pipes, setPipes] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const gravity = 0.7;
  const jumpPower = -6.5;
  const maxFallSpeed = 10; 

  const jump = () => {
    if (gameOver) return;
    setVelocity(jumpPower);
  };

  // 🧠 Mobile + Desktop input
  useEffect(() => {
    const handleKey = (e) => {
      if (e.code === "Space") jump();
    };

    const handleTouch = () => jump();

    window.addEventListener("keydown", handleKey);
    window.addEventListener("touchstart", handleTouch);
    window.addEventListener("mousedown", handleTouch);

    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("touchstart", handleTouch);
      window.removeEventListener("mousedown", handleTouch);
    };
  });

  // Game Loop
 useEffect(() => {
  if (gameOver) return;

  const interval = setInterval(() => {
    setBirdY((y) => y + velocity);

    setVelocity((v) => {
      let newV = v + gravity;

      // 🔥 LIMIT FALL SPEED (fix crazy movement)
      if (newV > maxFallSpeed) newV = maxFallSpeed;

      return newV;
    });

    setPipes((prev) => {
      let updated = prev.map((p) => ({
        ...p,
        x: p.x - 3,
      }));

      updated = updated.filter((p) => p.x > -80);

      if (updated.length === 0 || updated[updated.length - 1].x < 180) {
        const gap = 140; // slightly bigger gap = smoother gameplay
        const top = Math.floor(Math.random() * 160) + 80;

        updated.push({
          x: 320,
          top,
          bottom: top + gap,
          passed: false,
        });
      }

      updated.forEach((p) => {
        const birdX = 70;
        const birdSize = 28;

        if (
          p.x < birdX + birdSize &&
          p.x + 50 > birdX &&
          (birdY < p.top || birdY > p.bottom)
        ) {
          setGameOver(true);
        }

        if (!p.passed && p.x + 50 < birdX) {
          p.passed = true;
          setScore((s) => s + 1);
        }
      });

      return updated;
    });

    if (birdY > 520 || birdY < 0) {
      setGameOver(true);
    }
  }, 30);

  return () => clearInterval(interval);
}, [birdY, velocity, gameOver]);

  const restart = () => {
    setBirdY(200);
    setVelocity(0);
    setPipes([]);
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-sky-400 via-sky-700 to-black flex items-center justify-center">

      {/* GAME AREA (responsive) */}
      <div
        className="relative w-full h-[85vh] bg-blue-400 overflow-hidden rounded-2xl border-4 border-white/20"
        onClick={jump}
        style={{
          width:420
        }}
      >

        {/* SCORE */}
        <div className="absolute top-2 left-2 text-white font-bold z-10">
          🏆 {score}
        </div>

        {/* BIRD */}
        <div
          className="absolute left-16 w-7 h-7 bg-yellow-300 rounded-full shadow-lg"
          style={{ top: birdY }}
        />

        {/* PIPES */}
        {pipes.map((p, i) => (
          <div key={i}>
            <div
              className="absolute w-12 bg-green-600 border border-green-800"
              style={{ left: p.x, top: 0, height: p.top }}
            />

            <div
              className="absolute w-12 bg-green-600 border border-green-800"
              style={{ left: p.x, top: p.bottom, height: 600 }}
            />
          </div>
        ))}

        {/* GROUND */}
        <div className="absolute bottom-0 w-full h-10 bg-green-800" />

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

      {/* MOBILE TIP */}
      <div className="absolute bottom-4 text-white text-sm text-center px-4">
        👆 Tap anywhere to jump
      </div>
    </div>
  );
}

export default FlappyBird;