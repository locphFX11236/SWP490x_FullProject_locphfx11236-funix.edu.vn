import MainLayout from "./layout";

const MainView = ({children}) => {
    return (
        <div>
            <h1>Main View</h1>
            <MainLayout>{children}</MainLayout>
            <h1>Main View</h1>
        </div>
    );
};

export default MainView;