const questionReducer = (state, action) => {
  switch (action.type) {
    case "GET_QUESTIONS":
      return {
        ...state,
        questions: action.payload.questions,
        loading: false,
      };
    case "CREATE_QUESTION":
      return {
        ...state,
        question: action.payload.question,
        loading: false,
      };
    case "SHOW_QUESTION":
      return {
        ...state,
        question: action.payload.question,
        loading: false,
      };
    case "UPDATE_QUESTION":
      return {
        ...state,
        question: action.payload.question,
        loading: false,
      };
    case "DELETE_QUESTION":
      let updateQuestions = state.questions.filter(
        (question) => question.id !== action.payload
      );

      return {
        ...state,
        questions: updateQuestions,
        loading: false,
      };
    case "GET_OPTION":
      return {
        ...state,
        option: action.payload.option,
        loading: false,
      };
    case "SET_ATTEMPT":
      return {
        ...state,
        message: action.payload.message,
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

export default questionReducer;
