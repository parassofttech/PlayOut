import React, { useEffect, useRef, useState } from "react";

const ZombieAttack = () => {
  const canvasRef = useRef(null);
  const requestRef = useRef(null);

  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const player = useRef({ x: 200, y: 200, size: 18, speed: 4 });
  const zombies = useRef([]);
  const bullets = useRef([]);

  // INIT ZOMBIES
  const spawnZombie = () => {
    zombies.current.push({
      x: Math.random() * 500,
      y: Math.random() * 500,
      size: 18,
      speed: 1 + Math.random() * 1.5,
    });
  };

  // KEY CONTROL
  useEffect(() => {
    const handleKey = (e) => {
      if (gameOver) return;

      const p = player.current;

      if (e.key === "w") p.y -= p.speed;
      if (e.key === "s") p.y += p.speed;
      if (e.key === "a") p.x -= p.speed;
      if (e.key === "d") p.x += p.speed;
    };

    const shoot = (e) => {
      if (e.code === "Space" && !gameOver) {
        bullets.current.push({
          x: player.current.x,
          y: player.current.y,
          speed: 6,
        });
      }
    };

    window.addEventListener("keydown", handleKey);
    window.addEventListener("keydown", shoot);

    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("keydown", shoot);
    };
  }, [gameOver]);

  // GAME LOOP
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const update = () => {
      if (gameOver) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const p = player.current;

      // PLAYER
      ctx.fillStyle = "cyan";
      ctx.fillRect(p.x, p.y, p.size, p.size);

      // ZOMBIES
      zombies.current.forEach((z, zi) => {
        const dx = p.x - z.x;
        const dy = p.y - z.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        z.x += (dx / dist) * z.speed;
        z.y += (dy / dist) * z.speed;

        ctx.fillStyle = "lime";
        ctx.fillRect(z.x, z.y, z.size, z.size);

        // COLLISION WITH PLAYER
        if (
          Math.abs(z.x - p.x) < 15 &&
          Math.abs(z.y - p.y) < 15
        ) {
          setGameOver(true);
        }
      });

      // BULLETS
      bullets.current.forEach((b, bi) => {
        b.y -= b.speed;

        ctx.fillStyle = "yellow";
        ctx.fillRect(b.x, b.y, 5, 10);

        // HIT DETECTION
        zombies.current.forEach((z, zi) => {
          if (
            Math.abs(b.x - z.x) < 15 &&
            Math.abs(b.y - z.y) < 15
          ) {
            zombies.current.splice(zi, 1);
            bullets.current.splice(bi, 1);
            setScore((s) => s + 10);
          }
        });
      });

      requestRef.current = requestAnimationFrame(update);
    };

    update();

    return () => cancelAnimationFrame(requestRef.current);
  }, [gameOver]);

  // SPAWN ZOMBIES OVER TIME
  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameOver) spawnZombie();
    }, 1200);

    return () => clearInterval(interval);
  }, [gameOver]);

  const restart = () => {
    zombies.current = [];
    bullets.current = [];
    player.current = { x: 200, y: 200, size: 18, speed: 4 };
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      
      <h1 className="text-3xl font-bold mb-2">🧟 Zombie Attack</h1>

      <div className="flex gap-6 mb-3">
        <div className="bg-white/10 px-4 py-2 rounded">⭐ Score: {score}</div>
        <div className="bg-white/10 px-4 py-2 rounded">
          🎮 Controls: WASD + SPACE
        </div>
      </div>

      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        className="border border-green-500 bg-gray-900 rounded-lg"
      />

      {gameOver && (
        <div className="absolute bg-black/80 p-6 rounded-xl text-center">
          <h2 className="text-2xl text-red-500 mb-2">💀 Game Over</h2>
          <p className="mb-3">Final Score: {score}</p>
          <button
            onClick={restart}
            className="px-4 py-2 bg-green-500 rounded"
          >
            Restart
          </button>
        </div>
      )}
    </div>
  );
};

export default ZombieAttack;