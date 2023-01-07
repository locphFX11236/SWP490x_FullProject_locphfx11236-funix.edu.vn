import * as local from "./samples";

const Setting = () => {
    const BACK_END_DEV = 'samples';

    switch (BACK_END_DEV) {
        case 'samples': return { ...local };
        case 'restAPI': return {};
        default: return;
    };
};

const RequestBE = { ...Setting() };

export default RequestBE;