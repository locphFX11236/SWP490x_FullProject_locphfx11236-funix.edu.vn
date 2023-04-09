export const BACK_END_URL = process.env.port || "http://localhost:5000";

export const EXTEND_URL =
    (true ? BACK_END_URL : process.env.PUBLIC_URL) + "/public/";
