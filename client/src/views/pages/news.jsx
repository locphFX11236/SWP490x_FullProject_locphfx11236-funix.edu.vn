import { Card, CardBody, CardTitle, CardImg } from "reactstrap";
import { Link } from "react-router-dom";

import { Handle } from '../../shared/helper/handleUrlImg';

import news from '../../data/news.json'

const RenderItems = ({data}) => (
    <Card className='col col-12 col-md-5 m-2'>
        <Link to={ `/news/${data._id.$oid}` } state={data}>
            <CardImg src={ Handle(data.imgNews) } alt={ data.newsName }/>
            <CardBody>
                <CardTitle tag='h5' className='text-center'>{ data.newsName }</CardTitle>
            </CardBody>
        </Link>
    </Card>
);

export const NewsPage = ({ datas = news }) => {
    return (datas.length !== 0) ? (
        <Card className='m-2'>
            <CardTitle>
                <h1 className='text-center'>Tin tức cộng đồng</h1>
            </CardTitle>
            <CardBody>
                <div className="container">
                    <div className="row">
                        { datas.map(d => <RenderItems key={d._id.$oid} data={d}/>)}
                    </div>
                </div>
            </CardBody>
        </Card>
    ) : '';
};