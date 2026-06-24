import { useEffect, useState } from "react";

function AlienAttack() {
  const [shipX, setShipX] = useState(160);
  const [bullets, setBullets] = useState([]);
  const [aliens, setAliens] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const WIDTH = 360;

  // MOVE SHIP
  const moveLeft = () => {
    setShipX((x) => Math.max(0, x - 25));
  };

  const moveRight = () => {
    setShipX((x) => Math.min(WIDTH - 40, x + 25));
  };

  // SHOOT
  const shoot = () => {
    if (gameOver) return;

    setBullets((prev) => [
      ...prev,
      { id: Date.now(), x: shipX + 15, y: 400 },
    ]);
  };

  // CONTROLS
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") moveLeft();
      if (e.key === "ArrowRight") moveRight();
      if (e.code === "Space") {
        e.preventDefault();
        shoot();
      }
    };

    const handleTouch = () => shoot();

    window.addEventListener("keydown", handleKey);
    window.addEventListener("touchstart", handleTouch);

    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("touchstart", handleTouch);
    };
  });

  // GAME LOOP
  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      // bullets move
      setBullets((prev) =>
        prev
          .map((b) => ({ ...b, y: b.y - 8 }))
          .filter((b) => b.y > 0)
      );

      // aliens move
      setAliens((prev) => {
        let updated = prev.map((a) => ({
          ...a,
          y: a.y + a.speed,
        }));

        // spawn
        if (updated.length < 5 && Math.random() > 0.92) {
          updated.push({
            id: Date.now(),
            x: Math.floor(Math.random() * 320),
            y: 0,
            speed: 2 + Math.random() * 2,
          });
        }

        // collision bullets vs aliens
        updated = updated.filter((alien) => {
          const hit = bullets.some(
            (b) =>
              b.x > alien.x &&
              b.x < alien.x + 30 &&
              b.y < alien.y + 30 &&
              b.y > alien.y
          );

          if (hit) {
            setScore((s) => s + 1);
            return false;
          }

          return true;
        });

        // game over if alien reaches bottom
        updated.forEach((a) => {
          if (a.y > 420) {
            setGameOver(true);
          }
        });

        return updated;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [bullets, gameOver]);

  const restart = () => {
    setShipX(160);
    setBullets([]);
    setAliens([]);
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-black via-purple-900 to-black flex items-center justify-center">

      <div className="relative w-full max-w-90  bg-black border border-white/20 overflow-hidden rounded-2xl"
      
      style={
        {
          height:500
        }
      }>
      

        {/* SCORE */}
        <div className="absolute top-2 left-2 text-white font-bold z-10">
          👽 {score}
        </div>

        {/* SHIP */}
        <div
          className="absolute bottom-2 w-10 h-10 bg-cyan-400 rounded-md"
          style={{ left: shipX }}
        />

        {/* BULLETS */}
        {bullets.map((b) => (
          <div
            key={b.id}
            className="absolute w-2 h-4 bg-yellow-400 rounded"
            style={{ left: b.x, top: b.y }}
          />
        ))}

        {/* ALIENS */}
        {aliens.map((a) => (
          <div
            key={a.id}
            className="absolute w-8 h-8 bg-green-500 rounded-full"
            style={{ left: a.x, top: a.y }}
          />
        ))}

        {/* GAME OVER */}
        {gameOver && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-white">
            <h1 className="text-3xl font-black text-red-500">
              GAME OVER 👾
            </h1>

            <p className="mt-2 text-xl">Score: {score}</p>

            <button
              onClick={restart}
              className="mt-5 px-6 py-3 bg-yellow-500 text-black font-bold rounded-xl"
            >
              Restart
            </button>
          </div>
        )}

      </div>

      <div className="absolute bottom-4 text-white text-sm text-center">
        ⬅️ ➡️ Move | SPACE / Tap = Shoot
      </div>
    </div>
  );
}

export default AlienAttack;