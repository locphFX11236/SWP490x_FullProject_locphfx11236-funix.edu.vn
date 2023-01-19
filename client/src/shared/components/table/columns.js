import { MenuOutlined, FileTextOutlined } from '@ant-design/icons';

import { ProgramActions, ShowAdminActions, ShowDonasActions } from '../modal';

const Action1 = (value, record, index) => {
    if (record.isAdmin) return 'Admin'
    else return <MenuOutlined />
};

const Action2 = (value, record, index) => {
    return <FileTextOutlined />
};

const getColumn = (title, key, cb) => {
    if (cb) return {
        key: key,
        title: title,
        dataIndex: key,
        render: (value, record, index) => cb(value, record, index),
    }
    else return {
        key: key,
        title: title,
        dataIndex: key,
    };
}; // Kết quả: { title: '', key: '', dataIndex: '', render: cb }

export const ProgramsColumns = [
    getColumn('STT', 'stt'),
    getColumn('Hoàn cảnh', 'name'),
    getColumn('Tổ chức', 'organization'),
    getColumn('Tổng tiền (VND)', 'moneyTotal'),
    getColumn('Tiền hiện tại (VND)', 'moneyCurrent'),
    getColumn('Bắt đầu', 'startTime'),
    getColumn('Kết thúc', 'endTime'),
    getColumn('Admin', 'management', ShowAdminActions ),
    getColumn('Quyên góp', 'donations', ShowDonasActions ),
    getColumn('Action', 'key', ProgramActions )
];

export const UsersColumns = [
    getColumn('STT', 'stt'),
    getColumn('Họ tên', 'name'),
    getColumn('Email', 'email'),
    getColumn('Số điện thoại', 'phoneNumber'),
    getColumn('History', 'history', Action2),
    getColumn('Action', 'key', Action1)
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