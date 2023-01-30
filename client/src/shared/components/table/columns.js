import { ProgramActions, ShowActionHistory, ShowAdminActions, ShowDonasActions, UserActions } from '../modal';

const getColumn = (title, key, render) => {
    if (render) return {
        key: key,
        title: title,
        dataIndex: key,
        ...render
    }
    else return {
        key: key,
        title: title,
        dataIndex: key,
    };
}; // Kết quả: { title: '', key: '', dataIndex: '', render: function () }

export const ProgramsColumns = [
    getColumn('STT', 'stt'),
    getColumn('Hoàn cảnh', 'name'),
    getColumn('Tổ chức', 'organization', {
        render: (value, record, index) => value.name
    } ),
    getColumn('Tổng tiền (VND)', 'moneyTotal'),
    getColumn('Tiền hiện tại (VND)', 'moneyCurrent'),
    getColumn('Bắt đầu', 'startTime'),
    getColumn('Kết thúc', 'endTime'),
    getColumn('Admin', 'management', {
        render: (value, record, index) => <ShowAdminActions value={value} record={record} />
    } ),
    getColumn('Quyên góp', 'donations', {
        render: (value, record, index) => <ShowDonasActions value={value} record={record} />
    } ),
    getColumn('Action', 'key', {
        render: (value, record, index) => <ProgramActions value={value} record={record} />
    } ),
];

export const UsersColumns = [
    getColumn('STT', 'stt'),
    getColumn('Họ tên', 'name'),
    getColumn('Email', 'email'),
    getColumn('Số điện thoại', 'phoneNumber'),
    getColumn('History', 'history', {
        render: (value, record, index) => <ShowActionHistory value={value} record={record} />
    } ),
    getColumn('Action', 'key', {
        render: (value, record, index) => record.isAdmin ? 'Admin' : <UserActions value={value} record={record} />
    } ),
];

export const AdminActionsColumns = [
    getColumn('STT', 'stt'),
    getColumn('Họ tên', 'name'),
    getColumn('Mô tả thay đổi', 'descriptionChange'),
    getColumn('Thời gian thực hiện', 'executionTime'),
];

export const DonasActionsColumns = [
    getColumn('STT', 'stt'),
    getColumn('Họ tên', 'name'),
    getColumn('Số tiền quyên góp', 'donationMoney'),
    getColumn('Thời gian thực hiện', 'donationTime'),
    getColumn('Lời nhắn', 'message'),
];

export const DonasHistoryColumns = [
    getColumn('STT', 'stt'),
    getColumn('Tên chương trình', 'programName'),
    getColumn('Số tiền quyên góp', 'donationMoney'),
    getColumn('Thời gian thực hiện', 'donationTime'),
];