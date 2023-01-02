import PrivateRouter from "./private";
import PublicRouter from "./public";

const MainRouter = ({isLogin, layout}) => isLogin ? <PrivateRouter layout={ layout } /> : <PublicRouter layout={ layout } />;

export default MainRouter;