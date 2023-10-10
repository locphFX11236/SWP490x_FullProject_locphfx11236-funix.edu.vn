import React from "react";
import { Tabs } from "antd";

import { Items1, Items2 } from "./items";
import { SelectAuthState } from "../../../core";

const TabAdminComponent = () => <Tabs type="card" items={Items1} />;

const TabUserComponent = () => <Tabs type="card" items={Items2} />;

const TabComponent = () => {
    const { isAdmin } = SelectAuthState();
    return isAdmin ? <TabAdminComponent /> : <TabUserComponent />;
};

export default TabComponent;
