import { Col, Form, Input, InputNumber, Row, Select, Slider, Upload } from 'antd';

import { SelectDataState } from '../../../core/slice/showData';

const { TextArea } = Input;

export const ProgramForm = ({data, setOpen}) => {
    const { organizations } = SelectDataState();
    const SelectOrgId = organizations.map(o => <Select.Option key={o._id.$oid} value={o._id.$oid}>{o.nameOrganization}</Select.Option>)
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
            <Form.Item label="Program ID" hidden={isAdd} >
                <span className="ant-form-text">{isAdd ? '' : data.key}</span>
            </Form.Item>

            <Form.Item name="name" label="Tên chương trình">
                <Input />
            </Form.Item>

            <Form.Item name="imgProgram" label="Url Ảnh" hidden={isAdd} >
                <Input />
            </Form.Item>

            <Form.Item name="moneyRate" label={`Tỷ lệ hoàn thành (${isAdd ? '' : data.moneyRate}%)`} hidden={isAdd} >
                <Slider disabled/>
            </Form.Item>

            <Form.Item name={["organization", 'key']} label="Tổ chức đồng hành" >
                <Select children={SelectOrgId} />
            </Form.Item>

            <Row>
                <Col span={12}>
                    <Form.Item name="startTime" label="Thời gian bắt đầu">
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="endTime" label="Thời gian kết thúc">
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

            <Row>
                <Col span={12}>
                    <Form.Item name="moneyTotal" label="Tổng số tiền cần (VNĐ)">
                        <InputNumber />
                    </Form.Item>
                    <Form.Item name="moneyCurrent" label="Số tiền hiện tại (VNĐ)" hidden={isAdd} >
                        <InputNumber />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="Upload file ảnh" name="imgFile" valuePropName="fileList" getValueFromEvent={normFile}>
                        <Upload.Dragger name="files" action="/upload.do">
                            <p className="ant-upload-text">Click or drag image file to this area to upload</p>
                        </Upload.Dragger>
                    </Form.Item>
                </Col>
            </Row>

            <label><p>Mô tả câu chuyện:</p></label>
            <Form.Item name="descriptionStory" noStyle>
                <TextArea rows={15} />
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