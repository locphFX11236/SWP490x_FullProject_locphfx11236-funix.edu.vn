import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

import { SelectAuthState, LogOutAuth } from "../../core";
import { helper } from "../../shared";

const { EXTEND_URL } = helper;

const Navigation = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const { isLogin, isAdmin, data, user_id } = SelectAuthState();
    const user = data?.find((d) => d._id === user_id);
    const handleLogOut = () => {
        dispatch(LogOutAuth());
        navigate("/");
    };
    const HasActive = (p) => {
        const path = location.pathname;
        if (p === "/") return path === p ? "active" : "";
        else if (p === "/orgs")
            return path.includes("/organizations") ? "active" : "";
        else return path.includes(p) ? "active" : "";
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <strong
                    className="navbar-brand text-center rounded bg-primary text-white p-1"
                    onClick={() => navigate("/")}
                >
                    Trái tim
                    <br />
                    momo
                </strong>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarToggler"
                    aria-controls="navbarToggler"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarToggler">
                    <ul className="navbar-nav me-auto text-center">
                        <li className="nav-item rounded m-1">
                            <Link
                                className={`nav-link ${HasActive("/")}`}
                                to="/"
                            >
                                Trang
                                <br />
                                chủ
                            </Link>
                        </li>
                        <li className="nav-item rounded m-1">
                            <Link
                                className={`nav-link ${HasActive("/programs")}`}
                                to="/programs"
                            >
                                Hoàn cảnh
                                <br />
                                quyên góp
                            </Link>
                        </li>
                        <li className="nav-item rounded m-1">
                            <Link
                                className={`nav-link ${HasActive("/orgs")}`}
                                to="/organizations"
                            >
                                Đối tác
                                <br />
                                đồng hành
                            </Link>
                        </li>
                        <li className="nav-item rounded m-1">
                            <Link
                                className={`nav-link ${HasActive("/news")}`}
                                to="/news"
                            >
                                Tin tức
                                <br />
                                cộng đồng
                            </Link>
                        </li>
                        <li className="nav-item rounded m-1" hidden={!isLogin}>
                            <Link
                                className={`nav-link ${HasActive("/managa")}`}
                                to="/managa"
                            >
                                {isAdmin ? (
                                    <>
                                        Admin's
                                        <br />
                                        manage
                                    </>
                                ) : (
                                    <>
                                        Lịch sử
                                        <br />
                                        quyên góp
                                    </>
                                )}
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="container w-auto me-0 p-0">
                    <ul className="navbar-nav text-center d-flex flex-row">
                        <li className="nav-item me-1">
                            {isLogin ? (
                                <button
                                    className="btn btn-outline-warning h-100 p-1"
                                    onClick={handleLogOut}
                                >
                                    Log Out
                                </button>
                            ) : (
                                <Link
                                    className={`btn btn-outline-success h-100 nav-link p-1 ${HasActive(
                                        "/LogIn"
                                    )}`}
                                    to="/LogIn"
                                >
                                    Login
                                </Link>
                            )}
                        </li>
                        <li className="nav-item ms-1">
                            {isLogin ? (
                                <Avatar
                                    size="large"
                                    className="border border-dark p-1"
                                    src={
                                        user.imgAvatar.includes("http")
                                            ? user.imgAvatar
                                            : EXTEND_URL + user.imgAvatar
                                    }
                                    icon={
                                        !user.imgAvatar ? (
                                            <UserOutlined />
                                        ) : undefined
                                    }
                                    onClick={() =>
                                        user.phoneNumber.includes("google")
                                            ? ""
                                            : navigate("/userInfor")
                                    }
                                />
                            ) : (
                                <Link
                                    className={`btn btn-outline-info h-100 nav-link p-1 ${HasActive(
                                        "/SignUp"
                                    )}`}
                                    to="/SignUp"
                                >
                                    Signup
                                </Link>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
