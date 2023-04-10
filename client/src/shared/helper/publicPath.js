export const BACK_END_URL =
    process.env.NODE_ENV !== "development"
        ? process.env.REACT_APP_BACK_END_PORT
        : "http://localhost:5000";

export const EXTEND_URL = `${
    process.env.REACT_APP_BACK_END_DEV === "restAPI"
        ? BACK_END_URL
        : process.env.PUBLIC_URL
}/public/`;
