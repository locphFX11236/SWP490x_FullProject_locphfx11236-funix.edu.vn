import { useLocation } from "react-router-dom";
import { Card, CardImg } from "reactstrap";
import moment from "moment";

import { SelectDataState } from "../../core";
import { components, helper } from "../../shared";

import { NewsPage } from "./news";

const { DonationModal } = components;
const { FormatTime, EXTEND_URL } = helper;

const Render = ({ datas }) => (
    <>
        <h3>Các nhà hảo tâm</h3>
        {datas.map((d, i) => (
            <Card key={i} className="px-4 my-2">
                <div className="d-flex flex-row justify-content-between">
                    <p>
                        Id quyên góp: <strong>{d._id}</strong>
                    </p>
                    <p>{FormatTime(d.donationTime)}</p>
                    <p>{d.donationMoney} VND</p>
                </div>
                <p>Lời nhắn: {d.message}</p>
            </Card>
        ))}
    </>
);

export const ProgDetail = () => {
    const location = useLocation();
    const prog = location.state;
    const ns = SelectDataState().news.filter((n) => n.program_id === prog._id);
    const diff = moment(prog.endTime).diff(moment(), "days");

    return (
        <Card>
            <div className="container">
                <div className="row text-center">
                    <div className="col col-md-6 align-self-center">
                        <h2 className="text-center">
                            <strong style={{ color: "rgb(165, 0, 100)" }}>
                                {prog.programName}
                            </strong>
                        </h2>
                    </div>
                    <div className="col col-md-6">
                        <CardImg
                            src={EXTEND_URL + prog.imgProgram}
                            alt={prog.programName}
                        />
                    </div>
                </div>
                <div className="row text-center m-3 bg-light rounded">
                    <hr />
                    <h3>Thông tin quyên góp</h3>
                    <p>
                        Đã được:
                        <br />
                        <strong>
                            {prog.moneyCurrent} / {prog.moneyTotal} VNĐ
                        </strong>
                    </p>
                    <p className="col">
                        Đạt được:
                        <br />
                        <strong>{prog.moneyRate}%</strong>
                    </p>
                    <p className="col">
                        Đã được:
                        <br />
                        <strong>
                            {prog.times} Lượt
                            <br />
                            quyên góp
                        </strong>
                    </p>
                    <p className="col">
                        Ngày bắt đầu:
                        <br />
                        <strong>{FormatTime(prog.startTime)}</strong>
                    </p>
                    <p className="col">
                        Ngày kết thúc:
                        <br />
                        <strong>
                            {FormatTime(prog.endTime)}
                            <br />(
                            {diff > 0
                                ? `Còn: ${diff} ngày`
                                : "Đã dừng quyên góp"}
                            )
                        </strong>
                    </p>
                    <hr />
                    <DonationModal program={prog} />
                </div>
                <div
                    className="text-justify"
                    dangerouslySetInnerHTML={{ __html: prog.descriptionStory }}
                ></div>
                <div className="text-justify">
                    <NewsPage datas={ns} />
                </div>
                <div className="container vh-100 overflow-auto">
                    {prog.donations.length !== 0 ? (
                        <Render datas={prog.donations} />
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </Card>
    );
};
