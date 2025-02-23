import { useContext, useState } from "react";
import QuestionContext from "../../context/QuestionContext";
import { createQuestion } from "../../context/QuestionAction";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../components/Button";

function CreateQuestion() {
  const { loading, dispatch } = useContext(QuestionContext);
  const [inputs, setInput] = useState([]);
  const [count, setCount] = useState(0);
  const { id } = useParams();
  const [formData, setFormData] = useState({
    quiz_id: id,
    question_text: "",
    option_text: [],
    is_correct: [],
  });

  const { quiz_id, question_text, option_text, is_correct } = formData;

  const addInput = () => {
    setInput([...inputs, { id: Date.now() }]);
    setFormData((prevState) => ({
      ...prevState,
      option_text: [...prevState.option_text, ""],
      is_correct: [...prevState.is_correct, false],
    }));
  };

  const removeInput = (id) => {
    setInput(inputs.filter((input) => input.id !== id));
    setCount(count - 1);
  };

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...formData.option_text];
    updatedOptions[index] = value;
    setFormData((prevState) => ({
      ...prevState,
      option_text: updatedOptions,
    }));
  };

  const handleCorrectChange = (index) => {
    const updatedCorrect = Array(formData.option_text.length).fill(false);
    updatedCorrect[index] = true;
    setFormData((prevState) => ({
      ...prevState,
      is_correct: updatedCorrect,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (question_text === "") {
      toast.error("Fill all fields");
    } else {
      const data = await createQuestion(formData);

      if (data.success) {
        dispatch({ type: "CREATE_QUESTION", payload: data });
        toast.success(data.message);
        //clear form
        setFormData({
          question_text: "",
          option_text: [],
          is_correct: [],
        });
      } else {
        toast.error(data.message);
      }
    }
  };
  return (
    <div className="container">
      <div className="flex flex-row justify-between items-center gap-5">
        <h1 className="text-3xl font-bold text-center">Question</h1>

        <Link
          className="text-primary hover:underline font-semibold"
          to={`/admin/questions/${id}`}
        >
          Back
        </Link>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="max-w-2xl rounded-lg bg-white px-8 py-6 shadow-md">
          <h1 className="mb-4 text-center text-2xl font-bold">
            Create Question
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Question
              </label>
              <input
                type="text"
                id="name"
                name="question_text"
                className="focus:border-indigo-500 focus:ring-indigo-500 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none"
                placeholder="Question"
                value={question_text}
                onChange={handleChange}
              />
            </div>
            {inputs.map((input, index) => (
              <div className="mb-4" key={input.id}>
                <div className="flex gap-2 items-center justify-between">
                  <div className="w-full">
                    {/* <label
                      htmlFor={`option_text_${index}`}
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Option {index + 1}
                    </label> */}
                    <input
                      type="text"
                      name={`option_text_${index}`}
                      id={`option_text_${index}`}
                      className="focus:border-indigo-500 focus:ring-indigo-500 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none"
                      value={formData.option_text[index] || ""}
                      placeholder={`Option ${index + 1}`}
                      onChange={(e) =>
                        handleOptionChange(index, e.target.value)
                      }
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      id={`is_correct_${index}`}
                      type="radio"
                      name="is_correct"
                      value={index}
                      checked={formData.is_correct[index] || false}
                      onChange={() => handleCorrectChange(index)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                    />
                    <label
                      htmlFor={`is_correct_${index}`}
                      className="ms-2 mb-2 block text-sm font-medium text-gray-700"
                    >
                      Answer
                    </label>
                  </div>

                  <Button
                    label="Remove"
                    onClick={() => removeInput(input.id)}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                  />
                </div>
              </div>
            ))}
            <Button
              label="Add option"
              onClick={addInput}
              className="w-full mb-3 px-4 py-2 bg-primary hover:bg-secondary text-white rounded-lg"
            />
            <button
              type="submit"
              name="submit"
              className="flex w-full justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateQuestion;
