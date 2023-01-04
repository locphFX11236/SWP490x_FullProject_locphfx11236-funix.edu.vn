import { useLocation } from "react-router-dom";
import { Card, CardImg } from "reactstrap";

import { Handle } from "../../shared/helper/handleUrlImg";
import { NewsPage } from "./news";

import news from '../../data/news.json'

export const ProgDetail = () => {
    const location = useLocation();
    const prog = location.state;
    const ns = news.filter(n => n.program_id.$oid === prog._id.$oid);

    return (
        <Card>
            <div className='container'>
                <div className="row text-center">
                    <div className="col align-self-center">
                        <h2 className='text-center'><strong style={{color: "rgb(165, 0, 100)"}}>{ prog.programName }</strong></h2>
                        <div className="row">
                            <hr />
                            <h3>Thông tin quyên góp</h3>
                            <p>Đã được: <strong>{ prog.moneyCurrent } / { prog.moneyTotal } VNĐ</strong></p>
                            <p className="col">Đạt được:<br/><strong>{ prog.moneyRate }%</strong></p>
                            <p className="col">Đã được:<br/><strong>{ prog.times } Lượt quyên góp</strong></p>
                        </div>
                    </div>
                    <div className="col">
                        <CardImg width='100%' src={ Handle(prog.imgProgram) } alt={ prog.programName } />
                    </div>
                </div>
                <div className="row text-justify" dangerouslySetInnerHTML={{ __html: prog.descriptionStory }}></div>
                <div className="row text-justify">
                    <NewsPage datas={ns}/>
                </div>
            </div>
        </Card>
    );
};