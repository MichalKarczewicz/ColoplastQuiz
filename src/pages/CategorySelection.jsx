import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const categories = ["product", "process", "mentoring", "wikipedia"];

const getLastResult = (category) => {
  const saved = localStorage.getItem(`Quiz_Result_of_${category}`);
  if (!saved) return null;
  try {
    return JSON.parse(saved);
  } catch {
    return null;
  }
};

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300 } },
};

let categoryButtonDone =
  "text-white px-6 py-3 bg-green-400 transition hover:shadow-lg rounded-[24px] hover:underline text-2xl";

let categoryButtonDoneBadResult =
  "text-white px-6 py-3 bg-red-400 transition hover:shadow-lg rounded-[24px] hover:underline text-2xl";

let categoryButton =
  "text-white px-6 py-3 bg-[#17b7cf] transition hover:shadow-lg rounded-[24px] hover:underline text-2xl";

const CategorySelection = () => {
  const navigate = useNavigate();

  const handleSelect = (cat) => {
    navigate(`/quiz/${cat}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-8 bg-[#f5f5f5] shadow-sm mx-auto border-b rounded-b-2xl">
      <h1 className="text-3xl font-bold text-[#6f6f6f] mb-8 text-center">
        Choose a Quiz Category
      </h1>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full p-10"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {categories.map((cat) => {
          const result = getLastResult(cat);
          return (
            <motion.button
              key={cat}
              variants={itemVariants}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSelect(cat)}
              className={`common-classes ${
                result == null
                  ? categoryButton
                  : result.score / result.total >= 0.5
                  ? categoryButtonDone
                  : categoryButtonDoneBadResult
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
              {result && (
                <div className="text-sm text-white/80 mt-1">
                  Last score: {result.score} / {result.total}{" "}
                  {result.score / result.total >= 0.5 ? "👍" : "😢"}
                </div>
              )}
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
};

export default CategorySelection;
