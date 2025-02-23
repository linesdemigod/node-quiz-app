import { createContext, useReducer } from "react";
import UserReducer from "./UserReducer";
// import http from "./VotingAction";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const initialState = {
        error: false,
        message: "",
        success: false,
        users: [],
        user: {},
        loading: false,
    };

    const [state, dispatch] = useReducer(UserReducer, initialState);

    return (
        <UserContext.Provider
            value={{
                ...state,
                dispatch,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
