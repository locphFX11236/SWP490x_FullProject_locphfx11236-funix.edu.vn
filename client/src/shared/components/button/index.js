import { FileTextOutlined, MenuOutlined } from '@ant-design/icons';
import { Button } from 'antd';

export const TitleTableBtn = (props) => (
    <Button
        type="primary"
        shape="round"
        size="small"
        { ...props }
    />
);

export const ShowInforBtn = (props) => (
    <Button
        icon={ <FileTextOutlined /> }
        size='small'
        type="text"
        { ...props }
    />
);

export const RecordActionBtn = (props) => (
    <Button
        icon={ <MenuOutlined /> }
        size='small'
        type="text"
        { ...props }
    />
);

export const CancelActionBtn = (props) => (
    <button type="button" className="btn btn-outline-info" {...props}>Cancel</button>
);

export const CreateActionBtn = (props) => (
    <button type="button" className="btn btn-success" {...props}>Create</button>
);

export const UpdateActionBtn = (props) => (
    <button type="button" className="btn btn-warning" {...props}>Update</button>
);

export const DeleteActionBtn = (props) => (
    <button type="button" className="btn btn-danger" {...props}>Delete</button>
);