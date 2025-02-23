import { Link } from "react-router-dom";
import Button from "./Button";

function QuestionItem({ question, handleDelete, index }) {
  return (
    <section className="mt-3">
      <div className="container">
        <div className="bg-white shadow-sm p-4 rounded-lg mx-auto max-w-screen-md">
          <h2 className="text-lg font-bold mb-2 text-center">
            Question {index + 1}
          </h2>

          <p className="text-base font-semibold text-gray-600 mb-4 text-start">
            {question.questionText}
          </p>
          <div className="text-start">
            {question.options.map((option) => (
              <p key={option.id}>
                {option.optionText}{" "}
                <span className="text-green-600">
                  {option.isCorrect === true ? "(answer)" : ""}
                </span>
              </p>
            ))}
          </div>
          <div className="flex flex-cols gap-3 items-center mt-3">
            <Button
              onClick={() => handleDelete(question.id)}
              label="Delete"
              className="px-4 py-2 bg-danger text-white rounded-lg hover:bg-red-600"
            />

            <Link
              to={`/admin/edit-question/${question.id}`}
              className="px-4 py-2 rounded-lg bg-primary hover:bg-primary text-white"
            >
              Edit
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default QuestionItem;
