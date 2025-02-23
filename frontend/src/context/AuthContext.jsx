import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const initialState = {
        isAuthenticated: false,
        user: {},
        token: null,
        error: false,
        message: "",
        success: false,
        loading: false,
    };

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    return (
        <AuthContext.Provider
            value={{
                ...state,
                dispatch,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
