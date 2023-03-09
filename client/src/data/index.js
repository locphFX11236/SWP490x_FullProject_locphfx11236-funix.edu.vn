import * as local from "./samples";
import * as restApi from "./api";

const BACK_END_DEV = 'samples';

const Setting = (BED) => {
    switch (BED) {
        case 'samples': return { ...local };
        case 'restAPI': return { ...restApi };
        default: return;
    };
};

const RequestBE = { ...Setting(BACK_END_DEV) };

export default RequestBE;