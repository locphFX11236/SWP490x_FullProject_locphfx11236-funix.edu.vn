import moment from 'moment';
import { message } from 'antd';

import { SelectDataState } from '../../../core/slice/showData';
import { SelectAuthState } from '../../../core/slice/authData';

const HandleData = (key) => {
    const { programs, organizations } = SelectDataState();
    const authData = SelectAuthState();
    const users = authData.data.map(a => ({
        key: a._id.$oid,
        name: a.name,
        email: a.email,
        phoneNumber: a.phoneNumber,
        password: a.password,
        isAdmin: a.isAdmin,
        history: a.history,
    }))
    const FindOrg = (organization_key) => {
        const organs = organizations.map(o => ({
            key: o._id.$oid,
            name: o.nameOrganization
        }));
        const organ = organs.find(o => o.key === organization_key);
        return organ.name;
    };
    const progs = programs.map(p => ({
        key: p._id.$oid,
        name: p.programName,
        moneyTotal: p.moneyTotal,
        moneyCurrent: p.moneyCurrent,
        startTime: moment(p.startTime).format('DD/MM/YYYY'),
        endTime: moment(p.endTime).format('DD/MM/YYYY'),
        organization: FindOrg(p.organization_id.$oid),
        management: p.management,
        donations: p.donations,
    }));

    if (key === 'programs') return progs;
    else if (key === 'users') return users;
    else {
        message.error('Không có dữ liệu');
        return [];
    };
};

export default HandleData;