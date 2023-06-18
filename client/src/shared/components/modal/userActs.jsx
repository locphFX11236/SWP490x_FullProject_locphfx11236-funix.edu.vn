import { useState } from "react";
import { Modal, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { UserForm } from "../form";

export const UserActions = ({ record }) => {
    const [open, setOpen] = useState(false);
    const handleCancel = () => setOpen(false);

    return (
        <>
            <Button
                icon={<MenuOutlined />}
                size="small"
                type="text"
                onClick={() => setOpen(true)}
            />
            <Modal
                width="auto"
                title="Thông tin đã quyên góp"
                open={open}
                onCancel={handleCancel}
                footer={false}
            >
                <UserForm data={record} setOpen={setOpen} />
            </Modal>
        </>
    );
};
