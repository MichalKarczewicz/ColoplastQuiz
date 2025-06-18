import React from "react";

const ScoreHistory = ({ score, total }) => {
  const percent = (score / total) * 100;
  let emoji = "🙂"; // domyślny uśmiech

  if (percent < 50) emoji = "😞";
  else if (percent >= 50) emoji = "👍";

  return (
    <div className="quiz-result p-4 rounded border text-center">
      <h2 className="text-2xl font-bold mb-2">Quiz Complete!</h2>
      <p className="text-xl mb-2">
        Your score: <strong>{score}</strong> / <strong>{total}</strong> {emoji}
      </p>
      <p>
        {percent >= 50
          ? "Great job! You passed the quiz."
          : "Keep practicing, you can do better!"}
      </p>
    </div>
  );
};

export default ScoreHistory;
