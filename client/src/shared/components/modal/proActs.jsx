import { useState } from 'react';
import { Modal, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

import { ProgramForm } from '../form';

export const ProgramActions = ({ record }) => {
    const [open, setOpen] = useState(false);
    const handleCancel = () => setOpen(false);

    return (
        <>
            <Button
                icon={ <MenuOutlined /> }
                size='small'
                type="text"
                onClick={ () => setOpen(true)}
            />
            <Modal
                width='auto'
                title='Thông tin chương trình'
                open={open}
                onCancel={handleCancel}
                footer={false}
            >
                <ProgramForm data={ record } setOpen={setOpen} />
            </Modal>
        </>
    );
};