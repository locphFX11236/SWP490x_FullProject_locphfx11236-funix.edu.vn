import { Outlet } from 'react-router-dom';

import HeaderLayout from "./header";
import Navigation from "./navBar";
// import BreadcrumbLayout from "./breadcrumb";
import FooterLayout from "./footer";

export const MainLayout = () => (
    <>
        <HeaderLayout/>
        <Navigation />
        {/* <BreadcrumbLayout /> */}
        <Outlet />
        <FooterLayout />
    </>
);