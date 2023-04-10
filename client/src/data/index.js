import * as local from "./samples";
import * as restApi from "./api";

const Setting = (BED) => {
    switch (BED) {
        case "samples":
            return { ...local };
        case "restAPI":
            return { ...restApi };
        default:
            return;
    }
};

const RequestBE = { ...Setting(process.env.REACT_APP_BACK_END_DEV) };

export default RequestBE;
