import { ProgramsTable, UsersTable } from "../table";

const getItem = (label, key, children) => ({
    label: label,
    key: key,
    children: children,
}); // Kết quả: { label: '', key: '', children: <Component />}

const Items = [
    getItem('Programs', 'program-tab', <ProgramsTable />),
    getItem('Users', 'user-tab', <UsersTable />),
];

export default Items;