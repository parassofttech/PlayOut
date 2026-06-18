import { Bird } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function NinjaRun() {
  const [playerY, setPlayerY] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const velocityRef = useRef(0);
  const isJumpingRef = useRef(false);

  const [obstacles, setObstacles] = useState([]);

  const gravity = 0.8;
  const jumpPower = -12;

  const GROUND = 0;

  // 🥷 JUMP (FIXED)
  const jump = () => {
    if (gameOver) return;

    if (!isJumpingRef.current) {
      velocityRef.current = jumpPower;
      isJumpingRef.current = true;
    }
  };

  // CONTROLS
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

  // 🎮 GAME LOOP (FIXED)
  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      // 🧠 physics
      velocityRef.current += gravity;

      setPlayerY((prev) => {
        let newY = prev - velocityRef.current;

        // ground collision fix
        if (newY <= GROUND) {
          newY = GROUND;
          velocityRef.current = 0;
          isJumpingRef.current = false;
        }

        return newY;
      });

      // obstacles move
      setObstacles((prev) => {
        let updated = prev.map((o) => ({
          ...o,
          x: o.x - 6,
        }));

        updated = updated.filter((o) => o.x > -60);

        if (updated.length === 0 || updated[updated.length - 1].x < 200) {
          updated.push({
            x: 400,
            width: 40,
            height: 40,
            passed: false,
          });
        }

        // collision + score
        updated.forEach((o) => {
          const playerX = 80;
          const playerW = 30;

          // collision box
          if (
            o.x < playerX + playerW &&
            o.x + o.width > playerX &&
            playerY < o.height
          ) {
            setGameOver(true);
          }

          // score
          if (!o.passed && o.x + o.width < playerX) {
            o.passed = true;
            setScore((s) => s + 1);
          }
        });

        return updated;
      });

      setScore((s) => s + 1);
    }, 20);

    return () => clearInterval(interval);
  }, [gameOver, playerY]);

  const restart = () => {
    setPlayerY(0);
    setScore(0);
    setGameOver(false);
    setObstacles([]);

    velocityRef.current = 0;
    isJumpingRef.current = false;
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-black via-gray-900 to-red-900 flex items-center justify-center">

      <div
        className="relative w-full  bg-black rounded-2xl overflow-hidden border border-white/20"
        onClick={jump}
        style={{
    width: 420,
    height: 500,
  }}
      >

        {/* SCORE */}
        <div className="absolute top-2 left-2 text-white font-bold">
          🏆 {score}
        </div>

        {/* GROUND */}
        <div className="absolute bottom-0 w-full h-10 bg-green-800 bg-cover" >
          <img src="https://opengameart.org/sites/default/files/mountains-bg.jpg" alt="ground" />
        </div>

        {/* NINJA */}
        
          <img src="https://opengameart.org/sites/default/files/screenshot_20251014-215744_1.png" alt=""
          className="absolute left-20 w-8 h-10 bg-red-500 rounded-md"
          style={{ bottom: playerY }} />

        {/* OBSTACLES */}
        {obstacles.map((o, i) => (
          <div
            key={i}
            
          
            className="absolute bottom-10 "
            style={{
              left: o.x,
              width: o.width,
              height: o.height,
            }}
          >
            <img src="https://opengameart.org/sites/default/files/pipe_6.png" alt="" />
          </div>
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
        🥷 Tap / SPACE to jump
      </div>
    </div>
  );
}

export default NinjaRun;