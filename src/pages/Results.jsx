import React, { useState } from "react";

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
  const [pages, setPages] = useState(
    categories.reduce((acc, cat) => ({ ...acc, [cat]: 0 }), {})
  );

  const RESULTS_PER_PAGE = 6;

  const handlePageChange = (cat, direction, totalPages) => {
    setPages((prev) => {
      const next = prev[cat] + direction;
      if (next < 0 || next >= totalPages) return prev;
      return { ...prev, [cat]: next };
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-[#f5f5f5] shadow-sm mx-auto border-b rounded-b-2xl">
      <div className="max-w-5xl mx-auto p-6 w-full">
        <h1 className="text-4xl font-bold mb-10 text-center text-gray-700">
          Quiz Results
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {categories.map((cat) => {
            const results = getAllResults(cat) || [];
            const page = pages[cat] || 0;
            const totalPages = Math.ceil(results.length / RESULTS_PER_PAGE);
            const startIndex = page * RESULTS_PER_PAGE;
            const paginated = results.slice(startIndex, startIndex + RESULTS_PER_PAGE);

            return (
              <div
            key={cat}
            className="p-6 rounded-xl shadow-md bg-white border border-gray-300 min-h-[245px] flex flex-col"
            >
              {console.log("test")}
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                  {capitalize(cat)}
                </h2>

                {paginated.length > 0 ? (
  <>
    <div className="grid grid-cols-2 gap-1 text-lg text-gray-700 flex-1">
        {paginated.map((result, idx) => {
            const passed = result.score / result.total >= 0.5;
            const number = startIndex + idx + 1;
            return (
            <div
                key={idx}
                className={passed ? "text-green-700" : "text-red-700"}
            >
                Score {number}: {result.score}/{result.total}
            </div>
            );
        })}
        </div>

            {totalPages > 1 && (
            <div className="flex justify-between items-center mt-4 text-xs text-gray-600">
                <button
                onClick={() => handlePageChange(cat, -1, totalPages)}
                disabled={page === 0}
                className={`px-2 py-1 text-xl rounded ${
                    page === 0
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-blue-600 hover:underline"
                }`}
                >
                Prev
                </button>
                <span>
                Page {page + 1} / {totalPages}
                </span>
                <button
                onClick={() => handlePageChange(cat, 1, totalPages)}
                disabled={page + 1 >= totalPages}
                className={`px-2 py-1 text-xl rounded ${
                    page + 1 >= totalPages
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-blue-600 hover:underline"
                }`}
                >
                Next
                </button>
            </div>
            )}
        </>
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
