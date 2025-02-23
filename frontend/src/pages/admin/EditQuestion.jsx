import { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import QuestionContext from "../../context/QuestionContext";
import {
  updateQuestion,
  getSingleQuestion,
} from "../../context/QuestionAction";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";
import Button from "../../components/Button";

function EditQuestion() {
  const { loading, question, dispatch } = useContext(QuestionContext);
  const [inputs, setInputs] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    question_text: "",
    option_text: [],
    is_correct: [],
  });

  const { question_text, option_text, is_correct } = formData;

  useEffect(() => {
    const fetchQuestion = async () => {
      dispatch({ type: "SET_LOADING" });
      const questionData = await getSingleQuestion(id);
      dispatch({
        type: "SHOW_QUESTION",
        payload: questionData,
      });
    };

    fetchQuestion();
  }, [id, dispatch]);

  useEffect(() => {
    if (question) {
      setFormData({
        question_text: question.questionText || "",
        option_text: question.options?.map((o) => o.optionText) || [],
        is_correct: question.options?.map((o) => o.isCorrect) || [],
      });
      setInputs(question.options?.map(() => ({ id: Date.now() })) || []);
    }
  }, [question]);

  const addInput = () => {
    setInputs([...inputs, { id: Date.now() }]);
    setFormData((prevState) => ({
      ...prevState,
      option_text: [...prevState.option_text, ""],
      is_correct: [...prevState.is_correct, false],
    }));
  };

  const removeInput = (id, index) => {
    setInputs(inputs.filter((input) => input.id !== id));
    setFormData((prevState) => {
      const updatedOptions = [...prevState.option_text];
      const updatedCorrect = [...prevState.is_correct];
      updatedOptions.splice(index, 1);
      updatedCorrect.splice(index, 1);
      return {
        ...prevState,
        option_text: updatedOptions,
        is_correct: updatedCorrect,
      };
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...formData.option_text];
    updatedOptions[index] = value;
    setFormData({ ...formData, option_text: updatedOptions });
  };

  const handleCorrectChange = (index) => {
    const updatedCorrect = Array(formData.option_text.length).fill(false);
    updatedCorrect[index] = true;
    setFormData({ ...formData, is_correct: updatedCorrect });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!question_text.trim()) {
      toast.error("Question text cannot be empty.");
      return;
    }

    const data = await updateQuestion(id, formData);

    if (data.success) {
      dispatch({ type: "UPDATE_QUESTION", payload: data });
      toast.success(data.message);
      navigate(`/admin/questions/${question.quizId}`);
    } else {
      toast.error(data.error);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="container">
      <div className="flex flex-row justify-between items-center gap-5">
        <h1 className="text-3xl font-bold text-center">Edit Question</h1>
        <Link
          className="text-primary hover:underline font-semibold"
          to={`/admin/questions/${question?.quizId}`}
        >
          Back
        </Link>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="max-w-2xl rounded-lg bg-white px-8 py-6 shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="question_text"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Question
              </label>
              <input
                type="text"
                id="question_text"
                name="question_text"
                className="focus:border-indigo-500 focus:ring-indigo-500 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
                placeholder="Enter question"
                value={question_text}
                onChange={handleChange}
              />
            </div>
            {formData.option_text.map((option, index) => (
              <div className="mb-4" key={index}>
                <div className="flex gap-2 items-center justify-between">
                  <input
                    type="text"
                    name={`option_text_${index}`}
                    className="focus:border-indigo-500 focus:ring-indigo-500 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                  />
                  <input
                    type="radio"
                    name="is_correct"
                    className="w-4 h-4"
                    checked={is_correct[index] || false}
                    onChange={() => handleCorrectChange(index)}
                  />
                  <Button
                    label="Remove"
                    onClick={() => removeInput(inputs[index]?.id, index)}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                  />
                </div>
              </div>
            ))}
            <Button
              label="Add Option"
              onClick={addInput}
              className="w-full px-4 py-2 bg-primary hover:bg-secondary text-white rounded-lg"
            />
            <button
              type="submit"
              className="mt-4 w-full px-4 py-2 bg-primary text-white rounded-md"
            >
              Update Question
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditQuestion;
