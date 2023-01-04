import { useLocation } from "react-router-dom";
import { Card, CardImg } from "reactstrap";

import { Handle } from "../../shared/helper/handleUrlImg";
import { ProgramPage } from "./programs";
import { NewsPage } from "./news";

import programs from '../../data/programs.json'
import news from '../../data/news.json'

export const OrganDetail = () => {
    const location = useLocation();
    const organ = location.state;
    const progs = programs.filter(p => p.organization_id.$oid === organ._id.$oid);
    const ns = news.filter(n => n.organization_id.$oid === organ._id.$oid);

    return (
        <Card>
            <div className='container'>
                <div className="row text-center">
                    <div className="col align-self-center">
                        <h2 className='text-center'><strong style={{color: "rgb(165, 0, 100)"}}>{ organ.nameOrganization }</strong></h2>
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
                <div className="row text-justify">
                    <ProgramPage datas={progs}/>
                </div>
                <div className="row text-justify">
                    <NewsPage datas={ns}/>
                </div>
            </div>
        </Card>
    );
};