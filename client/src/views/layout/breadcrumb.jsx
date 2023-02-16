import { Link, useLocation } from "react-router-dom";

const Items = (string, location, i) => {
    const state = location.state;
    const name = state ? (state.nameOrganization || state.programName || state.newsName) : '';
    const nameItem = name ? name : '';
    switch (string) {
        case '': return <p className="m-3" key={i}></p>;
        case 'programs': return <Link to='/programs' className="border border-dark rounded m-2 p-2 mark" key={i}>Hoàn cảnh</Link>;
        case 'organizations': return <Link to='/organizations' className="border border-dark rounded m-2 p-2 mark" key={i}>Đối tác</Link>;
        case 'news': return <Link to='/news' className="border border-dark rounded m-2 p-2 mark" key={i}>Tin tức</Link>;
        case 'admin': return <Link to='/admin' className="border border-dark rounded m-2 p-2 mark" key={i}>Admin</Link>;
        case 'LogIn': return <Link to='/LogIn' className="border border-dark rounded m-2 p-2 mark" key={i}>Log In</Link>;
        case 'SignUp': return <Link to='/SignUp' className="border border-dark rounded m-2 p-2 mark" key={i}>Sign Up</Link>;
        case 'Forget': return <Link to='/Forget' className="border border-dark rounded m-2 p-2 mark" key={i}>Forget</Link>;
        case 'userInfor': return <Link to='/userInfor' className="border border-dark rounded m-2 p-2 mark" key={i}>Thông tin người dùng</Link>;
        default: return <Link to='/#' className="border border-dark rounded m-2 p-2 mark" key={i}>{nameItem} - <strong>(Quay lại trang chủ)</strong></Link>;
    };
}

const BreadcrumbLayout = () =>  {
    const location = useLocation();
    const path = location.pathname;
    const pathArr = path.split('/');
    return <div className="d-flex flex-row">
        {pathArr.map((p, i) => Items(p, location, i))}
    </div>
};

export default BreadcrumbLayout;