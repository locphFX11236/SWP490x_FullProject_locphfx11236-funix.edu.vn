import { DonasHistoryTable, ProgramsTable, UsersTable } from "../table";

const getItem = (label, key, children) => ({
    label: label,
    key: key,
    children: children,
}); // Kết quả: { label: '', key: '', children: <Component />}

export const Items1 = [
    getItem("Programs", "program-tab", <ProgramsTable />),
    getItem("Users", "user-tab", <UsersTable />),
    getItem("My History", "history-tab", <DonasHistoryTable data={{}} />),
];

export const Items2 = [
    getItem("History", "history-tab", <DonasHistoryTable data={{}} />),
];
