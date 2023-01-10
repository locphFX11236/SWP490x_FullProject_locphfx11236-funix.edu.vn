import { useDispatch } from "react-redux";
import { useEffect } from 'react';

import PrivateRouter from "./private";
import PublicRouter from "./public";
import { RestAPIShow } from "../core/slice/showData";
import { RestAPIAuth } from "../core/slice/authData";

const MainRouter = (views) => {
    const dispatch = useDispatch();
    const isLogin = true;

    useEffect(() => {
        dispatch( RestAPIShow() );
        dispatch( RestAPIAuth({
            phoneNumber: "0987654321",
            password: "123456",
        }) );
    }, [ dispatch ]);

    return isLogin ? <PrivateRouter { ...views } /> : <PublicRouter { ...views } />;
};

export default MainRouter;