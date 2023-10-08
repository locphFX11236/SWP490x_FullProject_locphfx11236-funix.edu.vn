import { Card, CardBody, CardTitle, CardImg } from "reactstrap";
import { Link } from "react-router-dom";

import { SelectDataState } from "../../core";
import { helper } from "../../shared";

const { EXTEND_URL } = helper;

const RenderItems = ({ data }) => (
    <Card className="col col-12 col-md-5 m-2">
        <Link to={`/programs/${data._id}`} state={data}>
            <CardImg
                src={EXTEND_URL + data.imgProgram}
                alt={data.programName}
            />
            <CardBody>
                <CardTitle tag="h5" className="text-center">
                    {data.programName}
                </CardTitle>
            </CardBody>
        </Link>
    </Card>
);

export const ProgramPage = ({ datas = SelectDataState().programs }) => {
    return datas.length !== 0 ? (
        <Card className="m-2">
            <CardTitle>
                <h1 className="text-center">Các hoàn cảnh quyên góp</h1>
            </CardTitle>
            <CardBody>
                <div className="container">
                    <div className="row">
                        {datas.map((d) => (
                            <RenderItems key={d._id} data={d} />
                        ))}
                    </div>
                </div>
            </CardBody>
        </Card>
    ) : (
        ""
    );
};
