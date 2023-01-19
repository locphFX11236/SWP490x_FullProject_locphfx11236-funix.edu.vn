import { CancelActionBtn, CreateActionBtn, DeleteActionBtn, RecordActionBtn, ShowInforBtn, UpdateActionBtn } from '../button';
import { AdminActionsTable, DonasActionsTable } from '../table';
import ProgramForm from '../form/progForm';
import ModalComponent from './modal';
import { CancelProgram, CreateProgram, DeleteProgram, UpdateProgram } from './function';

export const ShowAdminActions = (value, record, index) => (
    <ShowInforBtn
        onClick={() => ModalComponent({
            type: 'info',
            closable: true,
            title: `Các hoạt động của Admin, đã có ${value.length} lượt`,
            width: 'auto',
            content: <AdminActionsTable data={[ value, record ]} />,
        })}
    />
);

export const ShowDonasActions = (value, record, index) => (
    <ShowInforBtn
        onClick={() => ModalComponent({
            type: 'info',
            closable: true,
            title: `Các hoạt động của Quyên góp, đã có ${value.length} lượt quyên góp`,
            width: 'auto',
            content: <DonasActionsTable data={[ value, record ]} />,
        })}
    />
);

export const ProgramActions = (value, record, index) => (
    <RecordActionBtn
        onClick={ () => ModalComponent({
            type: 'info',
            closable: true,
            title: 'Thông tin chương trình',
            width: 'auto',
            content: <ProgramForm data={ record } />,
            footer: (
                <div className='d-flex justify-content-between'>
                    <DeleteActionBtn onClick={() => DeleteProgram(record)} />
                    <UpdateActionBtn onClick={() => UpdateProgram(record)} />
                    <CreateActionBtn onClick={() => CreateProgram(record)} />
                    <CancelActionBtn onClick={() => CancelProgram(record)} />
                </div>
            ),
        }) }
    />
);