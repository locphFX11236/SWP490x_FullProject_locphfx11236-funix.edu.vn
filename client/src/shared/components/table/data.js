import moment from 'moment';
import { message } from 'antd';

import { SelectDataState } from '../../../core/slice/showData';
import { SelectAuthState } from '../../../core/slice/authData';

export const HandleData = (key) => {
    const { programs, organizations } = SelectDataState();
    const authData = SelectAuthState();
    const users = authData.data.map((a, i) => ({
        key: a._id.$oid,
        stt: (i + 1),
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
    const progs = programs.map((p, i) => ({
        key: p._id.$oid,
        stt: (i + 1),
        name: p.programName,
        moneyTotal: p.moneyTotal,
        moneyCurrent: p.moneyCurrent,
        moneyRate: p.moneyRate,
        startTime: moment(p.startTime).format('DD/MM/YYYY'),
        endTime: moment(p.endTime).format('DD/MM/YYYY'),
        organization: FindOrg(p.organization_id.$oid),
        donations: p.donations,
        management: p.management,
        users: users,
    }));

    if (key === 'programs') return progs;
    else if (key === 'users') return users;
    else {
        message.error('Không có dữ liệu');
        return [];
    };
};

export const AdminActionsData = (data) => data[0].map((d, i) => ({
    key: d._id.$oid,
    stt: (i + 1),
    name: data[1].users.find(a => a.key === d.admin_id.$oid).name,
    descriptionChange: d.descriptionChange,
    executionTime: moment(d.executionTime).format('HH:mm DD/MM/YYYY'),
}));

export const DonasActionsData = (data) => data[0].map((d, i) => ({
    key: d._id.$oid,
    stt: (i + 1),
    name: data[1].users.find(a => a.key === d.user_id.$oid).name,
    donationMoney: d.donationMoney,
    donationTime: moment(d.donationTime).format('HH:mm DD/MM/YYYY'),
    message: d.message,
}));