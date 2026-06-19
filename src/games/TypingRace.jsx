import { useEffect, useMemo, useState } from "react";

const SENTENCES = [
  "The sun rises in the east and brings a new day",
  "I love drinking tea in the morning",
  "The sky looks beautiful during sunset",
  "Music makes every moment better",
  "Walking in the park feels relaxing",
  "Dogs are very loyal and friendly animals",
  "Reading books improves imagination and focus",
  "Rainy days feel calm and peaceful",
  "Healthy food keeps the body strong",
  "Traveling helps us learn new things about the world",
];

function TypingRace() {
  const [text, setText] = useState("");
  const [input, setInput] = useState("");
  const [time, setTime] = useState(30);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);

  const sentence = useMemo(() => {
    return SENTENCES[Math.floor(Math.random() * SENTENCES.length)];
  }, [finished]);

  // Start game
  const startGame = () => {
    setInput("");
    setTime(30);
    setRunning(true);
    setFinished(false);
  };

  // Timer
  useEffect(() => {
    if (!running) return;

    const timer = setInterval(() => {
      setTime((t) => {
        if (t <= 1) {
          clearInterval(timer);
          setRunning(false);
          setFinished(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [running]);

  // Calculate WPM
  const calculateWPM = () => {
    const wordsTyped = input.trim().split(" ").length;
    const timeSpent = 30 - time || 1;
    return Math.round((wordsTyped / timeSpent) * 60);
  };

  // Mistakes
 const mistakes = () => {
  const typedWords = input.trim().split(/\s+/);
  const sentenceWords = sentence.trim().split(/\s+/);

  let error = 0;

  const len = Math.max(typedWords.length, sentenceWords.length);

  for (let i = 0; i < len; i++) {
    if (typedWords[i] !== sentenceWords[i]) {
      error++;
    }
  }

  return error;
};

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-b from-black via-slate-900 to-black p-4 text-white">

      {/* Header */}
      <div className="flex gap-4 mb-6 flex-wrap justify-center">
        <div className="px-4 py-2 bg-white/10 rounded-xl">
          ⏱ Time: {time}s
        </div>

        <button
          onClick={startGame}
          className="px-4 py-2 bg-cyan-500 rounded-xl font-bold"
        >
          {running ? "Restart" : "Start Game"}
        </button>
      </div>

      {/* Sentence */}
      <div className="max-w-xl text-center mb-6 text-lg leading-8">
        {sentence.split("").map((char, i) => {
          let color = "text-gray-400";

          if (i < input.length) {
            color =
              input[i] === char
                ? "text-green-400"
                : "text-red-400";
          }

          return (
            <span key={i} className={color}>
              {char}
            </span>
          );
        })}
      </div>

      {/* Input */}
      <textarea
        value={input}
        disabled={!running}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Start typing..."
        className="w-full max-w-xl h-28 p-4 rounded-xl bg-black/40 border border-white/20 focus:outline-none"
      />

      {/* Stats */}
      {finished && (
        <div className="mt-6 text-center space-y-2">
          <h2 className="text-2xl font-bold text-cyan-400">
            Results
          </h2>

          <p>⚡ WPM: {calculateWPM()}</p>
          <p>❌ Mistakes: {mistakes()}</p>
        </div>
      )}

      <p className="text-gray-500 mt-6 text-center">
        Improve your typing speed 🚀
      </p>
    </div>
  );
}

export default TypingRace;