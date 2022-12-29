import { Navbar, NavbarBrand } from "reactstrap";

const Navigation = () => {
    return (
        <Navbar light color='primary'>
            <div className="container">
                <NavbarBrand href="/">Trang chủ</NavbarBrand>
                <NavbarBrand href="#">Đối tác đồng hành</NavbarBrand>
                <NavbarBrand href="#">Hoàn cảnh quyên góp</NavbarBrand>
                <NavbarBrand href="#">Tin tức cộng đồng</NavbarBrand>
                <NavbarBrand href="#">Admin's manage</NavbarBrand>
                <NavbarBrand href="#">Login/ Logout</NavbarBrand>
                <NavbarBrand href="#">Signup</NavbarBrand>
            </div>
        </Navbar>
    );
};

export default Navigation;