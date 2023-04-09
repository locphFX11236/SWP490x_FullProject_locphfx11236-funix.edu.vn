import { CardImg } from "reactstrap";

import { EXTEND_URL } from "../../shared/helper/publicPath";

const HeaderLayout = () => (
    <CardImg
        width="100%"
        src={EXTEND_URL + "asset/img/banner1.jpg"}
        alt="Banner"
    />
);

export default HeaderLayout;
