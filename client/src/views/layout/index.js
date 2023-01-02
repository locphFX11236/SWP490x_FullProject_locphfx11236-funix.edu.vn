import { Outlet } from 'react-router-dom';

import HeaderLayout from "./header";
import Navigation from "./navBar";
import BreadcrumbLayout from "./breadcrumb";
import FooterLayout from "./footer";

const MainLayout = () => {
    return (
        <div>
            <HeaderLayout/>
            <Navigation />
            <BreadcrumbLayout />
            <Outlet />
            <FooterLayout />
        </div>
    );
};

export default MainLayout;