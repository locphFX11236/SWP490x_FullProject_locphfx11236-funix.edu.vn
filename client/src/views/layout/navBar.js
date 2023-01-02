import { Link } from "react-router-dom";
import { Navbar, NavbarBrand } from "reactstrap";

const Navigation = () => {
    return (
        <Navbar color='primary sticky-top'>
            <div className="container">
                <Link to='/'><NavbarBrand>Trang chủ</NavbarBrand></Link>
                <Link to='/programs'><NavbarBrand>Hoàn cảnh quyên góp</NavbarBrand></Link>
                <Link to='/organizations'><NavbarBrand>Đối tác đồng hành</NavbarBrand></Link>
                <Link to='/news'><NavbarBrand>Tin tức cộng đồng</NavbarBrand></Link>
                <Link to='/#'><NavbarBrand>Admin's manage</NavbarBrand></Link>
                <Link to='/#'><NavbarBrand>Login/ Logout</NavbarBrand></Link>
                <Link to='/#'><NavbarBrand>Signup</NavbarBrand></Link>
            </div>
        </Navbar>
    );
};

export default Navigation;