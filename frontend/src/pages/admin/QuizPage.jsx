import { useContext, useEffect, useState } from "react";
import QuizItem from "../../components/QuizItem";
import Spinner from "../../components/Spinner";
import QuizContext from "../../context/QuizContext";
import { getQuizzes, deleteQuiz, createQuiz } from "../../context/QuizAction";
import { toast } from "react-toastify";
import Button from "../../components/Button";

function QuizPage() {
  const { quizzes, loading, dispatch } = useContext(QuizContext);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
  });

  const { title, description, duration } = formData;

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  useEffect(() => {
    dispatch({ type: "SET_LOADING" });
    const fetchQuizzes = async () => {
      const quizData = await getQuizzes();
      dispatch({ type: "GET_QUIZZES", payload: quizData });
    };
    fetchQuizzes();
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title === "" || description === "" || duration === "") {
      toast.error("Fill all fields");
    } else {
      // create new quiz
      const data = await createQuiz(formData);
      if (data.success) {
        dispatch({ type: "CREATE_QUIZ", payload: data });
        toast.success("Quiz created successfully");
        setFormData({ title: "", description: "", duration: "" });
        handleClose();
      } else {
        toast.error(data.message);
      }
    }
  };

  //   delete quiz
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to remove this?")) {
      await deleteQuiz(id);
      dispatch({ type: "DELETE_QUIZ", payload: id });
    }
  };

  return (
    <>
      <div className="container">
        <h2 className="text-center font-bold text-base lg:text-3xl mb-5">
          List of Quizzes
        </h2>

        <Button
          className="bg-primary hover:bg-primary text-white font-bold py-2 px-4 rounded mb-5"
          onClick={handleOpen}
          label="Create Quiz"
        />

        <div className="rounded-lg sm:mx-auto sm:w-full w-full">
          {loading ? (
            <Spinner />
          ) : quizzes && quizzes.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mt-5">
              {quizzes.map((quiz) => (
                <QuizItem
                  key={quiz.id}
                  quiz={quiz}
                  handleDelete={handleDelete}
                  dispatch={dispatch}
                />
              ))}
            </div>
          ) : (
            <div className="flex mt-8 justify-center items-center">
              <p className="font-semibold text-lg">No quizzes found</p>
            </div>
          )}
        </div>
      </div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Create a Quiz</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Quiz Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={description}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Duration
                </label>
                <input
                  type="number"
                  name="duration"
                  value={duration}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <Button
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  onClick={handleClose}
                  label="Cancel"
                />

                <Button
                  className="px-4 py-2 bg-primary rounded hover:bg-secondary text-white"
                  type="submit"
                  label="Submit"
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default QuizPage;
