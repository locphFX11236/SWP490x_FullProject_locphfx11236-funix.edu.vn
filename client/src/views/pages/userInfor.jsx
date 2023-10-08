import { Card } from "antd";

import { components } from "../../shared";

const { UserInforForm, Avatar } = components;

export const UserInforPage = () => (
    <Card>
        <div className="row justify-content-between">
            <Avatar />
            <div className="col col-md-8">
                <UserInforForm />
            </div>
        </div>
    </Card>
);
