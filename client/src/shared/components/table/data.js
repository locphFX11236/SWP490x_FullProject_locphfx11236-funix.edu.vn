import { message } from 'antd';

import { SelectDataState } from '../../../core/slice/showData';
import { SelectAuthState } from '../../../core/slice/authData';
import FormatTime from '../../helper/convertISOtoShowTime';

export const HandleData = (key) => {
    const { programs, organizations } = SelectDataState();
    const authData = SelectAuthState();
    const users = authData.data.map((a, i) => ({
        key: a._id,
        stt: (i + 1),
        name: a.name,
        imgAvatar: a.imgAvatar,
        email: a.email,
        phoneNumber: a.phoneNumber,
        password: a.password,
        isAdmin: a.isAdmin,
        history: a.history,
        createdAt: a.createdAt,
        updatedAt: a.updatedAt,
    }))
    const FindOrg = (organization_key) => {
        const organs = organizations.map(o => ({
            key: o._id,
            name: o.nameOrganization
        }));
        const organ = organs.find(o => o.key === organization_key);
        return organ;
    };
    const progs = programs.map((p, i) => ({
        key: p._id,
        stt: (i + 1),
        name: p.programName,
        descriptionStory: p.descriptionStory,
        moneyTotal: p.moneyTotal,
        moneyCurrent: p.moneyCurrent,
        moneyRate: p.moneyRate,
        startTime: FormatTime(p.startTime),
        endTime: FormatTime(p.endTime),
        organization: FindOrg(p.organization_id),
        imgProgram: p.imgProgram,
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

export const AdminActionsData = ({ admins, users }) => admins.map((d, i) => ({
    key: (i + 1),
    stt: (i + 1),
    name: users.find(u => u.key === d.admin_id).name,
    descriptionChange: d.descriptionChange,
    executionTime: FormatTime(d.executionTime),
}));

export const DonasActionsData = ({ donas, users }) => donas.map((d, i) => ({
    key: (i + 1),
    stt: (i + 1),
    name: users.find(u => u.key === d.user_id).name,
    donationMoney: d.donationMoney,
    donationTime: FormatTime(d.donationTime),
    message: d.message,
}));

export const DonasHistoryData = ({ history, programs }) => history.map((h, i) => {
    const findProg = (id) => programs.find(p => p._id === id);
    const findDonas = (pro, id) => pro.donations.find(d => d._id === id);
    const idArr = h.split(' ');
    const program = findProg(idArr[1]);
    const donation = findDonas(program, idArr[4])
    return {
        key: donation._id,
        stt: (i + 1),
        programName: program.programName,
        donationMoney: donation.donationMoney,
        donationTime: FormatTime(donation.donationTime),
    }
});