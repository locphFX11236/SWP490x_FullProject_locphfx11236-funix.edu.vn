import { Link } from "react-router-dom";
import { Card, CardImg, CardTitle, CardBody } from "reactstrap";

import { SelectDataState } from "../../core/slice/showData";
import { EXTEND_URL } from "../../shared/helper/publicPath";

const Item = (key, name, img, type, data) => (
    <Card key={key} className="col col-12 col-md-5 m-2">
        <Link to={`/${type}/${data._id}`} state={data}>
            <CardImg width="100%" src={EXTEND_URL + img} alt={name} />
            <CardBody>
                <CardTitle tag="h5" className="text-center">
                    {name}
                </CardTitle>
            </CardBody>
        </Link>
    </Card>
);

const RenderItems = ({ data, type }) => {
    switch (type) {
        case "programs":
            return data.map((d) =>
                Item(d._id, d.programName, d.imgProgram, type, d)
            );
        case "organizations":
            return data.map((d) =>
                Item(d._id, d.nameOrganization, d.logo, type, d)
            );
        case "news":
            return data.map((d) => Item(d._id, d.newsName, d.imgNews, type, d));
        default:
            return;
    }
};

export const HomePage = () => {
    const { programs, organizations, news } = SelectDataState();

    return (
        <Card>
            <CardTitle>
                <div className="container text-center">
                    <h1 className="text-center">
                        <strong
                            style={{
                                color: "rgb(165, 0, 100)",
                            }}
                        >
                            Nền tảng quyên góp từ thiện Trái tim MoMo
                        </strong>
                    </h1>
                    <p>
                        Trái Tim MoMo là nền tảng giúp bạn dễ dàng chung tay
                        quyên góp tiền cùng hàng triệu người, giúp đỡ các hoàn
                        cảnh khó khăn trên khắp cả nước.
                    </p>
                    <div className="row">
                        <div className="col">
                            <strong>389 dự án</strong>
                            <br />
                            đã được gây quỹ thành công
                        </div>
                        <div className="col">
                            <strong>53+ tỷ đồng</strong>
                            <br />
                            được quyên góp
                        </div>
                        <div className="col">
                            <strong>13+ triệu</strong>
                            <br />
                            lượt quyên góp
                        </div>
                    </div>
                </div>
            </CardTitle>
            <CardBody>
                <hr />
                <div className="container">
                    <Link to="/programs">
                        <h3 className="text-center">Các hoàn cảnh quyên góp</h3>
                    </Link>
                    <div className="row">
                        <RenderItems
                            key="programs"
                            data={programs}
                            type="programs"
                        />
                    </div>
                </div>
                <hr />
                <div className="container">
                    <Link to="/organizations">
                        <h3 className="text-center">Các đối tác đồng hành</h3>
                    </Link>
                    <div className="row">
                        <RenderItems
                            key="organizations"
                            data={organizations}
                            type="organizations"
                        />
                    </div>
                </div>
                <hr />
                <div className="container">
                    <Link to="/news">
                        <h3 className="text-center">Tin tức cộng đồng</h3>
                    </Link>
                    <div className="row">
                        <RenderItems key="news" data={news} type="news" />
                    </div>
                </div>
            </CardBody>
            <CardImg width="100%" src="asset/img/banner2.jpg" alt="Banner" />
        </Card>
    );
};
