import { Card, CardBody, CardTitle, CardImg, CardText } from "reactstrap";
import { Link } from "react-router-dom";

import { Handle } from '../../shared/helper/handleUrlImg';

import organizations from '../../data/organizations.json'

const RenderItems = ({data}) => (
    <Card className='col col-12 col-md-5 m-2'>
        <Link to={ `/organizations/${data._id.$oid}` } state={data}>
            <CardImg src={ Handle(data.logo) } alt={ data.nameOrganization }/>
            <CardBody>
                <CardTitle tag='h5' className='text-center'>{ data.nameOrganization }</CardTitle>
                <CardText>{ data.title }</CardText>
            </CardBody>
        </Link>
    </Card>
);

export const OrganizationPage = () => {
    return (
        <Card>
            <CardTitle>
                <h1 className='text-center'>Các đối tác đồng hành</h1>
            </CardTitle>
            <CardBody>
                <div className="container">
                    <div className="row">
                        { organizations.map(o => <RenderItems key={o._id.$oid} data={o}/>)}
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};