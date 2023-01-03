import { useLocation } from "react-router-dom";
import { Card, CardImg } from "reactstrap";

import { Handle } from "../../shared/helper/handleUrlImg";

export const OrganDetail = () => {
    const location = useLocation();
    const organ = location.state;

    return (
        <Card>
            <div className='container'>
                <div className="row text-center">
                    <div className="col align-self-center">
                        <h3 className='text-center'>{ organ.nameOrganization }</h3>
                        <p>{ organ.title }</p>
                        <div className="row">
                            <p className="col">{ organ.programsTotal }</p>
                            <p className="col">{ organ.donationMoneyTotal }</p>
                            <p className="col">{ organ.donationTimes }</p>
                        </div>
                    </div>
                    <div className="col">
                        <CardImg width='100%' src={ Handle(organ.imgOrganization) } alt={ organ.nameOrganization } />
                    </div>
                </div>
                <div className="row text-justify" dangerouslySetInnerHTML={{ __html: organ.descriptionOrganization }}></div>
            </div>
        </Card>
    );
};