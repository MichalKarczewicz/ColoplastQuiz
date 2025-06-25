import React from "react";

const categories = ["product", "process", "mentoring", "wikipedia"];

const getAllResults = (category) => {
  const saved = localStorage.getItem(`Quiz_Result_of_${category}`);
  if (!saved) return null;
  try {
    const results = JSON.parse(saved);
    if (Array.isArray(results) && results.length > 0) {
      return results; 
    }
    return null;
  } catch {
    return null;
  }
};




const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const Results = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-[#f5f5f5] shadow-sm mx-auto border-b rounded-b-2xl">
      <div className="max-w-5xl mx-auto p-6 w-full">
        <h1 className="text-4xl font-bold mb-10 text-center text-gray-700">
          Quiz Results
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {categories.map((cat) => {
            const results = getAllResults(cat);

            return (
              <div
                key={cat}
                className="p-6 rounded-xl shadow-md bg-white border border-gray-300 min-h-[180px] flex flex-col"
              >
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                  {capitalize(cat)}
                </h2>

                {results && results.length > 0 ? (
                  <ul className="space-y-3 overflow-y-auto max-h-[350px] pr-2 flex-1">
                    {results.map((result, idx) => {
                      const passed = result.score / result.total >= 0.5;
                      return (
                        <li
                          key={idx}
                          className={`text-lg font-medium ${
                            passed ? "text-green-700" : "text-red-700"
                          }`}
                        >
                          Score {idx + 1}: {result.score}/{result.total}{" "}
                          {passed ? "👍" : "😢"}
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="text-gray-500 italic mt-auto">No results yet</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};



export default Results;
