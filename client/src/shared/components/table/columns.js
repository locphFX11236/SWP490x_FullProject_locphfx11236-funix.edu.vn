import { FileTextOutlined, MenuOutlined } from '@ant-design/icons';

const Action1 = (value, record, index) => {
    if (record.isAdmin) return 'Admin'
    else return <MenuOutlined />
};

const Action2 = (value, record, index) => {
    return <FileTextOutlined />
};

const getColumn = (title, key, cb) => {
    if (cb) return {
        title: title,
        dataIndex: key,
        key: key,
        render: (value, record, index) => cb(value, record, index),
    }
    else return {
        title: title,
        dataIndex: key,
        key: key,
    };
}; // Kết quả: { title: '', key: '', dataIndex: '', render: cb }

export const ProgramsColumns = [
    getColumn('Hoàn cảnh', 'name'),
    getColumn('Tổ chức', 'organization'),
    getColumn('Tổng tiền (VND)', 'moneyTotal'),
    getColumn('Tiền hiện tại (VND)', 'moneyCurrent'),
    getColumn('Bắt đầu', 'startTime'),
    getColumn('Kết thúc', 'endTime'),
    getColumn('Admin', 'management', Action2),
    getColumn('Quyên góp', 'donations', Action2),
    getColumn('Action', 'key', Action1)
];

export const UsersColumns = [
    getColumn('Họ tên', 'name'),
    getColumn('Email', 'email'),
    getColumn('Số điện thoại', 'phoneNumber'),
    getColumn('History', 'history', Action2),
    getColumn('Action', 'key', Action1)
];