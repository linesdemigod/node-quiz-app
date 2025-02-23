import { Link } from "react-router-dom";

function QuizCard({ quiz }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 flex justify-center items-center">
      <div className="text-center">
        <h2 className="font-semibold text-lg mb-3">{quiz.title}</h2>
        <p className="text-base text-gray-500 mb-3">
          {quiz.description ?? "N/A"}
        </p>
        <div className="flex flex-row gap-4 items-center justify-center mb-4">
          <p className="text-base text-gray-600 ">
            Questions:{" "}
            <span className="font-semibold">{quiz.questions_count}</span>
          </p>
          <span className="border border-y-8 border-gray-500"></span>
          <p className="text-base text-gray-600">
            Duration: <span className="font-semibold">{quiz.duration}</span>{" "}
            Minutes
          </p>
        </div>

        <Link
          to={`question/${quiz.id}`}
          className="px-4 py-2 rounded-lg bg-primary hover:bg-secondary text-white"
        >
          Start Quiz
        </Link>
      </div>
    </div>
  );
}

export default QuizCard;
