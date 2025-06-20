import React, { useState, useEffect } from "react";

const Question = ({ data, currentQuestionIndex, selectAnswer, quizLength }) => {
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [disableChoices, setDisableChoices] = useState(false);

  useEffect(() => {
    setSelectedChoice(null);
    setDisableChoices(false);
  }, [data]);

  const onChoiceSelect = (choice) => {
    setSelectedChoice(choice.id);
    selectAnswer(choice.id);
    setDisableChoices(true);
  };

  if (!data) return null;

  return (
    <div className="bg-[#f5f5f5] p-6 text-[#6f6f6f] shadow-xl rounded-b-3xl border-b-2 min-h-[30vh] pb-8">
      <div className="mb-4">
        <p className="mb-2 text-[#6f6f6f] text-xl">Question</p>
        <div className="flex items-center space-x-4">
          <div className="flex items-center mt-4 justify-center w-13 h-13 rounded-full bg-white text-[#17b7cf] font-bold text-lg border border-[#6f6f6f]">
            <strong>
              {currentQuestionIndex}/{quizLength}
            </strong>
          </div>
        </div>
        <div className="mb-4 mt-4">
          <h2 className="text-lg font-semibold pl-2">{data.question}</h2>
        </div>
      </div>

      {data.code && (
        <pre className="bg-gray-900 text-white p-3 rounded mb-4 overflow-x-auto whitespace-pre-wrap">
          {data.code}
        </pre>
      )}

      <div className="flex flex-col space-y-2">
        {data.choices.map((choice) => {
          const isSelected = selectedChoice === choice.id;
          const isCorrect = choice.id === data.correctAnswer;

          let baseClasses =
            "w-full text-left px-4 py-2 rounded border bg-[#f5f5f5] text-[#6f6f6f] transition-colors";
          let stateClasses = "";

          if (!disableChoices) {
            stateClasses = "hover:bg-[#17b7cf] hover:text-white cursor-pointer";
          } else {
            if (isSelected) {
              if (isCorrect) {
                stateClasses =
                  "bg-green-600 border-green-600 text-white cursor-default";
              } else {
                stateClasses =
                  "bg-red-600 border-red-600 text-white cursor-default";
              }
            } else {
              stateClasses = "border-[#6f6f6f] text-gray-400 cursor-default";
            }
          }

          if (isSelected && !disableChoices) {
            stateClasses = "bg-blue-600 text-white cursor-pointer";
          }

          return (
            <button
              key={choice.id}
              className={`${baseClasses} ${stateClasses} flex items-center space-x-2`}
              onClick={() => !disableChoices && onChoiceSelect(choice)}
              disabled={disableChoices}
              type="button"
            >
              <span className="w-3 h-3 rounded-full border-2 border-gray-400 flex items-center justify-center shrink-0">
                {isSelected && (
                  <span className="w-0.75 h-0.75 rounded-full bg-blue-500"></span>
                )}
              </span>
              <span className="pl-2">                 
                {choice.image ? (
                  <img
                    src={choice.image}
                    alt={`Option ${choice.id}`}
                    className="max-w-[150px] max-h-[150px] object-contain"
                  />
                ) : choice.text ? (
                  choice.text
                ) : null}
               
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Question;
