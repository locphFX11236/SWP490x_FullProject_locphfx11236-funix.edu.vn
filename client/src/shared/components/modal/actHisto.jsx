import { useState } from "react";
import { Modal, Button } from "antd";
import { FileTextOutlined } from "@ant-design/icons";

import { DonasHistoryTable } from "../table";

export const ShowActionHistory = ({ value, record }) => {
    const [open, setOpen] = useState(false);
    const handleCancel = () => setOpen(false);

    return (
        <>
            <Button
                icon={<FileTextOutlined />}
                size="small"
                type="text"
                onClick={() => setOpen(true)}
            />
            <Modal
                width="auto"
                title={`Các hoạt động của Quyên góp của ${record.name}, đã có ${value.length} lượt`}
                open={open}
                onCancel={handleCancel}
                okButtonProps={{ hidden: true }}
            >
                <DonasHistoryTable data={{ history: value }} />
            </Modal>
        </>
    );
};
