import { CardImg } from "reactstrap";

import { EXTEND_URL } from "../../shared/helper/publicPath";

const FooterLayout = () => (
    <CardImg
        width="100%"
        src={EXTEND_URL + "asset/img/banner4.jpg"}
        alt="Banner"
    />
);

export default FooterLayout;
