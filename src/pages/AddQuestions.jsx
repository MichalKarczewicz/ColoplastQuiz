import React, { useState } from 'react';

const AddQuestions = () => {
  const [question, setQuestion] = useState('');
  const [category, setCategory] = useState('product');
  const [description, setDescription] = useState('Future');
  const [questionImage, setQuestionImage] = useState('');
  const [choices, setChoices] = useState(['', '']);
  const [correctIndex, setCorrectIndex] = useState(0);
  const [isImageMode, setIsImageMode] = useState(false);
  const [explanation, setExplanation] = useState('CorrectAnswer');
  const [addedQuestions, setAddedQuestions] = useState([]);

  const handleChoiceChange = (index, value) => {
    const updated = [...choices];
    updated[index] = value;
    setChoices(updated);
  };

  const addChoice = () => {
    if (choices.length < 6) {
      setChoices([...choices, '']);
    }
  };

  const removeChoice = (index) => {
    if (choices.length > 2) {
      const updated = choices.filter((_, i) => i !== index);
      setChoices(updated);
      if (correctIndex === index) setCorrectIndex(0);
      else if (index < correctIndex) setCorrectIndex(correctIndex - 1);
    }
  };

  const resetForm = () => {
    setQuestion('');
    setCategory('product');
    setDescription('');
    setQuestionImage('');
    setChoices(['', '']);
    setCorrectIndex(0);
    setIsImageMode(false);
    setExplanation('');
  };

  const handleAddQuestion = () => {
    const formattedChoices = choices.map((choice, i) => ({
      id: i + 1,
      text: isImageMode ? null : choice,
      image: isImageMode ? choice : null,
    }));

    const newQuestion = {
      question,
      category,
      description,
      image: questionImage,
      choices: formattedChoices,
      correctAnswer: formattedChoices[correctIndex]?.id,
      explanation,
    };

    setAddedQuestions([...addedQuestions, newQuestion]);
    resetForm();
  };

  const handleDownloadJson = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(addedQuestions, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', 'questions_export.json');
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="max-w-xl mx-auto bg-white p-6 rounded-md shadow-md space-y-4"
      >
        <h2 className="text-xl font-bold mb-4 text-gray-800">Add New Question</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700">Question</label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows="2"
            className="mt-1 block w-full rounded-md border px-3 py-2 shadow-sm"
            required
          />
        </div>

        {/* <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="2"
            className="mt-1 block w-full rounded-md border px-3 py-2 shadow-sm"
          />
        </div> */}

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full rounded-md border px-3 py-2 shadow-sm"
          >
            <option value="process">Process</option>
            <option value="product">Product</option>
            <option value="mentoring">Mentoring</option>
            <option value="wikipedia">Wikipedia</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Image (URL)</label>
          <input
            type="text"
            value={questionImage}
            onChange={(e) => setQuestionImage(e.target.value)}
            className="mt-1 block w-full rounded-md border px-3 py-2 shadow-sm"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isImageMode}
            onChange={() => setIsImageMode(!isImageMode)}
            id="isImageMode"
            className="accent-blue-600"
          />
          <label htmlFor="isImageMode" className="text-sm text-gray-700">
            Answers are images (URLs)
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Answers (Choose correct)
          </label>
          {choices.map((choice, index) => (
            <div key={index} className="flex items-center mb-2 gap-2">
              <input
                type="radio"
                name="correct"
                checked={correctIndex === index}
                onChange={() => setCorrectIndex(index)}
                className="accent-blue-600"
              />
              <input
                type="text"
                value={choice}
                onChange={(e) => handleChoiceChange(index, e.target.value)}
                placeholder={isImageMode ? `URL obrazka ${index + 1}` : `Answer ${index + 1}`}
                className="flex-1 rounded-md border px-3 py-2"
                required
              />
              {choices.length > 2 && (
                <button
                  type="button"
                  onClick={() => removeChoice(index)}
                  className="text-red-500 hover:underline text-sm"
                >
                  Usuń
                </button>
              )}
            </div>
          ))}
          {choices.length < 6 && (
            <button
              type="button"
              onClick={addChoice}
              className="mt-2 text-blue-600 hover:underline text-sm"
            >
              + Add answer
            </button>
          )}
        </div>

        {/* <div>
          <label className="block text-sm font-medium text-gray-700">Explanation</label>
          <textarea
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            rows="2"
            className="mt-1 block w-full rounded-md border px-3 py-2 shadow-sm"
          />
        </div> */}

        <div className="flex justify-between gap-4">
          <button
            type="button"
            onClick={handleAddQuestion}
            className="w-1/2 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
          >
            Add Question
          </button>

          <button
            type="button"
            onClick={handleDownloadJson}
            className="w-1/2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Export JSON
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddQuestions;
