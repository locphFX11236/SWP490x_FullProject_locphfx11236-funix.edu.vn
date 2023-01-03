import { Card, CardBody, CardTitle, CardImg } from "reactstrap";

import { Handle } from '../../shared/helper/handleUrlImg';

import programs from '../../data/programs.json'

const RenderItems = ({data}) => (
    <Card className='col col-12 col-md-5 m-2'>
        <CardImg src={ Handle(data.imgProgram) } alt={ data.programName }/>
        <CardBody>
            <CardTitle tag='h5' className='text-center'>{ data.programName }</CardTitle>
        </CardBody>
    </Card>
);

export const ProgramPage = () => {
    return (
        <Card>
            <CardTitle>
                <h1 className='text-center'>Các hoàn cảnh quyên góp</h1>
            </CardTitle>
            <CardBody>
                <div className="container">
                    <div className="row">
                        { programs.map(p => <RenderItems key={p._id.$oid} data={p}/>)}
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};