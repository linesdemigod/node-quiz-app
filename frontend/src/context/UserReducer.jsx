const userReducer = (state, action) => {
    switch (action.type) {
        case "GET_USERS":
            return {
                ...state,
                users: action.payload.users,
                loading: false,
            };
        case "CREATE_USER":
            return {
                ...state,
                user: action.payload.user,
                loading: false,
            };
        case "SHOW_USER":
            return {
                ...state,
                user: action.payload.user,
                loading: false,
            };
        case "UPDATE_USER":
            return {
                ...state,
                user: action.payload.user,
                loading: false,
            };
        case "DELETE_USER":
            let updateUsers = state.users.filter(
                (user) => user.id !== action.payload
            );
            return {
                ...state,
                users: updateUsers,
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

export default userReducer;
