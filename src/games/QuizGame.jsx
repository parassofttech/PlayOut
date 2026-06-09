import React, { useState } from "react";

const QUESTIONS = [
  {
    q: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "Home Tool Markup Language",
      "Hyperlinks and Text Mark Language",
      "None",
    ],
    answer: 0,
  },
  {
    q: "Which language is used for styling?",
    options: ["HTML", "CSS", "Python", "Java"],
    answer: 1,
  },
  {
    q: "Which is a JavaScript framework?",
    options: ["Laravel", "Django", "React", "Flask"],
    answer: 2,
  },
  {
    q: "Inside which tag is JavaScript written?",
    options: ["<js>", "<script>", "<javascript>", "<code>"],
    answer: 1,
  },
];

function QuizGame() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const current = QUESTIONS[index];

  const handleAnswer = (i) => {
    setSelected(i);

    if (i === current.answer) {
      setScore((s) => s + 1);
    }

    setTimeout(() => {
      if (index + 1 < QUESTIONS.length) {
        setIndex(index + 1);
        setSelected(null);
      } else {
        setShowResult(true);
      }
    }, 700);
  };

  const restart = () => {
    setIndex(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col items-center justify-center p-6">

      <h1 className="text-4xl font-bold mb-4">🧠 Quiz Game</h1>

      {!showResult ? (
        <div className="w-full max-w-xl bg-white/10 p-6 rounded-xl">

          {/* QUESTION */}
          <h2 className="text-xl font-semibold mb-4">
            {index + 1}. {current.q}
          </h2>

          {/* OPTIONS */}
          <div className="flex flex-col gap-3">
            {current.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                disabled={selected !== null}
                className={`p-3 rounded-lg text-left transition ${
                  selected === i
                    ? i === current.answer
                      ? "bg-green-500"
                      : "bg-red-500"
                    : "bg-white/10 hover:bg-white/20"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          {/* SCORE */}
          <div className="mt-4 text-sm text-gray-300">
            Score: {score}
          </div>
        </div>
      ) : (
        <div className="bg-white/10 p-6 rounded-xl text-center w-80">
          <h2 className="text-2xl font-bold mb-2">🏁 Result</h2>
          <p className="mb-3">Your Score: {score} / {QUESTIONS.length}</p>

          <button
            onClick={restart}
            className="bg-green-500 px-4 py-2 rounded-lg font-bold"
          >
            Play Again 🔄
          </button>
        </div>
      )}
    </div>
  );
}

export default QuizGame;