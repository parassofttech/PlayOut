import { useState } from "react";

const COLORS = ["#ff4d4d", "#4d79ff", "#4dff88"];

const createLevel = () => {
  // Each color appears exactly 3 times (balanced)
  let pool = [];

  COLORS.forEach((color) => {
    pool.push(color, color, color);
  });

  // shuffle
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  // distribute into 3 bottles (4 per bottle max logic safe)
  return [
    pool.slice(0, 3),
    pool.slice(3, 6),
    pool.slice(6, 9),
    [],
  ];
};

function ColorSortPuzzle() {
  const [bottles, setBottles] = useState(createLevel());
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState("🧪 Sort all colors properly");

  const canPour = (from, to) => {
    if (bottles[from].length === 0) return false;
    if (bottles[to].length >= 3) return false;

    const color = bottles[from][bottles[from].length - 1];
    const top = bottles[to][bottles[to].length - 1];

    return !top || top === color;
  };

  const move = (to) => {
    if (selected === null) return;

    if (selected === to) {
      setSelected(null);
      return;
    }

    if (!canPour(selected, to)) {
      setMessage("❌ Invalid Move!");
      return;
    }

    const newBottles = bottles.map((b) => [...b]);

    const color = newBottles[selected].pop();
    newBottles[to].push(color);

    setBottles(newBottles);
    setSelected(null);
    setMessage("✔️ Good Move!");

    checkWin(newBottles);
  };

  const selectBottle = (i) => {
    if (selected === null) {
      if (bottles[i].length === 0) return;
      setSelected(i);
    } else {
      move(i);
    }
  };

  const checkWin = (b) => {
    const win = b.every(
      (bot) =>
        bot.length === 0 ||
        (bot.length === 3 && bot.every((c) => c === bot[0]))
    );

    if (win) setMessage("🎉 You Win!");
  };

  const reset = () => {
    setBottles(createLevel());
    setSelected(null);
    setMessage("🧪 New Puzzle Started");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-black p-4">

      <div className="text-center w-full max-w-md">

        <h1 className="text-4xl font-black text-white mb-2">
          🧪 Color Sort
        </h1>

        <p className="text-gray-300 mb-5">{message}</p>

        {/* BOTTLES */}
        <div className="flex justify-center gap-5 flex-wrap">

          {bottles.map((bottle, i) => (
            <div
              key={i}
              onClick={() => selectBottle(i)}
              className={`w-16 h-40 rounded-2xl border-2 overflow-hidden flex flex-col-reverse cursor-pointer transition
                ${
                  selected === i
                    ? "border-yellow-400 scale-105"
                    : "border-white/30"
                }`}
            >
              {bottle.map((color, idx) => (
                <div
                  key={idx}
                  style={{ backgroundColor: color }}
                  className="h-1/3 w-full"
                />
              ))}
            </div>
          ))}

        </div>

        {/* CONTROLS */}
        <button
          onClick={reset}
          className="mt-6 px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold"
        >
          🔄 Restart
        </button>

      </div>
    </div>
  );
}

export default ColorSortPuzzle;