import { useState } from 'react';
import { Modal, Button } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';

import { DonasActionsTable } from '../table';

export const ShowDonasActions = ({ value, record }) => {
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
                title={`Các hoạt động của Quyên góp, đã có ${value.length} lượt quyên góp`}
                open={open}
                onCancel={handleCancel}
                okButtonProps={{ hidden: true }}
            >
                <DonasActionsTable data={{ donas: value, users: record.users }} />
            </Modal>
        </>
    );
};