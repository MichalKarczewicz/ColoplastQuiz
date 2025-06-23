import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRandomQuestions, getAllQuestions } from "../questions/QuestionService";
import Question from "./Question";
import CategorySelection from "./CategorySelection";
import { motion, AnimatePresence } from "framer-motion";

const Quiz = () => {
  const { quizCategory } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [nextQuestionVisible, setNextQuestionVisible] = useState(false);
  const [resultsVisible, setResultsVisible] = useState(false);
  const [score, setScore] = useState(0);

  const loadQuestions = useCallback(async () => {
    if (!quizCategory) return;

    // const allQuestions = await getRandomQuestions();
    // const filteredQuestions = allQuestions.filter(
    //   (q) => q.category === quizCategory
    // );
    const filteredQuestions = await getRandomQuestions(quizCategory);

    
    
   

    // Losowe tasowanie
    for (let i = filteredQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [filteredQuestions[i], filteredQuestions[j]] = [
        filteredQuestions[j],
        filteredQuestions[i],
      ];
    }

    const selectedQuestions = filteredQuestions.slice(0, 10);
    setQuestions(selectedQuestions);
    setCurrentQuestionIndex(0);
    setNextQuestionVisible(false);
    setResultsVisible(false);
    setScore(0);
  }, [quizCategory]);

  useEffect(() => {
    if (quizCategory) {
      loadQuestions();
    }
  }, [quizCategory, loadQuestions]);

  const currentQuestion = questions[currentQuestionIndex];

  const selectAnswer = (choiceId) => {
    if (!currentQuestion) return;

    const isCorrect = currentQuestion.correctAnswer === choiceId;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setNextQuestionVisible(true);
    } else {
      setResultsVisible(true);
      const finalScore = score + (isCorrect ? 1 : 0);

      const result = {
        score: finalScore,
        total: questions.length,
        timestamp: Date.now(),
      };

      localStorage.setItem(
        `Quiz_Result_of_${quizCategory}`,
        JSON.stringify(result)
      );
    }
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prev) => prev + 1);
    setNextQuestionVisible(false);
  };

  const handleRestart = () => {
    // Zamiast ustawiać kategorię na null, wróć do wyboru kategorii
    navigate("/Category");
  };

  if (!quizCategory) {
    // Jeśli ktoś wszedł na /Quiz bez kategorii, przekieruj na wybór kategorii
    return <CategorySelection />;
  }

  if (questions.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-600">Loading questions...</p>
    );
  }

  if (resultsVisible) {
    return (
      <div className="text-center mt-10 min-h-[30vh] p-4 rounded-b-3xl border-b-2">
        <h2 className="text-3xl font-bold mb-4">Quiz Complete!</h2>
        <p className="text-xl mb-6">
          Your score: <span className="font-semibold">{score}</span> /{" "}
          <span className="font-semibold">{questions.length}</span>
        </p>
        <p>
          {score > questions.length / 2
            ? "Wow! More than half of your answers were correct!"
            : "Better luck next time!"}
        </p>
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={loadQuestions}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Retry This Category
          </button>
          <button
            onClick={handleRestart}
            className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 transition"
          >
            Choose Another Category
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      
      <AnimatePresence mode="wait">
        {currentQuestion && (
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <Question
              data={currentQuestion}
              selectAnswer={selectAnswer}
              currentQuestionIndex={currentQuestionIndex + 1}
              quizLength={questions.length}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {nextQuestionVisible && (
        <div className="mt-4 flex justify-end">
          <motion.button
            onClick={handleNextQuestion}
            whileTap={{ scale: 1.2 }}
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 transition"
          >
            Next Question
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
