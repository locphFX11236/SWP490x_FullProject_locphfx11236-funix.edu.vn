import PrivateRouter from "./private";
import PublicRouter from "./public";

const MainRouter = (views) => {
    const isLogin = true;
    return isLogin ? <PrivateRouter { ...views } /> : <PublicRouter { ...views } />;
};

export default MainRouter;