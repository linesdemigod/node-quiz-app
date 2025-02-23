import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { updateQuiz } from "../context/QuizAction";
import { shortContent } from "../helpers/Helper";
import Button from "./Button";

const QuizItem = ({ quiz, handleDelete, dispatch }) => {
  const [formEditData, setFormEditData] = useState({
    title: quiz.title,
    description: quiz.description,
    duration: quiz.duration,
  });
  const [isToggle, setIsToggle] = useState(false);

  const handleToggleOpen = () => setIsToggle(true);
  const handleToggleClose = () => setIsToggle(false);

  const handleChange = (e) => {
    setFormEditData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, duration } = formEditData;

    if (!title || !description || !duration) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const data = await updateQuiz(quiz.id, formEditData);
      if (data.success) {
        dispatch({ type: "UPDATE_QUIZ", payload: data.quiz });
        toast.success("Quiz updated successfully.");
        handleToggleClose();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("An error occurred while updating the quiz.");
    }
  };

  const description = shortContent(quiz.description ?? "N/A", 10);

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm p-4 flex justify-center items-center">
        <div className="text-center">
          <h2 className="font-semibold text-lg mb-3">{quiz.title}</h2>
          <p className="text-base text-gray-500 mb-3">{description}</p>
          <p className="text-sm text-gray-600 mb-5">
            Duration:{" "}
            <span className="italic font-semibold">{quiz.duration}</span>{" "}
            Minutes
          </p>

          <div className="flex justify-center gap-3 items-center flex-col md:flex-col lg:flex-col xl:flex-row">
            <Button
              onClick={handleToggleOpen}
              className="py-2 px-4 text-white bg-gray-700 rounded-lg"
              label="Edit"
            />

            <Button
              type="button"
              className="py-2 px-4 text-white bg-danger rounded-lg"
              onClick={() => handleDelete(quiz.id)}
              label="Delete"
            />

            <Link
              to={`/admin/questions/${quiz.id}`}
              className="py-2 px-4 text-white bg-secondary hover:bg-primary rounded-lg"
            >
              Questions
            </Link>
          </div>
        </div>
      </div>

      {isToggle && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Update a Quiz</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Quiz Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formEditData.title}
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
                  value={formEditData.description}
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
                  value={formEditData.duration}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  onClick={handleToggleClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-secondary"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default QuizItem;
