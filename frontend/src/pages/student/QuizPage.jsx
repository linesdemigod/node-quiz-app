import { useContext, useEffect } from "react";
import Spinner from "./../../components/Spinner";
import QuizContext from "../../context/QuizContext";
import { getQuizzes } from "../../context/QuizAction";
import QuizCard from "../../components/QuizCard";

function QuizPage() {
  const { quizzes, loading, dispatch } = useContext(QuizContext);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const quizData = await getQuizzes();
      dispatch({ type: "GET_QUIZZES", payload: quizData });
    };

    fetchQuizzes();
  }, [dispatch]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="mt-10 container">
        <div className="grid grid-cols-1 justify-between gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {quizzes.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      </div>
    </>
  );
}

export default QuizPage;
