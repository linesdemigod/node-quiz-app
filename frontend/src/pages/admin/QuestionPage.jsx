import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import QuestionContext from "../../context/QuestionContext";
import { getQuestions, deleteQuestion } from "../../context/QuestionAction";
import { useParams } from "react-router-dom";
import QuestionItem from "../../components/QuestionItem";

function QuestionPage() {
  const { loading, dispatch, questions } = useContext(QuestionContext);
  const { id } = useParams();
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });

  useEffect(() => {
    const fetchQuestions = async () => {
      dispatch({ type: "SET_LOADING" });
      const questionsData = await getQuestions(id, pagination.currentPage);

      if (questionsData.success) {
        dispatch({
          type: "GET_QUESTIONS",
          payload: { questions: questionsData.questions }, // Updated payload
        });
        setPagination(questionsData.pagination); // Update pagination state
      }
    };

    fetchQuestions();
  }, [id, pagination.currentPage, dispatch]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination((prev) => ({ ...prev, currentPage: newPage }));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to remove this?")) {
      await deleteQuestion(id);
      dispatch({ type: "DELETE_QUESTION", payload: id });
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <section className="mt-5 py-10">
      <div className="container">
        <h1 className="text-lg font-semibold text-center">List of Questions</h1>

        <Link
          to={`/admin/create-question/${id}`}
          className="bg-primary hover:bg-primary text-white font-bold py-2 px-4 rounded mb-5 "
        >
          Create Question
        </Link>

        <div className="mt-5">
          {questions && questions.length > 0 ? (
            questions.map((question, index) => (
              <QuestionItem
                key={question.id}
                index={index}
                question={question}
                handleDelete={handleDelete}
              />
            ))
          ) : (
            <p className="text-lg">No questions found</p>
          )}
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
            className="px-4 py-2 mx-1 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="mx-2">{`Page ${pagination.currentPage} of ${pagination.totalPages}`}</span>
          <button
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={pagination.currentPage === pagination.totalPages}
            className="px-4 py-2 mx-1 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}

export default QuestionPage;
