import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import PrivateRouter from "./private";
import PublicRouter from "./public";
import { RestAPIAuth, RestAPIShow } from "../core/thunkAction";
import { SelectAuthState } from "../core/slice/authData";

const MainRouter = (views) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLogin } = SelectAuthState();

    useEffect(() => {
        const hasSessionID = sessionStorage.getItem("SessionID");
        if (hasSessionID) dispatch(RestAPIAuth());
        dispatch(RestAPIShow());
    }, [dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const rest = setInterval(() => dispatch(RestAPIShow()), 1000 * 60 * 30);
        navigate("/");
        return () => clearInterval(rest);
    }, [dispatch, isLogin]); // eslint-disable-line react-hooks/exhaustive-deps

    return isLogin ? <PrivateRouter {...views} /> : <PublicRouter {...views} />;
};

export default MainRouter;
