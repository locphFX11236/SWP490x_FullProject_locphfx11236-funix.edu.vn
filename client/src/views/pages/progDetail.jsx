import { useLocation } from "react-router-dom";
import { Card, CardImg } from "reactstrap";
import moment from "moment";

import { Handle } from "../../shared/helper/handleUrlImg";
import { SelectDataState } from "../../core/slice/showData";

import { NewsPage } from "./news";

const Render = ({datas}) => (
    <>
        <h3>Các nhà hảo tâm</h3>
        { datas.map((d, i) => (
            <Card key={i} className="px-4 my-2">
                <div className="d-flex flex-row justify-content-between">
                    <p><strong>{d.user_id.$oid}</strong></p>
                    <p>{moment(d.donationTime).format('hh:mm DD/MM/YYYY')}</p>
                    <p>{d.donationMoney} VND</p>
                </div>
                <p>Lời nhắn: {d.message}</p>
            </Card>
        )) }
    </>
)

export const ProgDetail = () => {
    const location = useLocation();
    const prog = location.state;
    const ns = SelectDataState().news.filter(n => n.program_id.$oid === prog._id.$oid);
    const diff = moment(prog.endTime).diff(moment(), 'days');

    return (
        <Card>
            <div className='container'>
                <div className="row text-center">
                    <div className="col align-self-center">
                        <h2 className='text-center'><strong style={{color: "rgb(165, 0, 100)"}}>{ prog.programName }</strong></h2>
                    </div>
                    <div className="col">
                        <CardImg width='100%' src={ Handle(prog.imgProgram) } alt={ prog.programName } />
                    </div>
                </div>
                <div className="row text-center m-3">
                    <hr />
                    <h3>Thông tin quyên góp</h3>
                    <p>Đã được: <strong>{ prog.moneyCurrent } / { prog.moneyTotal } VNĐ</strong></p>
                    <p className="col">Đạt được:<br /><strong>{ prog.moneyRate }%</strong></p>
                    <p className="col">Đã được:<br /><strong>{ prog.times }<br />Lượt quyên góp</strong></p>
                    <p className="col">Ngày bắt đầu:<br /><strong>{moment(prog.startTime).format('DD/MM/YYYY')}</strong></p>
                    <p className="col">Ngày kết thúc:<br /><strong>{moment(prog.endTime).format('DD/MM/YYYY')}<br />({diff > 0 ? `Còn: ${diff} ngày` : 'Đã dừng quyên góp'})</strong></p>
                    <hr />
                </div>
                <div className="text-justify" dangerouslySetInnerHTML={{ __html: prog.descriptionStory }}></div>
                <div className="text-justify">
                    <NewsPage datas={ns}/>
                </div>
                <div className='container vh-100 overflow-auto'>
                    { prog.donations !== 0 ? <Render datas={prog.donations} /> : '' }
                </div>
            </div>
        </Card>
    );
};