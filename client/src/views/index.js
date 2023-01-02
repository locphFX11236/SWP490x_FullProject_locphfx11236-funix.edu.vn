import MainRouter from "../routes";
import MainLayout from "./layout";

const MainView = () => <MainRouter isLogin={true} layout={<MainLayout />} />;

export default MainView;