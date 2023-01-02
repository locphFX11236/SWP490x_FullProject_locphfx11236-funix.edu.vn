import { Link } from "react-router-dom";
import { Card, CardImg, CardTitle, CardBody } from 'reactstrap';

import { Handle } from '../../shared/helper/handleUrlImg';

import programs from '../../data/programs.json';
import organizations from '../../data/organizations.json';
import news from '../../data/news.json';

const Item = (key, name, img) => {
    return (
        <div key={key} className='col col-12 col-md-5 m-2'>
            <Card>
                <CardImg width='100%' src={img} alt={name}/>
                <CardBody>
                    <CardTitle tag='h5' className='text-center'>{name}</CardTitle>
                </CardBody>
            </Card>
        </div>
    );
}; 

const RenderItems = ({data, type}) => {
    switch (type) {
        case 'program': return data.map(d => Item(d._id.$oid, d.programName, Handle(d.imgProgram)));
        case 'organization': return data.map(d => Item(d._id.$oid, d.nameOrganization, Handle(d.imgOrganization)));
        case 'news': return data.map(d => Item(d._id.$oid, d.newsName, Handle(d.imgNews)));
        default: return;
    }
};

export const HomePage = () => {
    return (
        <Card>
            <CardTitle>
                <div className='container'>
                    <h1 className='text-center'>Nền tảng quyên góp từ thiện Trái tim MoMo</h1>
                    <p>Trái Tim MoMo là nền tảng giúp bạn dễ dàng chung tay quyên góp tiền cùng hàng triệu người, giúp đỡ các hoàn cảnh khó khăn trên khắp cả nước.</p>
                    <div className='row'>
                        <div className='col'>389 dự án<br />đã được gây quỹ thành công</div>
                        <div className='col'>53+ tỷ đồng<br />được quyên góp</div>
                        <div className='col'>13+ triệu<br />lượt quyên góp</div>
                    </div>
                </div>
            </CardTitle>
            <CardBody>
                <div className='container'>
                    <Link to='/programs'><h3 className='text-center'>Các hoàn cảnh quyên góp</h3></Link>
                    <div className='row'>
                        <RenderItems
                            data={programs}
                            type='program'
                        />
                    </div>
                </div>
                <div className='container'>
                    <Link to='/organizations'><h3 className='text-center'>Các đối tác</h3></Link>
                    <div className='row'>
                        <RenderItems
                            data={organizations}
                            type='organization'
                        />
                    </div>
                </div>
                <div className='container'>
                    <Link to='/news'><h3 className='text-center'>Tin tức cộng đồng</h3></Link>
                    <div className='row'>
                        <RenderItems
                            data={news}
                            type='news'
                        />
                    </div>
                </div>
            </CardBody>
            <CardImg width='100%' src='asset/img/banner3.jpg' alt='Banner'/>
        </Card>
    );
};