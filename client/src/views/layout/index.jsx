import { memo } from "react";
import { Outlet } from "react-router-dom";

import HeaderLayout from "./header";
import Navigation from "./navBar";
import BreadcrumbLayout from "./breadcrumb";
import FooterLayout from "./footer";

const Header = memo(HeaderLayout);
const Naviga = memo(Navigation);
const Breadc = memo(BreadcrumbLayout);
const Footer = memo(FooterLayout);

const MainLayout = () => (
    <>
        <Header />
        <Naviga />
        <Breadc />
        <Outlet />
        <Footer />
    </>
);

export default memo(MainLayout);
