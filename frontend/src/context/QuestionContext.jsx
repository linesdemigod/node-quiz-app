import { createContext, useReducer } from "react";
import QuestionReducer from "./QuestionReducer";

const QuestionContext = createContext();

export const QuestionProvider = ({ children }) => {
  const initialState = {
    error: false,
    message: "",
    success: false,
    questions: [],
    question: {},
    option: {},
    loading: false,
  };

  const [state, dispatch] = useReducer(QuestionReducer, initialState);

  return (
    <QuestionContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

export default QuestionContext;
