import { Link, useLocation } from "react-router-dom";

const Items = (string, location, i) => {
    const state = location.state;
    const name = state ? (state.nameOrganization || state.programName || state.newsName) : '';
    const nameItem = name ? name : '';
    switch (string) {
        case '': return <p className="m-3" key={i}></p>;
        case 'programs': return <Link to='/programs' className="m-2" key={i}>Hoàn cảnh</Link>;
        case 'organizations': return <Link to='/organizations' className="m-2" key={i}>Đối tác</Link>;
        case 'news': return <Link to='/news' className="m-2" key={i}>Tin tức</Link>;
        case 'admin': return <Link to='/admin' className="m-2" key={i}>Admin</Link>;
        default: return <Link to='/#' className="m-2" key={i}>{nameItem}</Link>;
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