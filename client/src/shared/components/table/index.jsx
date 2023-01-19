import TableComponent from './table';
import TitleTable from './title';
import { PlusData } from "./functions";
import { AdminActionsData, DonasActionsData, HandleData } from './data';
import { AdminActionsColumns, DonasActionsColumns, ProgramsColumns, UsersColumns } from './columns';

export const ProgramsTable = () => (
    <TableComponent
        columns={ ProgramsColumns }
        data={ HandleData('programs') }
        header={ TitleTable('programs', PlusData) }
    />
);

export const UsersTable = () => (
    <TableComponent
        columns={ UsersColumns }
        data={ HandleData('users') }
        header={ TitleTable('users', PlusData) }
    />
);

export const AdminActionsTable = ({ data }) => (
    <TableComponent
        columns={ AdminActionsColumns }
        data={ AdminActionsData(data) }
    />
);

export const DonasActionsTable = ({ data }) => (
    <TableComponent
        columns={ DonasActionsColumns }
        data={ DonasActionsData(data) }
    />
);