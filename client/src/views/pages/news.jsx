import { Card, CardBody, CardTitle, CardImg } from "reactstrap";

import { Handle } from '../../shared/helper/handleUrlImg';

import news from '../../data/news.json'

const RenderItems = ({data}) => (
    <Card className='col col-12 col-md-5 m-2'>
        <CardImg src={ Handle(data.imgNews) } alt={ data.newsName }/>
        <CardBody>
            <CardTitle tag='h5' className='text-center'>{ data.newsName }</CardTitle>
        </CardBody>
    </Card>
);

export const NewsPage = () => {
    return (
        <Card>
            <CardTitle>
                <h1 className='text-center'>Tin tức cộng đồng</h1>
            </CardTitle>
            <CardBody>
                <div className="container">
                    <div className="row">
                        { news.map(n => <RenderItems key={n._id.$oid} data={n}/>)}
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};