import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    // Fetch quiz questions from the Laravel API
    axios.get("http://127.0.0.1:8000/api/quizzes").then((response) => {
      setQuizzes(response.data.quizzes);
    });
  }, []);

  const handleAnswer = (selectedAnswer) => {
    const correctAnswer = quizzes[currentQuiz].correct_answer;

    if (selectedAnswer === correctAnswer) {
      setScore(score + 1);
    }

    const nextQuiz = currentQuiz + 1;

    if (nextQuiz < quizzes.length) {
      setCurrentQuiz(nextQuiz);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="App">
      {quizzes.length === 0 ? (
        <p>Loading...</p>
      ) : showScore ? (
        <div className="score-section">
          <h2>
            You scored {score} out of {quizzes.length}
          </h2>
        </div>
      ) : (
        <div className="quiz-section">
          <h2>{quizzes[currentQuiz].question}</h2>
          <div className="options">
            {JSON.parse(quizzes[currentQuiz].options).map((option, index) => (
              <button key={index} onClick={() => handleAnswer(option)}>
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
