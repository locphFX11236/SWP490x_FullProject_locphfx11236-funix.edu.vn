import TableComponent from './table';
import { AdminActionsData, DonasActionsData, DonasHistoryData, HandleData } from './data';
import { AdminActionsColumns, DonasActionsColumns, DonasHistoryColumns, ProgramsColumns, UsersColumns } from './columns';
import { PlusProgram, PlusUser } from '../modal';

export const ProgramsTable = () => (
    <TableComponent
        columns={ ProgramsColumns }
        data={ HandleData('programs') }
        header={ <PlusProgram /> }
    />
);

export const UsersTable = () => (
    <TableComponent
        columns={ UsersColumns }
        data={ HandleData('users') }
        header={ <PlusUser /> }
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

export const DonasHistoryTable = ({ data }) => (
    <TableComponent
        columns={ DonasHistoryColumns }
        data={ DonasHistoryData(data) }
    />
);