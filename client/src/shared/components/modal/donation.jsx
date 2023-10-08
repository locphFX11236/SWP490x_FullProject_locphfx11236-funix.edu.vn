import { useState } from "react";
import { Modal, Button, message } from "antd";

import { SelectAuthState } from "../../../core";
import { DonationForm } from "../form";

export const DonationModal = ({ program }) => {
    const [open, setOpen] = useState(false);
    const { user_id, isLogin, data } = SelectAuthState();
    const user = data.find((d) => d._id === user_id) || {};
    const values = {
        name: user.name,
        user_id,
        programId: program._id,
        setOpen,
    };
    const handleCancel = () => setOpen(false);
    const handleClick = () =>
        isLogin
            ? setOpen(true)
            : message.info("Vui lòng đăng nhập để quyên góp!");

    return (
        <>
            <Button
                className="btn btn-outline-info"
                size="large"
                type="primary"
                onClick={handleClick}
            >
                Quyên góp
            </Button>
            <Modal
                className="text-center rounded"
                title={<h3>{`Chương trình: ${program.programName}`}</h3>}
                open={open}
                onCancel={handleCancel}
                okButtonProps={{ hidden: true }}
            >
                <DonationForm {...values} />
            </Modal>
        </>
    );
};
