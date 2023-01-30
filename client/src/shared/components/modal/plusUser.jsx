import { useState } from 'react';
import { Modal, Button } from 'antd';
import { UserForm } from '../form';

export const PlusUser = () => {
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
                title='Thêm tài khoản'
                open={open}
                onCancel={handleCancel}
                footer={false}
            >
                <UserForm setOpen={setOpen} />
            </Modal>
        </>
    );
};