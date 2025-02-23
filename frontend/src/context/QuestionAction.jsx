import API from "./API";

export const getQuestions = async (id, page = 1) => {
  try {
    const response = await API.get(`/quiz-questions/${id}?page=${page}`);

    const data = response.data;
    console.log(data);

    return {
      success: true,
      questions: data.questions,
      pagination: data.pagination,
    };
  } catch (error) {
    return {
      success: false,
      questions: [],
      pagination: { current_page: 1, last_page: 1 },
    };
  }
};

export const fetchQuizQuestions = async (id) => {
  try {
    const response = await API.get(`/questions/${id}`);

    const data = response.data;

    return {
      success: true,
      message: data.message,
      questions: data.questions,
    };
  } catch (error) {
    console.log(error);
  }
};

export const createQuestion = async (formData) => {
  try {
    const response = await API.post("/store-question", formData);

    const data = response.data;

    return {
      success: true,
      message: data.message,
      user: data.question,
    };
  } catch (error) {
    const errorMessage =
      error.response?.data.message || "An unexpected error occurred.";

    return { success: false, message: errorMessage };
  }
};

export const getSingleQuestion = async (id) => {
  try {
    const response = await API.get(`/get-question/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = response.data;
    console.log(data);

    return {
      question: data.question,
      success: true,
    };
  } catch (error) {
    const errorMessage =
      error.response?.data.message || "An unexpected error occurred.";

    return { success: false, message: errorMessage };
  }
};

export const updateQuestion = async (id, formData) => {
  try {
    const response = await API.put(`/update-question/${id}`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = response.data;
    return {
      success: true,
      message: data.message,
      question: data.question,
    };
  } catch (error) {
    console.log(error);
    const errorMessage =
      error.response?.data.message || "An unexpected error occurred.";

    return { success: false, message: errorMessage };
  }
};

export const deleteQuestion = async (id) => {
  try {
    const response = await API.delete(`/delete-question/${id}`);

    const data = response.data;
    return {
      success: true,
      message: data.message,
      id: id,
    };
  } catch (error) {
    const errorMessage =
      error.response?.data.message || "An unexpected error occurred.";

    return { success: false, message: errorMessage };
  }
};

export const checkQuestionAnswer = async (id, q) => {
  try {
    const response = await API.get(`/question-answer?id=${id}&q=${q}`);
    const data = response.data;

    return {
      success: true,
      option: data.option,
    };
  } catch (error) {
    console.log(error);
  }
};

export const setAttempt = async (formData) => {
  try {
    const response = await API.post("/store-attempt", formData);
    const data = response.data;

    return {
      success: true,
      message: data.message,
    };
  } catch (error) {
    console.log(error);
  }
};
