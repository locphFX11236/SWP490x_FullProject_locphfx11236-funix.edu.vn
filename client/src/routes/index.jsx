import { useDispatch } from "react-redux";
import { useEffect } from 'react';

import PrivateRouter from "./private";
import PublicRouter from "./public";
import { RestAPIShow } from "../core/slice/showData";
import { SelectAuthState } from "../core/slice/authData";

const MainRouter = (views) => {
    const dispatch = useDispatch();
    const { isLogin } = SelectAuthState();

    useEffect(() => {
        dispatch( RestAPIShow() );
    }, [ dispatch ]);

    return isLogin ? <PrivateRouter { ...views } /> : <PublicRouter { ...views } />;
};

export default MainRouter;