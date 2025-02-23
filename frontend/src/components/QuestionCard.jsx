import { useState, useEffect, useContext } from "react";
import QuestionContext from "../context/QuestionContext";
import { setAttempt, checkQuestionAnswer } from "../context/QuestionAction";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Button from "./../components/Button";

function QuestionCard({ questions, dispatch }) {
  const { option } = useContext(QuestionContext);
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [timeLeft, setTimeLeft] = useState({
    minutes: Math.floor(questions[0]?.quiz.duration || 0),
    seconds: 0,
  });

  useEffect(() => {
    if (showScore) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime.minutes === 0 && prevTime.seconds === 0) {
          clearInterval(timer);
          // finalizeAttempt(score);
          setShowScore(true);
          return { minutes: 0, seconds: 0 };
        } else if (prevTime.seconds === 0) {
          return { minutes: prevTime.minutes - 1, seconds: 59 };
        } else {
          return { minutes: prevTime.minutes, seconds: prevTime.seconds - 1 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showScore, currentQuiz, score]);

  const handleAnswer = async (id, answer) => {
    let updatedScore = score;

    const data = await checkQuestionAnswer(id, answer);
    dispatch({ type: "GET_OPTION", payload: data });

    if (data) {
      if (data.option.isCorrect) {
        updatedScore += 1;
        setScore(updatedScore);
      }

      const nextQuiz = currentQuiz + 1;
      if (nextQuiz < questions.length) {
        setCurrentQuiz(nextQuiz);
        setQuestionNumber((prevNumber) => prevNumber + 1);
      } else {
        // finalizeAttempt(updatedScore);
        setShowScore(true);
      }
    }
  };
  // const handleAnswer = (isCorrect) => {
  //   let updatedScore = score;

  //   if (isCorrect) {
  //     updatedScore += 1; // Calculate the new score locally
  //     setScore(updatedScore);
  //   }

  //   const nextQuiz = currentQuiz + 1;
  //   if (nextQuiz < questions.length) {
  //     setCurrentQuiz(nextQuiz);
  //     setQuestionNumber((prevNumber) => prevNumber + 1);
  //   } else {
  //     // finalizeAttempt(updatedScore);
  //     setShowScore(true);
  //   }
  // };

  const tryAgain = () => {
    setShowScore(false);
    setScore(0);
    setCurrentQuiz(0);
    setQuestionNumber(1);
    setTimeLeft({
      minutes: Math.floor(questions[0]?.quiz.duration || 0),
      seconds: 0,
    });
  };

  const finalizeAttempt = async (finalScore) => {
    const attemptData = {
      quiz_id: questions[currentQuiz]?.quiz.id,
      score: finalScore,
    };

    const data = await setAttempt(attemptData);

    if (data.success) {
      toast.success(data.message);
      dispatch({ type: "SET_ATTEMPT", payload: data });
    } else {
      toast.error(data.message || "An error occurred!");
    }
  };

  if (!questions || questions.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <section className="py-10">
      <div className="container">
        {showScore ? (
          <div className="bg-white shadow-sm p-4 rounded-lg mx-auto max-w-2xl">
            <h2 className="text-lg font-bold mb-4">Quiz Results</h2>
            <h2 className="mb-4">
              You scored {score} out of {questions.length}
            </h2>

            <Button
              onClick={tryAgain}
              className="px-4 py-2 rounded-lg bg-primary hover:bg-secondary text-white"
              label="Try Again"
            />
          </div>
        ) : (
          <div className="bg-white shadow-sm p-4 rounded-lg mx-auto max-w-2xl ">
            <div className="flex flex-col justify-between items-center gap-5 md:flex-row lg:flex-row xl:flex-row mb-5">
              <p className="font-semibold">{questions[0].quiz.title}</p>
              <p className=" text-primary mb-3">
                Time Left: {timeLeft.minutes}:{timeLeft.seconds < 10 ? "0" : ""}
                {timeLeft.seconds}
              </p>
            </div>

            <div className="flex flex-row items-center gap-3 mb-4">
              <span className="text-lg font-bold text-center bg-primary px-2 py-1 rounded-lg text-white">
                {questionNumber}
              </span>

              <p className="text-base font-semibold text-black ">
                {questions[currentQuiz].questionText}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {questions[currentQuiz].options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleAnswer(option.id, option.questionId)}
                  className="px-4 py-2 rounded-lg border border-primary hover:bg-primary text-black hover:text-white text-start cursor-pointer"
                >
                  {option.optionText}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default QuestionCard;
