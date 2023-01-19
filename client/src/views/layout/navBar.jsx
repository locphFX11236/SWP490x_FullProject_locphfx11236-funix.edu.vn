import { Link, useLocation, useNavigate } from "react-router-dom";

const Navigation = () => {
    const navigate = useNavigate();

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <strong className="navbar-brand text-center rounded bg-primary text-white p-1" onClick={ () => navigate('/') } >Trái tim<br />momo</strong>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <ul className="navbar-nav me-auto text-center">
                        <li className="nav-item border border-dark rounded m-1">
                            <Link className={`nav-link${useLocation().pathname === '/' ? ' active' : ''}`} to="/">Trang<br />chủ</Link>
                        </li>
                        <li className="nav-item border border-dark rounded m-1">
                            <Link className={`nav-link${useLocation().pathname.includes('/programs') ? ' active' : ''}`} to="/programs">Hoàn cảnh<br />quyên góp</Link>
                        </li>
                        <li className="nav-item border border-dark rounded m-1">
                            <Link className={`nav-link${useLocation().pathname.includes('/organizations') ? ' active' : ''}`} to="/organizations">Đối tác<br />đồng hành</Link>
                        </li>
                        <li className="nav-item border border-dark rounded m-1">
                            <Link className={`nav-link${useLocation().pathname.includes('/news') ? ' active' : ''}`} to="/news">Tin tức<br />cộng đồng</Link>
                        </li>
                        <li className="nav-item border border-dark rounded m-1">
                            <Link className={`nav-link${useLocation().pathname.includes('/admin') ? ' active' : ''}`} to="/admin">Admin's<br />manage</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav text-center">
                        <li className="nav-item border border-dark rounded m-1">
                            <Link className="nav-link" to="/#">Login/ Logout</Link>
                        </li>
                        <li className="nav-item border border-dark rounded m-1">
                            <Link className="nav-link" to="/#">Signup</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
export default Navigation;