const quizReducer = (state, action) => {
  switch (action.type) {
    case "GET_QUIZZES":
      return {
        ...state,
        quizzes: action.payload.quizzes,
        loading: false,
      };
    case "CREATE_QUIZ":
      return {
        ...state,
        // quiz: action.payload.quiz,
        quizzes: [...state.quizzes, action.payload.quiz],
        loading: false,
      };
    case "SHOW_QUIZ":
      return {
        ...state,
        quiz: action.payload.quiz,
        loading: false,
      };
    case "UPDATE_QUIZ":
      let editedQuiz = state.quizzes.map((quiz) =>
        quiz.id === action.payload.id ? action.payload : quiz
      );
      return {
        ...state,
        quizzes: editedQuiz,
        loading: false,
      };
    case "DELETE_QUIZ":
      let updateQuizzes = state.quizzes.filter(
        (quiz) => quiz.id !== action.payload
      );
      return {
        ...state,
        quizzes: updateQuizzes,
        loading: false,
      };

    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "ERROR":
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default quizReducer;
