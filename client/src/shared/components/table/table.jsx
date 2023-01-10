import { Table } from "antd";

const TableComponent = ({
    columns,
    data,
    header
}) => <Table
    title={() => header}
    columns={ columns }
    dataSource={ data }
    pagination={ false }
    bordered
/>;

export default TableComponent;