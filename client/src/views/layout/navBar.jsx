import { Link, useLocation, useNavigate } from "react-router-dom";

const Navigation = () => {
    const navigate = useNavigate();

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <strong onClick={ () => navigate('/') } >Trái tim<br />momo</strong>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse d-flex justify-content-between" id="navbarNavAltMarkup">
                    <div className="navbar-nav text-center">
                        <Link className={`nav-link mx-2${useLocation().pathname === '/' ? ' active' : ''}`} to="/">Trang<br />chủ</Link>
                        <Link className={`nav-link mx-2${useLocation().pathname === '/programs' ? ' active' : ''}`} to="/programs">Hoàn cảnh<br />quyên góp</Link>
                        <Link className={`nav-link mx-2${useLocation().pathname === '/organizations' ? ' active' : ''}`} to="/organizations">Đối tác<br />đồng hành</Link>
                        <Link className={`nav-link mx-2${useLocation().pathname === '/news' ? ' active' : ''}`} to="/news">Tin tức<br />cộng đồng</Link>
                        <Link className={`nav-link mx-2${useLocation().pathname === '/admin' ? ' active' : ''}`} to="/admin">Admin's<br />manage</Link>
                    </div>
                    <div className="navbar-nav text-center">
                        <Link className="nav-link mx-2" to="/#">Login/ Logout</Link>
                        <Link className="nav-link mx-2" to="/#">Signup</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};
export default Navigation;