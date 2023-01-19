import { Table } from "antd";

const TableComponent = ({
    columns,
    data,
    header
}) => <Table
    title={ header ? (() => header) : undefined }
    columns={ columns }
    dataSource={ data }
    pagination={ false }
    bordered
/>;

export default TableComponent;