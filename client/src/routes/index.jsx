import { useEffect, memo } from "react";
import { useDispatch } from "react-redux";

import { SelectAuthState, RestAPIShow, RestAPIAuth } from "../core";
import PrivateRouter from "./private";
import PublicRouter from "./public";

const MainRouter = () => {
    const dispatch = useDispatch();
    const { isLogin } = SelectAuthState();

    useEffect(() => {
        const time = 1000 * 60 * 15; // ms
        const Show = () => dispatch(RestAPIShow());
        const rest = setInterval(Show, time);
        const Cleanup = () => clearInterval(rest);
        return Cleanup;
    }, [dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const hasSessionID = sessionStorage.getItem("SessionID");
        if (hasSessionID) dispatch(RestAPIAuth());
        const Show = () => dispatch(RestAPIShow());
        const first = setTimeout(Show);
        const Cleanup = () => clearTimeout(first);
        return Cleanup;
    }, [dispatch]);

    return isLogin ? <PrivateRouter /> : <PublicRouter />;
};

export default memo(MainRouter);
