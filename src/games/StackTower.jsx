import { useEffect, useState, useCallback } from "react";

function StackTower() {
  const [blocks, setBlocks] = useState([]);
  const [pos, setPos] = useState(0);
  const [dir, setDir] = useState(1);
  const [speed, setSpeed] = useState(3);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const WIDTH = 100;

  // 🧠 MOVE BLOCK
  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      setPos((p) => {
        let next = p + dir * speed;

        if (next > 250) {
          setDir(-1);
          next = 250;
        }
        if (next < 0) {
          setDir(1);
          next = 0;
        }

        return next;
      });
    }, 16);

    return () => clearInterval(interval);
  }, [dir, speed, gameOver]);

  // 🧱 DROP FUNCTION (FIXED)
  const drop = useCallback(() => {
    if (gameOver) return;

    const last = blocks[blocks.length - 1];

    const newBlock = {
      x: pos,
      y: blocks.length * 30,
    };

    // first block
    if (!last) {
      setBlocks([newBlock]);
      setScore(1);
      return;
    }

    // overlap check
    const overlap = Math.abs(last.x - newBlock.x) < 25;

    if (!overlap) {
      setGameOver(true);
      return;
    }

    setBlocks((prev) => [...prev, newBlock]);
    setScore((s) => s + 1);

    // increase speed gradually
    setSpeed((s) => Math.min(s + 0.3, 10));
  }, [blocks, pos, gameOver]);

  // ⌨️ KEYBOARD + TOUCH (FIXED STABLE)
  useEffect(() => {
    const handleKey = (e) => {
      if (e.code === "Space") {
        e.preventDefault(); // 🔥 important fix (scroll bug)
        drop();
      }
    };

    const handleTouch = () => drop();

    window.addEventListener("keydown", handleKey);
    window.addEventListener("touchstart", handleTouch);

    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("touchstart", handleTouch);
    };
  }, [drop]);

  const restart = () => {
    setBlocks([]);
    setPos(0);
    setDir(1);
    setSpeed(3);
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-purple-900 p-4">

      <div className="text-center">

        <h1 className="text-4xl font-black text-white mb-2">
          🧱 Stack Tower
        </h1>

        <p className="text-gray-300 mb-4">
          Score:{" "}
          <span className="text-cyan-400 font-bold">
            {score}
          </span>
        </p>

        {/* GAME AREA */}
        <div className="relative w-[300px] h-[400px] bg-black border border-white/20 rounded-xl overflow-hidden">

          {/* blocks */}
          {blocks.map((b, i) => (
            <div
              key={i}
              className="absolute h-[30px] bg-gradient-to-r from-cyan-500 to-purple-600"
              style={{
                width: WIDTH,
                bottom: b.y,
                left: b.x,
              }}
            />
          ))}

          {/* moving block */}
          {!gameOver && (
            <div
              className="absolute h-[30px] bg-yellow-400"
              style={{
                width: WIDTH,
                bottom: blocks.length * 30,
                left: pos,
              }}
            />
          )}

        </div>

        {/* CONTROLS (mobile backup) */}
        

        {/* GAME OVER */}
        {gameOver && (
          <div className="mt-4 text-red-500 font-black text-2xl">
            GAME OVER 💥
          </div>
        )}

        <button
          onClick={restart}
          className="mt-3 px-6 py-2 bg-purple-600 text-white rounded-lg"
        >
          Restart
        </button>

        <p className="text-gray-400 text-sm mt-3">
          👆 Tap / SPACE to drop block
        </p>

      </div>
    </div>
  );
}

export default StackTower;