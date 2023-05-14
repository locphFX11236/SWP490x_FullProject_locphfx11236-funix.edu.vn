export const BACK_END_URL = process.env.REACT_APP_BACK_END_PORT;

export const FRONT_END_URL = process.env.REACT_APP_FRONT_END_PORT;

const ChoiceDev =
    process.env.REACT_APP_BACK_END_DEV === "restAPI"
        ? BACK_END_URL
        : process.env.PUBLIC_URL;

export const EXTEND_URL = `${ChoiceDev}/public/`;
