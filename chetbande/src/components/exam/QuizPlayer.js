import React, { useState } from 'react';

const QuizPlayer = ({ quizData }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const handleOptionSelect = (option) => {
    const isOptionSelected = selectedOptions.includes(option);
    let updatedOptions;
    if (isOptionSelected) {
      // Deselect the option if already selected
      updatedOptions = selectedOptions.filter((item) => item !== option);
    } else {
      // Select the option if not already selected
      updatedOptions = [...selectedOptions, option];
    }
    setSelectedOptions(updatedOptions);
  };

  const handleNextQuestion = () => {
    const correctOptions = quizData[currentQuestionIndex].correctOptions;
    const isAnswerCorrect =
      selectedOptions.length === correctOptions.length &&
      selectedOptions.every((option) => correctOptions.includes(option));
    if (isAnswerCorrect) {
      setScore(score + 1);
    }
    setSelectedOptions([]);
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptions([]);
    setShowResult(false);
    setScore(0);
  };

  const renderQuestion = () => {
    const question = quizData[currentQuestionIndex];
    return (
      <div>
        <h2>{question.question}</h2>
        <ul>
          {question.options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionSelect(option)}
              style={{
                backgroundColor: selectedOptions.includes(option)
                  ? 'lightblue'
                  : 'white',
                cursor: 'pointer',
              }}
            >
              {option}
            </li>
          ))}
        </ul>
        <button onClick={handleNextQuestion} disabled={selectedOptions.length === 0}>
          Next Question
        </button>
      </div>
    );
  };

  const renderResult = () => {
    return (
      <div>
        <h2>Quiz Result</h2>
        <p>Your score: {score}</p>
        <button onClick={handleRestartQuiz}>Restart Quiz</button>
      </div>
    );
  };

  return (
    <div>
      {showResult ? renderResult() : renderQuestion()}
    </div>
  );
};

export default QuizPlayer;