import { Card, CardBody, CardTitle, CardImg } from "reactstrap";
import { Link } from "react-router-dom";

import { SelectDataState } from "../../core";
import { helper } from "../../shared";

const { EXTEND_URL } = helper;

const RenderItems = ({ data }) => (
    <Card className="col col-12 col-md-5 m-2">
        <Link className="organ" to={`/organizations/${data._id}`} state={data}>
            <CardImg src={EXTEND_URL + data.logo} alt={data.nameOrganization} />
            <CardBody>
                <CardTitle className="text-center">
                    {data.nameOrganization}
                </CardTitle>
            </CardBody>
        </Link>
    </Card>
);

export const OrganizationPage = () => {
    const organizations = SelectDataState().organizations;

    return (
        <Card className="m-2">
            <CardTitle>
                <h1 className="text-center">Các đối tác đồng hành</h1>
            </CardTitle>
            <CardBody>
                <div className="container">
                    <div className="row">
                        {organizations.map((o) => (
                            <RenderItems key={o._id} data={o} />
                        ))}
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};
