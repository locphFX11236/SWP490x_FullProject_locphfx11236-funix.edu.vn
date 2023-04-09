import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import PrivateRouter from "./private";
import PublicRouter from "./public";
import { RestAPIShow } from "../core/thunkAction";
import { SelectAuthState } from "../core/slice/authData";

const MainRouter = (views) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLogin } = SelectAuthState();

    useEffect(() => {
        dispatch(RestAPIShow());
        navigate("/");
    }, [dispatch, isLogin]); // eslint-disable-line react-hooks/exhaustive-deps

    return isLogin ? <PrivateRouter {...views} /> : <PublicRouter {...views} />;
};

export default MainRouter;
