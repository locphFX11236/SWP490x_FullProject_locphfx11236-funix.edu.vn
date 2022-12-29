import Navigation from "./navBar";
import HeaderLayout from "./header";
import FooterLayout from "./footer";

const MainLayout = ({children}) => {
    return (
        <div>
            <Navigation />
            <HeaderLayout/>
            {children}
            <FooterLayout/>
        </div>
    );
};

export default MainLayout;