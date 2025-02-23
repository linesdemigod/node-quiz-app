import { createContext, useReducer } from "react";
import QuizReducer from "./QuizReducer";
// import http from "./VotingAction";

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const initialState = {
    error: false,
    message: "",
    success: false,
    quizzes: [],
    quiz: {},
    loading: false,
  };

  const [state, dispatch] = useReducer(QuizReducer, initialState);

  return (
    <QuizContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export default QuizContext;
