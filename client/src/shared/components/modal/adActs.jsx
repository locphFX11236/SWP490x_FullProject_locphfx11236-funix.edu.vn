import { useState } from 'react';
import { Modal, Button } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';

import { AdminActionsTable } from '../table';

export const ShowAdminActions = ({ value, record }) => {
    const [open, setOpen] = useState(false);
    const handleCancel = () => setOpen(false);

    return (
        <>
            <Button
                icon={ <FileTextOutlined /> }
                size='small'
                type="text"
                onClick={() => setOpen(true)}
            />
            <Modal
                width='auto'
                title={`Các hoạt động của Admin, đã có ${value.length} lượt`}
                open={open}
                onCancel={handleCancel}
                okButtonProps={{ hidden: true }}
            >
                <AdminActionsTable data={{ admins: value, users: record.users }} />
            </Modal>
        </>
    );
};