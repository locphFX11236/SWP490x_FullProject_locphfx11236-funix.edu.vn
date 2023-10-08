import { useLocation } from "react-router-dom";
import { Card, CardImg } from "reactstrap";

import { helper } from "../../shared";
import { ProgramPage } from "./programs";
import { NewsPage } from "./news";

const { EXTEND_URL } = helper;

export const NewsDetail = () => {
    const location = useLocation();
    const news = location.state;
    return (
        <Card>
            <div className="container">
                <h2 className="text-center">
                    <strong style={{ color: "rgb(165, 0, 100)" }}>
                        {news.newsName}
                    </strong>
                </h2>
                <hr />
                <CardImg
                    width="100%"
                    src={EXTEND_URL + news.imgNews}
                    alt={news.newsName}
                />
                <hr />
                <div
                    className="row text-justify"
                    dangerouslySetInnerHTML={{ __html: news.content }}
                ></div>
                <hr />
                <ProgramPage />
                <hr />
                <NewsPage />
            </div>
        </Card>
    );
};
