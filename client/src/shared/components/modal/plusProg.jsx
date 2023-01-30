import { useState } from 'react';
import { Modal, Button } from 'antd';

import { ProgramForm } from '../form';

export const PlusProgram = () => {
    const [open, setOpen] = useState(false);
    const handleCancel = () => setOpen(false);

    return (
        <>
            <Button
                className="w-50 btn btn-outline-success"
                shape="round"
                size="small"
                onClick={ () => setOpen(true)}
            >
                Thêm mới
            </Button>
            <Modal
                width='auto'
                title='Thêm chương trình'
                open={open}
                onCancel={handleCancel}
                footer={false}
            >
                <ProgramForm setOpen={setOpen} />
            </Modal>
        </>
    );
};