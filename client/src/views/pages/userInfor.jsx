import { Card } from "antd";

import { UserInforForm } from "../../shared/components/form";
import { Avatar } from "../../shared/components/form";

export const UserInforPage = () => (
    <Card>
        <div className="row justify-content-between">
            <div className="col col-md-4 position-relative p-0">
                <Avatar />
            </div>
            <div className="col col-md-8"><UserInforForm /></div>
        </div>
    </Card>
);