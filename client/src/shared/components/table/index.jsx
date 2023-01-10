import TableComponent from './table';
import HandleData from './data';
import TitleTable from './title';
import { ProgramsColumns, UsersColumns } from './columns';

export const ProgramsTable = () => <TableComponent
    columns={ ProgramsColumns }
    data={ HandleData('programs') }
    header={ TitleTable('programs') }
/>;

export const UsersTable = () => <TableComponent
    columns={ UsersColumns }
    data={ HandleData('users') }
    header={ TitleTable('users') }
/>;