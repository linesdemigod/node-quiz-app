import API from "./API";

export const getQuizzes = async () => {
  try {
    const response = await API.get("/get-quizzes", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = response.data;

    return { quizzes: data.quizzes };
  } catch (error) {
    console.log(error);
  }
};

export const createQuiz = async (formData) => {
  try {
    const response = await API.post("/store-quiz", formData);

    const data = response.data;

    return {
      success: true,
      message: data.message,
      quiz: data.quiz,
    };
  } catch (error) {
    const errorMessage =
      error.response?.data.message || "An unexpected error occurred.";

    return { success: false, message: errorMessage };
  }
};

export const getSingleQuiz = async (id) => {
  try {
    const response = await API.get(`/get-quiz/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = response.data;

    return {
      quiz: data.quiz,
      success: true,
    };
  } catch (error) {
    const errorMessage =
      error.response?.data.message || "An unexpected error occurred.";

    return { success: false, message: errorMessage };
  }
};

export const updateQuiz = async (id, formData) => {
  try {
    const response = await API.put(`/update-quiz/${id}`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = response.data;
    return {
      success: true,
      message: data.message,
      quiz: data.quiz,
    };
  } catch (error) {
    const errorMessage =
      error.response?.data.message || "An unexpected error occurred.";

    return { success: false, message: errorMessage };
  }
};

export const deleteQuiz = async (id) => {
  try {
    const response = await API.delete(`/delete-quiz/${id}`);

    const data = response.data;

    return { message: data.message, id: id };
  } catch (error) {
    console.log(error);
  }
};
