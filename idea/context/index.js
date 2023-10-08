import { createContext, useContext, useReducer } from "react";

const initState = {
    isWaiting: false,
    isError: false,
    message: "",
};

export const IsWaitingContext = createContext();

// Const
const LOADING_ACTION = "loading";
const LOADED_ACTION = "done";
const ERROR_ACTION = "error";

const ErrorAction = (message) => ({
    type: "error",
    payload: {
        isLoading: true,
        isError: true,
        message: message,
    },
});

// Reducer
const reducer = (state, action) => {
    switch (action.type || action) {
        case LOADING_ACTION:
            return { ...state, isWaiting: true };
        case LOADED_ACTION:
            return { ...state, ...initState };
        case ERROR_ACTION:
            return { ...state, ...action.payload };
        default:
            throw new Error("Invalid action");
    }
};

export const ContextStoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initState);
    return (
        <IsWaitingContext.Provider value={{ state, dispatch }}>
            {children}
        </IsWaitingContext.Provider>
    );
};

// Custom Hook => cho phép sử dụng các Hook khác, mà function thông thường (không phải UI) không dùng được
export const useWaiting = () => {
    const { state, dispatch } = useContext(IsWaitingContext);
    const setWaiting = (payload) =>
        payload ? dispatch(LOADING_ACTION) : dispatch(LOADED_ACTION);
    return { ...state, setWaiting, setError: ErrorAction };
};
