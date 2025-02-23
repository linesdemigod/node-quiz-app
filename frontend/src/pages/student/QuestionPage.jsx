import { useContext, useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import QuestionContext from "../../context/QuestionContext";
import { fetchQuizQuestions } from "../../context/QuestionAction";
import { useParams } from "react-router-dom";
import QuestionCard from "../../components/QuestionCard";

function QuestionPage() {
  const { loading, dispatch, questions } = useContext(QuestionContext);

  const { id } = useParams();

  useEffect(() => {
    dispatch({ type: "SET_LOADING" });
    const fetchQuestions = async () => {
      const questionsData = await fetchQuizQuestions(id);
      dispatch({
        type: "GET_QUESTIONS",
        payload: questionsData,
      });
    };

    fetchQuestions();
  }, [id, dispatch]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="">
      {questions && questions.length > 0 ? (
        <QuestionCard questions={questions} dispatch={dispatch} />
      ) : (
        <p className="text-center">No question</p>
      )}
    </div>
  );
}

export default QuestionPage;
