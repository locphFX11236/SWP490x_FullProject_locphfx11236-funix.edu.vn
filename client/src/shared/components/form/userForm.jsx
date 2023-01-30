import { Form, Input, Row, Upload } from 'antd';

export const UserForm = ({data, setOpen}) => {
    const [form] = Form.useForm();
    const isAdd = !data ? true : false;
    const handle = (key) => {
        form.validateFields()
        .then(values => {
            if (key === 'Delete') {console.log('Delete! with record', values)}
            else if (key === 'Update') {console.log('Update! with record', values)}
            else if (key === 'Create') {console.log('Create! with record', values)}
            else {console.log('Cancel!')}
            setOpen(false);
        })
        .catch((err) => console.log(err))
    };
    const normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
          return e;
        }
        return e?.fileList;
    };

    return (
        <Form
            name="program-form"
            form={form}
            labelAlign="left"
            wrapperCol={{ span: 16 }}
            labelCol={{ span: 8 }}
            initialValues={ isAdd ? undefined : data }
        >
            <Form.Item label="User ID" hidden={isAdd} >
                <span className="ant-form-text">{isAdd ? '' : data.key}</span>
            </Form.Item>

            <Form.Item label="Họ tên" name='name' >
                <Input />
            </Form.Item>

            <Form.Item label="Avatar Url" name='imgAvatar' hidden={isAdd} >
                <Input />
            </Form.Item>

            <Form.Item label="Số điện thoại" name='phoneNumber' >
                <Input />
            </Form.Item>

            <Form.Item label="Email" name='email' >
                <Input />
            </Form.Item>

            <Form.Item label="Mật khẩu" name='password' >
                <Input.Password />
            </Form.Item>

            <Form.Item label="Upload avatar" name="imgFile" valuePropName="fileList" getValueFromEvent={normFile}>
                <Upload.Dragger name="files" action="/upload.do">
                    <p className="ant-upload-text">Click or drag image file to this area to upload</p>
                </Upload.Dragger>
            </Form.Item>

            <Form.Item noStyle>
                <Row className='d-flex justify-content-between mt-3'>
                    <button className="btn btn-danger" onClick={() => handle('Delete')} hidden={isAdd}>Delete</button>
                    <button className="btn btn-warning" onClick={() => handle('Update')} hidden={isAdd}>Update</button>
                    <button className="btn btn-success" onClick={() => handle('Create')} hidden={!isAdd}>Create</button>
                    <button className="btn btn-outline-info" onClick={() => handle('Cancel')} >Cancel</button>
                </Row>
            </Form.Item>
        </Form>
    );
};