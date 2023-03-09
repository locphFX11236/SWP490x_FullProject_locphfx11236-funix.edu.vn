import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Avatar } from "antd";
import { UserOutlined } from '@ant-design/icons';

import { LogOut, SelectAuthState } from "../../core/slice/authData";
import Handle from "../../shared/helper/handleUrlImg";

const Navigation = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const { isLogin, isAdmin, data, user_id } = SelectAuthState();
    const path = location.pathname;
    const user = data.find(d => d._id.$oid === user_id);

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
                            <Link className={`nav-link${path === '/' ? ' active' : ''}`} to="/">Trang<br />chủ</Link>
                        </li>
                        <li className="nav-item border border-dark rounded m-1">
                            <Link className={`nav-link${path.includes('/programs') ? ' active' : ''}`} to="/programs">Hoàn cảnh<br />quyên góp</Link>
                        </li>
                        <li className="nav-item border border-dark rounded m-1">
                            <Link className={`nav-link${path.includes('/organizations') ? ' active' : ''}`} to="/organizations">Đối tác<br />đồng hành</Link>
                        </li>
                        <li className="nav-item border border-dark rounded m-1">
                            <Link className={`nav-link${path.includes('/news') ? ' active' : ''}`} to="/news">Tin tức<br />cộng đồng</Link>
                        </li>
                        <li className="nav-item border border-dark rounded m-1" hidden={!isAdmin}>
                            <Link className={`nav-link${path.includes('/admin') ? ' active' : ''}`} to="/admin">Admin's<br />manage</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav text-center">
                        <li className="nav-item m-1">
                            {
                                isLogin ? 
                                <button className="btn btn-outline-warning h-100" onClick={() => dispatch( LogOut() )} >Log Out</button> :
                                <Link className="btn btn-outline-success h-100 nav-link" to="/LogIn">Login</Link>
                            }
                        </li>
                        <li className="nav-item m-1">
                            {
                                isLogin ?
                                <Avatar
                                    size='large'
                                    className="border border-dark"
                                    src={user.imgAvatar ? Handle(user.imgAvatar) : undefined}
                                    icon={!user.imgAvatar ? <UserOutlined /> : undefined}
                                    onClick={() => navigate('/userInfor')}
                                /> :
                                <Link className="btn btn-outline-info h-100 nav-link" to="/SignUp">Signup</Link>
                            }
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
export default Navigation;