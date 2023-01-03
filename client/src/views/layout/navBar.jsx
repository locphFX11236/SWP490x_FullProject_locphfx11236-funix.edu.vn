import { Navbar, NavbarBrand } from "reactstrap";

const Navigation = () => (
    <Navbar dark color='primary sticky-top'>
        <div className="container">
            <NavbarBrand href="/">Trang chủ</NavbarBrand>
            <NavbarBrand href="/programs">Hoàn cảnh quyên góp</NavbarBrand>
            <NavbarBrand href="/organizations">Đối tác đồng hành</NavbarBrand>
            <NavbarBrand href="/news">Tin tức cộng đồng</NavbarBrand>
            <NavbarBrand href="/#">Admin's manage</NavbarBrand>
            <NavbarBrand href="/#">Login/ Logout</NavbarBrand>
            <NavbarBrand href="/#">Signup</NavbarBrand>
        </div>
    </Navbar>
);

export default Navigation;